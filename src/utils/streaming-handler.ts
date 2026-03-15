/**
 * FlowKit - Streaming Handler
 * 
 * Handles streaming LLM responses (SSE, WebSocket, fetch stream).
 * Parses and renders widgets as they arrive.
 */

import type { Widget, StreamEvent, WidgetAction } from '../types'
import { parseWidgetsFromLLM, parseLLMJson } from '../json-utils'

// ============================================
// Types
// ============================================

export interface StreamingHandlerConfig {
  /** Called when a widget is parsed */
  onWidget?: (widget: Widget) => void
  /** Called when text arrives */
  onText?: (text: string, done: boolean) => void
  /** Called when status changes */
  onStatus?: (status: 'typing' | 'thinking' | 'idle' | 'error') => void
  /** Called on error */
  onError?: (error: Error) => void
  /** Called when stream completes */
  onComplete?: () => void
  /** Accumulate text before parsing widgets */
  accumulateText?: boolean
  /** Minimum text length before parsing */
  minParseLength?: number
}

export interface SSEOptions {
  /** SSE endpoint */
  url: string
  /** Request method */
  method?: 'GET' | 'POST'
  /** Request headers */
  headers?: Record<string, string>
  /** Request body */
  body?: any
}

// ============================================
// Streaming Handler Class
// ============================================

export class StreamingHandler {
  private config: StreamingHandlerConfig
  private buffer: string = ''
  private abortController: AbortController | null = null
  private isStreaming: boolean = false
  
  constructor(config: StreamingHandlerConfig = {}) {
    this.config = {
      accumulateText: true,
      minParseLength: 10,
      ...config
    }
  }
  
  /**
   * Handle Server-Sent Events (SSE) stream
   */
  async handleSSE(options: SSEOptions): Promise<void> {
    this.abortController = new AbortController()
    this.isStreaming = true
    this.buffer = ''
    
    try {
      this.config.onStatus?.('thinking')
      
      const response = await fetch(options.url, {
        method: options.method ?? 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: this.abortController.signal
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }
      
      const decoder = new TextDecoder()
      
      while (this.isStreaming) {
        const { done, value } = await reader.read()
        
        if (done) {
          this.flush()
          break
        }
        
        const chunk = decoder.decode(value, { stream: true })
        this.processChunk(chunk)
      }
      
      this.config.onComplete?.()
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // User cancelled, not an error
        return
      }
      this.config.onError?.(error)
      this.config.onStatus?.('error')
    } finally {
      this.isStreaming = false
      this.config.onStatus?.('idle')
    }
  }
  
  /**
   * Handle WebSocket stream
   */
  handleWebSocket(ws: WebSocket): void {
    this.buffer = ''
    this.isStreaming = true
    
    ws.onmessage = (event) => {
      this.processChunk(event.data)
    }
    
    ws.onclose = () => {
      this.flush()
      this.isStreaming = false
      this.config.onComplete?.()
      this.config.onStatus?.('idle')
    }
    
    ws.onerror = (error) => {
      this.config.onError?.(new Error('WebSocket error'))
      this.config.onStatus?.('error')
    }
  }
  
  /**
   * Handle fetch ReadableStream
   */
  async handleStream(stream: ReadableStream<Uint8Array>): Promise<void> {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    
    this.buffer = ''
    this.isStreaming = true
    this.config.onStatus?.('thinking')
    
    try {
      while (this.isStreaming) {
        const { done, value } = await reader.read()
        
        if (done) {
          this.flush()
          break
        }
        
        const chunk = decoder.decode(value, { stream: true })
        this.processChunk(chunk)
      }
      
      this.config.onComplete?.()
      
    } catch (error: any) {
      this.config.onError?.(error)
      this.config.onStatus?.('error')
    } finally {
      this.isStreaming = false
      this.config.onStatus?.('idle')
    }
  }
  
  /**
   * Handle async generator (from adapter)
   */
  async handleGenerator(
    generator: AsyncGenerator<StreamEvent>
  ): Promise<void> {
    this.isStreaming = true
    
    try {
      for await (const event of generator) {
        if (!this.isStreaming) break
        
        switch (event.type) {
          case 'widget':
            this.config.onWidget?.(event.widget)
            break
          case 'text':
            this.config.onText?.(event.text, event.done ?? false)
            break
          case 'status':
            this.config.onStatus?.(event.status)
            break
        }
      }
      
      this.config.onComplete?.()
      
    } catch (error: any) {
      this.config.onError?.(error)
      this.config.onStatus?.('error')
    } finally {
      this.isStreaming = false
      this.config.onStatus?.('idle')
    }
  }
  
  /**
   * Process incoming chunk
   */
  private processChunk(chunk: string): void {
    // Handle SSE format
    if (chunk.startsWith('data: ')) {
      const lines = chunk.split('\n')
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim()
          if (data === '[DONE]') {
            this.flush()
            continue
          }
          this.processData(data)
        }
      }
    } else {
      // Raw text
      this.processData(chunk)
    }
  }
  
  /**
   * Process data
   */
  private processData(data: string): void {
    this.buffer += data
    
    if (!this.config.accumulateText) {
      // Try to parse immediately
      this.tryParse()
    } else if (this.buffer.length >= (this.config.minParseLength ?? 10)) {
      // Try to parse after minimum length
      this.tryParse()
    }
  }
  
  /**
   * Try to parse widgets from buffer
   */
  private tryParse(): void {
    // Try to parse complete JSON objects
    const widgets = parseWidgetsFromLLM(this.buffer)
    
    if (widgets.length > 0) {
      // Clear buffer and emit widgets
      for (const widget of widgets) {
        this.config.onWidget?.(widget)
      }
      this.buffer = ''
    } else {
      // Emit as text
      this.config.onText?.(this.buffer, false)
    }
  }
  
  /**
   * Flush remaining buffer
   */
  private flush(): void {
    if (this.buffer.trim()) {
      const widgets = parseWidgetsFromLLM(this.buffer)
      
      if (widgets.length > 0) {
        for (const widget of widgets) {
          this.config.onWidget?.(widget)
        }
      } else {
        this.config.onText?.(this.buffer, true)
      }
    }
    this.buffer = ''
  }
  
  /**
   * Cancel streaming
   */
  cancel(): void {
    this.isStreaming = false
    this.abortController?.abort()
  }
  
  /**
   * Check if streaming
   */
  isActive(): boolean {
    return this.isStreaming
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Create SSE connection
 */
export async function* streamSSE(
  url: string,
  options?: { headers?: Record<string, string>; body?: any }
): AsyncGenerator<string> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      ...options?.headers
    },
    body: options?.body ? JSON.stringify(options.body) : undefined
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }
  
  const reader = response.body?.getReader()
  if (!reader) return
  
  const decoder = new TextDecoder()
  let buffer = ''
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    buffer += decoder.decode(value, { stream: true })
    
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim()
        if (data !== '[DONE]') {
          yield data
        }
      }
    }
  }
}

/**
 * Create async generator from fetch stream
 */
export async function* streamFetch(
  url: string,
  options?: { headers?: Record<string, string>; body?: any }
): AsyncGenerator<string> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    body: options?.body ? JSON.stringify(options.body) : undefined
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }
  
  const reader = response.body?.getReader()
  if (!reader) return
  
  const decoder = new TextDecoder()
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    yield decoder.decode(value, { stream: true })
  }
}

export default {
  StreamingHandler,
  streamSSE,
  streamFetch,
}
