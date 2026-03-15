/**
 * FlowKit - Tailwind Chat Component
 * 
 * Beautiful, OpenAI-inspired chat interface with Tailwind CSS.
 * Requires tailwind.css to be imported.
 */

import React, { useState, useRef, useEffect } from 'react'
import type { FlowKitAdapter, StreamEvent, Message, Widget, WidgetAction } from '../types'
import { WidgetRenderer } from '../WidgetRenderer'

// ============================================
// Types
// ============================================

export interface TailwindChatProps {
  adapter: FlowKitAdapter
  placeholder?: string
  suggestions?: string[]
  onMessage?: (message: Message) => void
  className?: string
  welcomeTitle?: string
  welcomeSubtitle?: string
  welcomeIcon?: string
}

// ============================================
// Tailwind Chat Component
// ============================================

export function TailwindChat({
  adapter,
  placeholder = 'Message FlowKit...',
  suggestions,
  onMessage,
  className = '',
  welcomeTitle = 'How can I help you today?',
  welcomeSubtitle = 'I can help you with products, orders, and more.',
  welcomeIcon = '👋',
}: TailwindChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
    }
  }, [input])
  
  // Handle widget actions
  const handleAction = async (action: WidgetAction) => {
    if (!adapter.handleAction) return
    
    setIsTyping(true)
    
    try {
      const generator = adapter.handleAction(action)
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: [],
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
                ? { ...msg, content: typeof msg.content === 'string' ? msg.content + event.text : event.text }
                : msg
            )
          )
        }
      }
      
      onMessage?.(newMessage)
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
    setIsTyping(true)
    
    try {
      const context = { messages: [...messages, userMessage] }
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
                ? { ...msg, content: typeof msg.content === 'string' ? msg.content + event.text : event.text }
                : msg
            )
          )
        } else if (event.type === 'status') {
          setIsTyping(event.status === 'typing' || event.status === 'thinking')
        }
      }
      
      onMessage?.(assistantMessage)
    } finally {
      setIsTyping(false)
    }
  }
  
  // Handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  
  // Suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }
  
  // Welcome screen
  const showWelcome = messages.length === 0
  
  return (
    <div className={`flowkit-chat ${className}`}>
      {/* Messages Area */}
      <div className="flowkit-messages">
        {showWelcome ? (
          // Welcome Screen
          <div className="flowkit-welcome">
            {welcomeIcon && <div className="text-5xl mb-4">{welcomeIcon}</div>}
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{welcomeTitle}</h2>
            <p className="text-gray-500 mb-8">{welcomeSubtitle}</p>
            
            {suggestions && suggestions.length > 0 && (
              <div className="flowkit-suggestions">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flowkit-suggestion"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Messages
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flowkit-message ${message.role === 'user' ? 'flowkit-message-user' : 'flowkit-message-assistant'}`}
              >
                {/* Avatar */}
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🤖</span>
                  </div>
                )}
                
                {/* Content */}
                <div className={message.role === 'user' ? 'flowkit-bubble-user' : 'flowkit-bubble-assistant'}>
                  {typeof message.content === 'string' ? (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  ) : (
                    <div className="space-y-3">
                      {(message.content as Widget[]).map((widget, i) => (
                        <div key={i} className="flowkit-widget">
                          <WidgetRenderer widget={widget} onAction={handleAction} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flowkit-typing">
                <div className="flex gap-1">
                  <div className="flowkit-typing-dot" />
                  <div className="flowkit-typing-dot" />
                  <div className="flowkit-typing-dot" />
                </div>
                <span>Thinking...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Input Area */}
      <div className="flowkit-input-container">
        <div className="flowkit-input-wrapper">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isTyping}
            rows={1}
            className="flowkit-input"
            style={{ maxHeight: 200 }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="flowkit-send-button"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
          FlowKit may produce inaccurate information.
        </p>
      </div>
    </div>
  )
}

export default TailwindChat
