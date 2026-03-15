/**
 * FlowKit - Widget Schema Generator
 * 
 * Generates JSON schemas for LLMs to understand available widgets.
 * Send this to your LLM so it knows what widgets it can use.
 */

import type { Widget } from '../types'

// ============================================
// Widget Definitions for LLMs
// ============================================

const WIDGET_DEFINITIONS: Record<string, any> = {
  // ============ E-Commerce ============
  ProductCard: {
    description: 'Display a single product with image, title, price, and add to cart button',
    properties: {
      type: { const: 'ProductCard', description: 'Widget type' },
      productId: { type: 'string', description: 'Unique product ID' },
      image: { type: 'string', description: 'Product image URL' },
      title: { type: 'string', description: 'Product name' },
      subtitle: { type: 'string', description: 'Optional subtitle/description' },
      price: { type: 'number', description: 'Current price' },
      originalPrice: { type: 'number', description: 'Original price (for showing discount)' },
      currency: { type: 'string', default: '$', description: 'Currency symbol' },
      rating: { type: 'number', minimum: 0, maximum: 5, description: 'Product rating (0-5)' },
      reviews: { type: 'integer', description: 'Number of reviews' },
      badge: { type: 'string', description: 'Badge text (e.g., "SALE", "NEW")' },
      inStock: { type: 'boolean', description: 'Whether product is in stock' },
    },
    required: ['type', 'productId', 'image', 'title', 'price'],
    example: {
      type: 'ProductCard',
      productId: 'prod-001',
      image: 'https://example.com/product.jpg',
      title: 'Premium Headphones',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 1247,
      badge: 'SALE'
    }
  },
  
  ProductGrid: {
    description: 'Display multiple products in a grid layout',
    properties: {
      type: { const: 'ProductGrid', description: 'Widget type' },
      title: { type: 'string', description: 'Section title' },
      columns: { type: 'integer', enum: [2, 3, 4], default: 3, description: 'Number of columns' },
      products: { 
        type: 'array', 
        items: { '$ref': '#/definitions/ProductCard' },
        description: 'Array of products (use ProductCard format without "type")'
      }
    },
    required: ['type', 'products'],
    example: {
      type: 'ProductGrid',
      title: 'Featured Products',
      columns: 2,
      products: [
        { productId: '1', image: 'https://...', title: 'Product 1', price: 99 },
        { productId: '2', image: 'https://...', title: 'Product 2', price: 149 }
      ]
    }
  },
  
  OrderSummary: {
    description: 'Display shopping cart or order summary with items, subtotal, and total',
    properties: {
      type: { const: 'OrderSummary', description: 'Widget type' },
      title: { type: 'string', description: 'Section title' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            quantity: { type: 'integer' },
            price: { type: 'number' },
            image: { type: 'string' }
          }
        },
        description: 'Array of cart items'
      },
      subtotal: { type: 'number', description: 'Subtotal before tax/shipping' },
      shipping: { type: 'number', description: 'Shipping cost' },
      tax: { type: 'number', description: 'Tax amount' },
      discount: { type: 'number', description: 'Discount amount' },
      total: { type: 'number', description: 'Final total' },
      currency: { type: 'string', default: '$' }
    },
    required: ['type', 'items', 'subtotal', 'total'],
    example: {
      type: 'OrderSummary',
      items: [
        { name: 'Product 1', quantity: 2, price: 99 }
      ],
      subtotal: 198,
      shipping: 10,
      total: 208
    }
  },
  
  OrderTracking: {
    description: 'Display order status with tracking timeline',
    properties: {
      type: { const: 'OrderTracking', description: 'Widget type' },
      orderId: { type: 'string', description: 'Order ID' },
      status: { type: 'string', enum: ['processing', 'shipped', 'out_for_delivery', 'delivered'], description: 'Current status' },
      estimatedDelivery: { type: 'string', description: 'Estimated delivery date' },
      timeline: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            status: { type: 'string', description: 'Status name' },
            timestamp: { type: 'string', description: 'Date/time' },
            description: { type: 'string', description: 'Status description' },
            completed: { type: 'boolean', description: 'Whether this step is completed' },
            current: { type: 'boolean', description: 'Whether this is the current step' }
          }
        }
      }
    },
    required: ['type', 'orderId', 'status', 'timeline'],
    example: {
      type: 'OrderTracking',
      orderId: 'ORD-12345',
      status: 'shipped',
      timeline: [
        { status: 'Order Placed', timestamp: 'Mar 10, 2:30 PM', completed: true, current: false },
        { status: 'Shipped', timestamp: 'Mar 12, 3:45 PM', completed: true, current: true },
        { status: 'Delivered', timestamp: '', completed: false, current: false }
      ]
    }
  },
  
  // ============ Auth ============
  Login: {
    description: 'Display login form with email/password fields',
    properties: {
      type: { const: 'Login', description: 'Widget type' },
      title: { type: 'string', description: 'Form title' },
      subtitle: { type: 'string', description: 'Form subtitle' },
      fields: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            type: { type: 'string', enum: ['email', 'password', 'text'] },
            placeholder: { type: 'string' }
          }
        }
      }
    },
    required: ['type', 'fields'],
    example: {
      type: 'Login',
      title: 'Sign In',
      fields: [
        { name: 'email', type: 'email', placeholder: 'Email' },
        { name: 'password', type: 'password', placeholder: 'Password' }
      ]
    }
  },
  
  // ============ Support ============
  FAQ: {
    description: 'Display frequently asked questions in expandable format',
    properties: {
      type: { const: 'FAQ', description: 'Widget type' },
      title: { type: 'string', description: 'Section title' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            question: { type: 'string' },
            answer: { type: 'string' }
          }
        }
      }
    },
    required: ['type', 'items'],
    example: {
      type: 'FAQ',
      title: 'FAQs',
      items: [
        { id: '1', question: 'How do I track my order?', answer: 'Click the tracking link in your email...' }
      ]
    }
  },
  
  ContactForm: {
    description: 'Display contact form with custom fields',
    properties: {
      type: { const: 'ContactForm', description: 'Widget type' },
      title: { type: 'string' },
      subtitle: { type: 'string' },
      fields: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            type: { type: 'string', enum: ['text', 'email', 'tel', 'textarea'] },
            placeholder: { type: 'string' },
            required: { type: 'boolean' }
          }
        }
      }
    },
    required: ['type'],
    example: {
      type: 'ContactForm',
      title: 'Contact Us',
      fields: [
        { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
        { name: 'email', type: 'email', placeholder: 'Your Email', required: true },
        { name: 'message', type: 'textarea', placeholder: 'Message', required: true }
      ]
    }
  },
  
  // ============ Layout ============
  Card: {
    description: 'Container with padding, border, and optional shadow',
    properties: {
      type: { const: 'Card', description: 'Widget type' },
      children: { type: 'array', description: 'Child widgets' },
      padding: { type: 'number', description: 'Padding in pixels' },
      background: { type: 'string', description: 'Background color' }
    },
    required: ['type'],
    example: {
      type: 'Card',
      padding: 16,
      children: [
        { type: 'Title', value: 'Welcome!' },
        { type: 'Text', value: 'This is a card widget' }
      ]
    }
  },
  
  Row: {
    description: 'Horizontal layout container',
    properties: {
      type: { const: 'Row', description: 'Widget type' },
      children: { type: 'array', description: 'Child widgets' },
      gap: { type: 'number', description: 'Gap between children' },
      justify: { type: 'string', enum: ['start', 'center', 'end', 'between'] }
    },
    required: ['type', 'children']
  },
  
  Col: {
    description: 'Vertical layout container',
    properties: {
      type: { const: 'Col', description: 'Widget type' },
      children: { type: 'array', description: 'Child widgets' },
      gap: { type: 'number', description: 'Gap between children' }
    },
    required: ['type', 'children']
  },
  
  // ============ Typography ============
  Text: {
    description: 'Display text',
    properties: {
      type: { const: 'Text', description: 'Widget type' },
      value: { type: 'string', description: 'Text content' },
      size: { type: 'string', enum: ['xs', 'sm', 'md', 'lg', 'xl'] },
      color: { type: 'string', description: 'Text color' }
    },
    required: ['type', 'value']
  },
  
  Title: {
    description: 'Display heading/title',
    properties: {
      type: { const: 'Title', description: 'Widget type' },
      value: { type: 'string', description: 'Title text' },
      size: { type: 'string', enum: ['sm', 'md', 'lg', 'xl', '2xl'] }
    },
    required: ['type', 'value']
  },
  
  // ============ Interactive ============
  Button: {
    description: 'Clickable button',
    properties: {
      type: { const: 'Button', description: 'Widget type' },
      label: { type: 'string', description: 'Button text' },
      style: { type: 'string', enum: ['primary', 'secondary', 'outline'], default: 'primary' },
      size: { type: 'string', enum: ['sm', 'md', 'lg'] }
    },
    required: ['type', 'label']
  },
  
  // ============ Feedback ============
  Confirmation: {
    description: 'Display confirmation/success message',
    properties: {
      type: { const: 'Confirmation', description: 'Widget type' },
      icon: { type: 'string', enum: ['success', 'error', 'warning', 'info'] },
      title: { type: 'string', description: 'Main message' },
      message: { type: 'string', description: 'Additional details' }
    },
    required: ['type', 'title']
  },
  
  // ============ Advanced ============
  Stats: {
    description: 'Display statistics/metrics',
    properties: {
      type: { const: 'Stats', description: 'Widget type' },
      title: { type: 'string', description: 'Metric name' },
      value: { type: ['string', 'number'], description: 'Metric value' },
      prefix: { type: 'string', description: 'Value prefix (e.g., "$")' },
      suffix: { type: 'string', description: 'Value suffix (e.g., "%")' },
      change: {
        type: 'object',
        properties: {
          value: { type: 'number' },
          type: { type: 'string', enum: ['increase', 'decrease'] }
        }
      }
    },
    required: ['type', 'value']
  }
}

// ============================================
// Schema Generator
// ============================================

export interface GenerateSchemaOptions {
  /** Include only these widgets */
  only?: string[]
  /** Exclude these widgets */
  exclude?: string[]
  /** Include examples */
  includeExamples?: boolean
  /** Format: 'schema' (JSON Schema) or 'prompt' (text description) */
  format?: 'schema' | 'prompt'
  /** Wrap in response object structure */
  wrapInResponse?: boolean
}

/**
 * Generate widget schema for LLM context
 */
export function generateWidgetSchema(options: GenerateSchemaOptions = {}): any {
  const {
    only,
    exclude = [],
    includeExamples = true,
    format = 'schema',
    wrapInResponse = true
  } = options
  
  let widgetTypes = Object.keys(WIDGET_DEFINITIONS)
  
  if (only) {
    widgetTypes = widgetTypes.filter(t => only.includes(t))
  }
  
  if (exclude.length > 0) {
    widgetTypes = widgetTypes.filter(t => !exclude.includes(t))
  }
  
  if (format === 'prompt') {
    return generatePromptFormat(widgetTypes, includeExamples)
  }
  
  // JSON Schema format
  const definitions: Record<string, any> = {}
  
  for (const widgetType of widgetTypes) {
    definitions[widgetType] = WIDGET_DEFINITIONS[widgetType]
  }
  
  const schema = {
    definitions,
    availableWidgets: widgetTypes,
    responseFormat: wrapInResponse ? {
      type: 'object',
      properties: {
        widgets: {
          type: 'array',
          items: {
            anyOf: widgetTypes.map(t => ({ '$ref': `#/definitions/${t}` }))
          }
        }
      }
    } : undefined
  }
  
  return schema
}

/**
 * Generate text prompt format for LLMs
 */
function generatePromptFormat(widgetTypes: string[], includeExamples: boolean): string {
  const lines: string[] = [
    '# Available Widgets',
    '',
    'You can respond with the following widgets. Return them as JSON objects.',
    ''
  ]
  
  for (const widgetType of widgetTypes) {
    const def = WIDGET_DEFINITIONS[widgetType]
    lines.push(`## ${widgetType}`)
    lines.push('')
    lines.push(def.description)
    lines.push('')
    
    if (includeExamples && def.example) {
      lines.push('Example:')
      lines.push('```json')
      lines.push(JSON.stringify(def.example, null, 2))
      lines.push('```')
      lines.push('')
    }
  }
  
  lines.push('## Response Format')
  lines.push('')
  lines.push('Return widgets in this format:')
  lines.push('```json')
  lines.push('{')
  lines.push('  "widgets": [')
  lines.push('    { "type": "ProductCard", ... },')
  lines.push('    { "type": "Button", ... }')
  lines.push('  ]')
  lines.push('}')
  lines.push('```')
  
  return lines.join('\n')
}

/**
 * Get widget definition by type
 */
export function getWidgetDefinition(widgetType: string): any {
  return WIDGET_DEFINITIONS[widgetType]
}

/**
 * Get list of available widget types
 */
export function getAvailableWidgets(): string[] {
  return Object.keys(WIDGET_DEFINITIONS)
}

/**
 * Generate system prompt with widget schema
 */
export function generateSystemPrompt(options: GenerateSchemaOptions = {}): string {
  const schema = generateWidgetSchema({ ...options, format: 'prompt' })
  
  return `${schema}

## Important Rules

1. Only use widgets from the available list
2. Return valid JSON
3. Include all required properties
4. Use realistic placeholder data (not Lorem Ipsum)
5. For product images, use realistic URLs or leave empty
6. Be helpful and contextual

When the user asks for products, orders, or specific information, respond with widgets.
For general questions, respond with text.`
}

export default {
  generateWidgetSchema,
  generateSystemPrompt,
  getWidgetDefinition,
  getAvailableWidgets,
  WIDGET_DEFINITIONS,
}
