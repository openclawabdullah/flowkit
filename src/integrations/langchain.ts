/**
 * FlowKit - LangChain Integration
 * 
 * Direct integration with LangChain for Python backends.
 * Use LangChain tools and chains to generate widgets.
 */

// ============================================
// Types for TypeScript/LangChain.js
// ============================================

import type { Widget, WidgetAction, StreamEvent } from '../types'
import { parseWidgetsFromLLM, unescapeLLMJson } from '../json-utils'

export interface LangChainConfig {
  /** LangChain.js LLM instance */
  llm?: any
  /** Custom system prompt */
  systemPrompt?: string
  /** Available widgets */
  availableWidgets?: string[]
  /** Temperature */
  temperature?: number
  /** Max tokens */
  maxTokens?: number
}

// ============================================
// LangChain.js Adapter
// ============================================

/**
 * Adapter for LangChain.js
 * 
 * Usage:
 * ```typescript
 * import { ChatOpenAI } from '@langchain/openai'
 * import { LangChainAdapter } from 'flowkit/integrations'
 * 
 * const llm = new ChatOpenAI({ model: 'gpt-4' })
 * const adapter = new LangChainAdapter({ llm })
 * 
 * <Chat adapter={adapter} />
 * ```
 */
export class LangChainAdapter {
  private config: LangChainConfig
  
  constructor(config: LangChainConfig) {
    this.config = config
  }
  
  private getSystemPrompt(): string {
    const widgets = this.config.availableWidgets?.join(', ') ?? 
      'ProductCard, ProductGrid, OrderSummary, OrderTracking, FAQ, ContactForm, Login, Button, Text, Title'
    
    return this.config.systemPrompt ?? `You are a helpful assistant that responds with widgets.

When the user asks for products, orders, or specific information, respond with JSON widgets.

Available widgets: ${widgets}

IMPORTANT: Return widgets as JSON. Example:
{
  "widgets": [
    {"type": "ProductCard", "productId": "1", "title": "Product Name", "price": 99.99, "image": "https://..."}
  ]
}

For text responses, just respond normally.`
  }
  
  async *sendMessage(
    message: string,
    context?: any
  ): AsyncGenerator<StreamEvent> {
    if (!this.config.llm) {
      yield { type: 'text', text: 'LangChain LLM not configured', done: true }
      return
    }
    
    try {
      // Build messages
      const messages: any[] = [
        { role: 'system', content: this.getSystemPrompt() }
      ]
      
      if (context?.messages) {
        for (const msg of context.messages.slice(-10)) {
          messages.push({
            role: msg.role,
            content: typeof msg.content === 'string' 
              ? msg.content 
              : JSON.stringify(msg.content)
          })
        }
      }
      
      messages.push({ role: 'user', content: message })
      
      // Call LangChain
      const response = await this.config.llm.invoke(messages)
      const content = response.content
      
      // Parse widgets
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
  
  async *handleAction(action: WidgetAction): AsyncGenerator<StreamEvent> {
    yield { type: 'status', status: 'typing' }
    yield { type: 'text', text: `Action received: ${action.type}`, done: true }
  }
}

// ============================================
// LangChain Tool Output Parser
// ============================================

/**
 * Parse LangChain tool outputs into widgets
 * 
 * Usage:
 * ```typescript
 * import { LangChainWidgetParser } from 'flowkit/integrations'
 * 
 * const parser = new LangChainWidgetParser()
 * const widgets = parser.parse(toolCallOutput)
 * ```
 */
export class LangChainWidgetParser {
  /**
   * Parse tool output to widgets
   */
  parse(toolOutput: any): Widget[] {
    if (!toolOutput) return []
    
    // If it's already an array of widgets
    if (Array.isArray(toolOutput) && toolOutput[0]?.type) {
      return toolOutput
    }
    
    // If it has a widgets property
    if (toolOutput.widgets && Array.isArray(toolOutput.widgets)) {
      return toolOutput.widgets
    }
    
    // If it's a string, try to parse
    if (typeof toolOutput === 'string') {
      return parseWidgetsFromLLM(toolOutput)
    }
    
    // If it looks like a single widget
    if (toolOutput.type) {
      return [toolOutput]
    }
    
    return []
  }
  
  /**
   * Parse structured tool output
   */
  parseStructuredOutput(output: Record<string, any>): Widget[] {
    // Handle common LangChain structured output patterns
    
    // Pattern: { products: [...] }
    if (output.products && Array.isArray(output.products)) {
      return [{
        type: 'ProductGrid',
        title: 'Products',
        products: output.products.map((p: any) => ({
          type: 'ProductCard',
          productId: p.id || p.productId,
          title: p.name || p.title,
          price: p.price,
          image: p.image || p.thumbnail,
          ...p
        }))
      }]
    }
    
    // Pattern: { items: [...] }
    if (output.items && Array.isArray(output.items)) {
      return [{
        type: 'ListView',
        children: output.items.map((item: any) => ({
          type: 'ListViewItem',
          children: [
            { type: 'Text', value: item.name || item.title || String(item) }
          ]
        }))
      }]
    }
    
    // Pattern: { faqs: [...] }
    if (output.faqs && Array.isArray(output.faqs)) {
      return [{
        type: 'FAQ',
        items: output.faqs.map((faq: any) => ({
          id: faq.id || String(Math.random()),
          question: faq.question,
          answer: faq.answer
        }))
      }]
    }
    
    return []
  }
}

// ============================================
// LangChain Tool Definitions
// ============================================

/**
 * Pre-defined LangChain tools for common FlowKit widgets
 * 
 * Usage with LangChain Python (send these schemas to your backend):
 */
export const LANGCHAIN_TOOLS = {
  product_search: {
    name: 'product_search',
    description: 'Search for products and return them as widgets',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        limit: { type: 'number', description: 'Max results', default: 6 }
      },
      required: ['query']
    },
    returns: 'ProductGrid widget'
  },
  
  order_lookup: {
    name: 'order_lookup',
    description: 'Look up order by ID and return tracking widget',
    parameters: {
      type: 'object',
      properties: {
        orderId: { type: 'string', description: 'Order ID' }
      },
      required: ['orderId']
    },
    returns: 'OrderTracking widget'
  },
  
  faq_search: {
    name: 'faq_search',
    description: 'Search FAQs and return them as widgets',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        category: { type: 'string', description: 'FAQ category' }
      },
      required: ['query']
    },
    returns: 'FAQ widget'
  },
  
  cart_view: {
    name: 'cart_view',
    description: 'View shopping cart contents',
    parameters: {
      type: 'object',
      properties: {}
    },
    returns: 'OrderSummary widget'
  },
  
  contact_form: {
    name: 'contact_form',
    description: 'Show contact form',
    parameters: {
      type: 'object',
      properties: {
        subject: { type: 'string', description: 'Pre-filled subject' }
      }
    },
    returns: 'ContactForm widget'
  }
}

// ============================================
// Python LangChain Integration (for docs)
// ============================================

export const PYTHON_LANGCHAIN_EXAMPLE = `
# langchain_flowkit.py
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.tools import tool
import json

@tool
def product_search(query: str, limit: int = 6) -> dict:
    """Search for products"""
    # Your product search logic
    return {
        "widgets": [{
            "type": "ProductGrid",
            "title": f"Results for '{query}'",
            "columns": 2,
            "products": [...]  # Your products
        }]
    }

@tool
def order_lookup(orderId: str) -> dict:
    """Look up order status"""
    return {
        "widgets": [{
            "type": "OrderTracking",
            "orderId": orderId,
            "status": "shipped",
            "timeline": [...]
        }]
    }

# Create agent with tools
from langchain.agents import create_openai_functions_agent

llm = ChatOpenAI(model="gpt-4", temperature=0)
tools = [product_search, order_lookup]
agent = create_openai_functions_agent(llm, tools)

# Use in FastAPI
@app.post("/api/chat")
async def chat(request: ChatRequest):
    result = await agent.ainvoke({"input": request.message})
    
    # Parse tool outputs to widgets
    if result.get("output"):
        return {"text": result["output"]}
    
    # Extract widget from tool calls
    for step in result.get("intermediate_steps", []):
        if hasattr(step, "return_values"):
            return step.return_values
    
    return {"text": "I couldn't process that request."}
`

export default {
  LangChainAdapter,
  LangChainWidgetParser,
  LANGCHAIN_TOOLS,
  PYTHON_LANGCHAIN_EXAMPLE,
}
