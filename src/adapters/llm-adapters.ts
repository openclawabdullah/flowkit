/**
 * FlowKit - LLM Adapters
 * 
 * Ready-to-use adapters for popular LLM providers.
 * Connect to OpenAI, Anthropic, or any LLM in 2 lines.
 */

import type { FlowKitAdapter, StreamEvent, ConversationContext, Widget } from '../types'
import { parseWidgetsFromLLM, unescapeLLMJson } from '../json-utils'

// ============================================
// Base Types
// ============================================

export interface LLMAdapterConfig {
  /** System prompt - should instruct LLM to return widgets */
  systemPrompt?: string
  /** Model to use */
  model?: string
  /** Temperature (0-2) */
  temperature?: number
  /** Max tokens */
  maxTokens?: number
  /** Available widgets - injected into system prompt */
  availableWidgets?: string[]
  /** Custom widget schema */
  widgetSchema?: any
}

// ============================================
// OpenAI Adapter
// ============================================

export interface OpenAIAdapterConfig extends LLMAdapterConfig {
  /** OpenAI API key */
  apiKey: string
  /** Base URL (for proxies) */
  baseUrl?: string
  /** Organization ID */
  organization?: string
}

const DEFAULT_OPENAI_SYSTEM_PROMPT = `You are a helpful assistant that responds with widgets.

When the user asks for products, orders, or specific information, respond with JSON widgets.

Available widgets: {{WIDGETS}}

IMPORTANT: Return widgets as JSON objects. Example:
{
  "widgets": [
    {
      "type": "ProductCard",
      "productId": "1",
      "title": "Product Name",
      "price": 99.99,
      "image": "https://..."
    }
  ]
}

For text responses, just respond normally.`

export class OpenAIAdapter implements FlowKitAdapter {
  private config: OpenAIAdapterConfig
  
  constructor(config: OpenAIAdapterConfig) {
    this.config = config
  }
  
  private getSystemPrompt(): string {
    const basePrompt = this.config.systemPrompt ?? DEFAULT_OPENAI_SYSTEM_PROMPT
    const widgets = this.config.availableWidgets?.join(', ') ?? 
      'ProductCard, ProductGrid, OrderSummary, OrderTracking, FAQ, ContactForm, Login'
    
    return basePrompt.replace('{{WIDGETS}}', widgets)
  }
  
  async *sendMessage(
    message: string,
    context?: ConversationContext
  ): AsyncGenerator<StreamEvent> {
    const messages: any[] = [
      { role: 'system', content: this.getSystemPrompt() }
    ]
    
    // Add conversation history
    if (context?.messages) {
      for (const msg of context.messages.slice(-10)) {  // Last 10 messages
        messages.push({
          role: msg.role,
          content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
        })
      }
    }
    
    // Add current message
    messages.push({ role: 'user', content: message })
    
    try {
      const baseUrl = this.config.baseUrl ?? 'https://api.openai.com/v1'
      
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          ...(this.config.organization && { 'OpenAI-Organization': this.config.organization })
        },
        body: JSON.stringify({
          model: this.config.model ?? 'gpt-4o',
          messages,
          temperature: this.config.temperature ?? 0.7,
          max_tokens: this.config.maxTokens ?? 2000
        })
      })
      
      if (!response.ok) {
        const error = await response.text()
        throw new Error(`OpenAI API error: ${error}`)
      }
      
      const data = await response.json()
      const content = data.choices?.[0]?.message?.content ?? ''
      
      // Try to parse as widgets
      const widgets = parseWidgetsFromLLM(content)
      
      if (widgets.length > 0) {
        // Return widgets
        for (const widget of widgets) {
          yield { type: 'widget', widget }
        }
      } else {
        // Return as text
        yield { type: 'text', text: content, done: true }
      }
      
    } catch (error: any) {
      yield { type: 'status', status: 'error' }
      throw error
    }
  }
  
  async *handleAction(action: any): AsyncGenerator<StreamEvent> {
    // Handle widget actions (button clicks, form submits, etc.)
    yield { type: 'status', status: 'typing' }
    
    // Default: acknowledge action
    yield { 
      type: 'text', 
      text: `Action received: ${action.type}`,
      done: true 
    }
  }
}

// ============================================
// Anthropic (Claude) Adapter
// ============================================

export interface AnthropicAdapterConfig extends LLMAdapterConfig {
  /** Anthropic API key */
  apiKey: string
  /** Base URL (for proxies) */
  baseUrl?: string
}

const DEFAULT_ANTHROPIC_SYSTEM_PROMPT = `You are a helpful assistant that responds with widgets.

When the user asks for products, orders, or specific information, respond with JSON widgets.

Available widgets: {{WIDGETS}}

IMPORTANT: Return widgets as a JSON object. Example:
{
  "widgets": [
    {
      "type": "ProductCard",
      "productId": "1", 
      "title": "Product Name",
      "price": 99.99,
      "image": "https://..."
    }
  ]
}

For text responses, just respond normally.`

export class AnthropicAdapter implements FlowKitAdapter {
  private config: AnthropicAdapterConfig
  
  constructor(config: AnthropicAdapterConfig) {
    this.config = config
  }
  
  private getSystemPrompt(): string {
    const basePrompt = this.config.systemPrompt ?? DEFAULT_ANTHROPIC_SYSTEM_PROMPT
    const widgets = this.config.availableWidgets?.join(', ') ?? 
      'ProductCard, ProductGrid, OrderSummary, OrderTracking, FAQ, ContactForm, Login'
    
    return basePrompt.replace('{{WIDGETS}}', widgets)
  }
  
  async *sendMessage(
    message: string,
    context?: ConversationContext
  ): AsyncGenerator<StreamEvent> {
    const messages: any[] = []
    
    // Add conversation history
    if (context?.messages) {
      for (const msg of context.messages.slice(-10)) {
        messages.push({
          role: msg.role === 'system' ? 'user' : msg.role,
          content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
        })
      }
    }
    
    // Add current message
    messages.push({ role: 'user', content: message })
    
    try {
      const baseUrl = this.config.baseUrl ?? 'https://api.anthropic.com/v1'
      
      const response = await fetch(`${baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: this.config.model ?? 'claude-sonnet-4-20250514',
          max_tokens: this.config.maxTokens ?? 2000,
          system: this.getSystemPrompt(),
          messages
        })
      })
      
      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Anthropic API error: ${error}`)
      }
      
      const data = await response.json()
      const content = data.content?.[0]?.text ?? ''
      
      // Try to parse as widgets
      const widgets = parseWidgetsFromLLM(content)
      
      if (widgets.length > 0) {
        for (const widget of widgets) {
          yield { type: 'widget', widget }
        }
      } else {
        yield { type: 'text', text: content, done: true }
      }
      
    } catch (error: any) {
      yield { type: 'status', status: 'error' }
      throw error
    }
  }
  
  async *handleAction(action: any): AsyncGenerator<StreamEvent> {
    yield { type: 'status', status: 'typing' }
    yield { type: 'text', text: `Action received: ${action.type}`, done: true }
  }
}

// ============================================
// Generic HTTP Adapter
// ============================================

export interface HTTPAdapterConfig {
  /** API endpoint */
  endpoint: string
  /** API key (optional) */
  apiKey?: string
  /** Custom headers */
  headers?: Record<string, string>
  /** Request transformer */
  transformRequest?: (message: string, context?: ConversationContext) => any
  /** Response transformer */
  transformResponse?: (response: any) => Widget[] | string
}

export class HTTPAdapter implements FlowKitAdapter {
  private config: HTTPAdapterConfig
  
  constructor(config: HTTPAdapterConfig) {
    this.config = config
  }
  
  async *sendMessage(
    message: string,
    context?: ConversationContext
  ): AsyncGenerator<StreamEvent> {
    try {
      const body = this.config.transformRequest 
        ? this.config.transformRequest(message, context)
        : { message, context }
      
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
          ...this.config.headers
        },
        body: JSON.stringify(body)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (this.config.transformResponse) {
        const result = this.config.transformResponse(data)
        if (typeof result === 'string') {
          yield { type: 'text', text: result, done: true }
        } else {
          for (const widget of result) {
            yield { type: 'widget', widget }
          }
        }
      } else {
        // Try to extract widgets
        const widgets = data.widgets ?? parseWidgetsFromLLM(JSON.stringify(data))
        if (widgets.length > 0) {
          for (const widget of widgets) {
            yield { type: 'widget', widget }
          }
        } else if (data.text || data.message || data.response) {
          yield { type: 'text', text: data.text ?? data.message ?? data.response, done: true }
        }
      }
      
    } catch (error: any) {
      yield { type: 'status', status: 'error' }
      throw error
    }
  }
  
  async *handleAction(action: any): AsyncGenerator<StreamEvent> {
    yield { type: 'status', status: 'typing' }
    yield { type: 'text', text: `Action received: ${action.type}`, done: true }
  }
}

// ============================================
// Mock Adapter (for testing)
// ============================================

export interface MockAdapterConfig {
  /** Predefined responses */
  responses?: Record<string, Widget[] | string>
  /** Default response */
  defaultResponse?: Widget[] | string
  /** Simulate delay (ms) */
  delay?: number
}

export class MockAdapter implements FlowKitAdapter {
  private config: MockAdapterConfig
  
  constructor(config: MockAdapterConfig = {}) {
    this.config = config
  }
  
  async *sendMessage(
    message: string,
    context?: ConversationContext
  ): AsyncGenerator<StreamEvent> {
    if (this.config.delay) {
      await new Promise(resolve => setTimeout(resolve, this.config.delay))
    }
    
    const lowerMessage = message.toLowerCase()
    
    // Find matching response
    for (const [key, value] of Object.entries(this.config.responses ?? {})) {
      if (lowerMessage.includes(key.toLowerCase())) {
        if (typeof value === 'string') {
          yield { type: 'text', text: value, done: true }
        } else {
          for (const widget of value) {
            yield { type: 'widget', widget }
          }
        }
        return
      }
    }
    
    // Default response
    const defaultResponse = this.config.defaultResponse ?? 'I received your message!'
    if (typeof defaultResponse === 'string') {
      yield { type: 'text', text: defaultResponse, done: true }
    } else {
      for (const widget of defaultResponse) {
        yield { type: 'widget', widget }
      }
    }
  }
  
  async *handleAction(action: any): AsyncGenerator<StreamEvent> {
    yield { type: 'text', text: `Action: ${action.type}`, done: true }
  }
}

export default {
  OpenAIAdapter,
  AnthropicAdapter,
  HTTPAdapter,
  MockAdapter,
}
