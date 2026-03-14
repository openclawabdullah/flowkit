/**
 * FlowKit - Chat Component
 * 
 * A beautiful chat interface with OpenAI-inspired styling.
 */

import React, { useState, useRef, useEffect } from 'react'
import type { FlowKitAdapter, Message, Widget, WidgetAction } from './types'
import { WidgetRenderer } from './WidgetRenderer'

// ============================================
// Styles
// ============================================

const styles = {
  colors: {
    primary: '#10a37f',
    primaryHover: '#0d8a6a',
    secondary: '#6b7280',
    background: '#ffffff',
    surface: '#f7f7f8',
    text: '#202123',
    textSecondary: '#6b7280',
    border: '#e5e5e5',
    userBubble: '#10a37f',
    assistantBubble: '#f7f7f8',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
}

// ============================================
// Chat Component
// ============================================

export interface ChatProps {
  adapter: FlowKitAdapter
  placeholder?: string
  suggestions?: string[]
  onMessage?: (message: Message) => void
  className?: string
  style?: React.CSSProperties
}

export function Chat({ adapter, placeholder, suggestions, onMessage, className, style }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle widget actions
  const handleAction = async (action: WidgetAction) => {
    if (!adapter.handleAction) return

    setError(null)
    setIsTyping(true)

    try {
      const generator = adapter.handleAction(action)
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, newMessage])

      for await (const event of generator) {
        if (event.type === 'widget') {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === newMessage.id
                ? {
                    ...msg,
                    content: Array.isArray(msg.content)
                      ? [...(msg.content as Widget[]), event.widget]
                      : [event.widget],
                  }
                : msg
            )
          )
        } else if (event.type === 'text') {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === newMessage.id
                ? {
                    ...msg,
                    content: typeof msg.content === 'string' ? msg.content + event.text : event.text,
                  }
                : msg
            )
          )
        } else if (event.type === 'status') {
          setIsTyping(event.status === 'typing' || event.status === 'thinking')
        }
      }

      onMessage?.(newMessage)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsTyping(false)
    }
  }

  // Send message
  const sendMessage = async (text: string = input) => {
    if (!text.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setError(null)
    setIsTyping(true)

    try {
      const context = {
        messages: [...messages, userMessage],
      }

      const generator = adapter.sendMessage(text.trim(), context)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])

      for await (const event of generator) {
        if (event.type === 'widget') {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessage.id
                ? {
                    ...msg,
                    content: Array.isArray(msg.content)
                      ? [...(msg.content as Widget[]), event.widget]
                      : [event.widget],
                  }
                : msg
            )
          )
        } else if (event.type === 'text') {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessage.id
                ? {
                    ...msg,
                    content: typeof msg.content === 'string' ? msg.content + event.text : event.text,
                  }
                : msg
            )
          )
        } else if (event.type === 'status') {
          setIsTyping(event.status === 'typing' || event.status === 'thinking')
        }
      }

      onMessage?.(assistantMessage)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsTyping(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: styles.colors.background,
        ...style,
      }}
    >
      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 16,
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: styles.colors.textSecondary,
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🌊</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: styles.colors.text, marginBottom: 8 }}>
              Welcome to FlowKit
            </div>
            <div style={{ marginBottom: 24 }}>
              A beautiful widget system for chat interfaces
            </div>
            {suggestions && suggestions.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 500 }}>
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: styles.radius.full,
                      border: `1px solid ${styles.colors.border}`,
                      background: styles.colors.background,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = styles.colors.surface
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = styles.colors.background
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: message.role === 'user' ? '12px 16px' : 0,
                borderRadius: message.role === 'user' ? styles.radius.lg : 0,
                background: message.role === 'user' ? styles.colors.userBubble : 'transparent',
                color: message.role === 'user' ? '#fff' : styles.colors.text,
              }}
            >
              {typeof message.content === 'string' ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(message.content as Widget[]).map((widget, i) => (
                    <WidgetRenderer key={i} widget={widget} onAction={handleAction} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: styles.colors.textSecondary,
              padding: '8px 0',
            }}
          >
            <div className="typing-indicator" style={{ display: 'flex', gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: styles.colors.primary,
                  animation: 'typing 1.4s infinite ease-in-out',
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: styles.colors.primary,
                  animation: 'typing 1.4s infinite ease-in-out 0.2s',
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: styles.colors.primary,
                  animation: 'typing 1.4s infinite ease-in-out 0.4s',
                }}
              />
            </div>
            <span style={{ fontSize: '0.875rem' }}>Thinking...</span>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 12,
              background: '#fee2e2',
              color: '#dc2626',
              borderRadius: styles.radius.md,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: 16,
          borderTop: `1px solid ${styles.colors.border}`,
          background: styles.colors.background,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            background: styles.colors.surface,
            borderRadius: styles.radius.xl,
            padding: '8px 16px',
            border: `1px solid ${styles.colors.border}`,
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? 'Type a message...'}
            rows={1}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
              fontSize: '1rem',
              lineHeight: 1.5,
              maxHeight: 200,
              fontFamily: 'inherit',
            }}
            disabled={isTyping}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            style={{
              padding: '8px 16px',
              borderRadius: styles.radius.full,
              border: 'none',
              background: input.trim() && !isTyping ? styles.colors.primary : styles.colors.border,
              color: '#fff',
              cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* CSS for typing animation */}
      <style>{`
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Chat
