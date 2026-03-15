/**
 * FlowKit - MCP Integration
 * 
 * Utilities for building MCP servers that return FlowKit widgets.
 */

import type { Widget } from '../types'

// ============================================
// Widget Response Builder for MCP
// ============================================

/**
 * Build MCP tool response with widgets
 * 
 * Usage:
 * ```typescript
 * import { mcpWidgetResponse } from 'flowkit/integrations'
 * 
 * server.setRequestHandler(CallToolRequestSchema, async (request) => {
 *   return mcpWidgetResponse([
 *     { type: 'ProductCard', title: 'Product', price: 99 }
 *   ])
 * })
 * ```
 */
export function mcpWidgetResponse(widgets: Widget | Widget[]) {
  const widgetArray = Array.isArray(widgets) ? widgets : [widgets]
  
  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({ widgets: widgetArray }, null, 2)
    }]
  }
}

/**
 * Build MCP error response
 */
export function mcpErrorResponse(message: string, details?: any) {
  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        widgets: [{
          type: 'Error',
          title: 'Error',
          message,
          ...(details && { details })
        }]
      }, null, 2)
    }],
    isError: true
  }
}

/**
 * Build MCP success response with confirmation widget
 */
export function mcpSuccessResponse(title: string, message?: string) {
  return mcpWidgetResponse({
    type: 'Confirmation',
    icon: 'success',
    title,
    message
  })
}

// ============================================
// MCP Tool Definitions
// ============================================

/**
 * Pre-built MCP tool schemas for common e-commerce operations
 */
export const MCP_TOOL_SCHEMAS = {
  search_products: {
    name: 'search_products',
    description: 'Search for products by query',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        category: { type: 'string', description: 'Category filter (optional)' },
        limit: { type: 'number', description: 'Max results (default: 6)' },
        sort: { type: 'string', enum: ['relevance', 'price_asc', 'price_desc', 'rating'] }
      },
      required: ['query']
    }
  },
  
  get_product: {
    name: 'get_product',
    description: 'Get detailed information about a specific product',
    inputSchema: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'Product ID' }
      },
      required: ['product_id']
    }
  },
  
  track_order: {
    name: 'track_order',
    description: 'Track order status by order ID',
    inputSchema: {
      type: 'object',
      properties: {
        order_id: { type: 'string', description: 'Order ID' }
      },
      required: ['order_id']
    }
  },
  
  view_cart: {
    name: 'view_cart',
    description: 'View shopping cart contents',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  
  add_to_cart: {
    name: 'add_to_cart',
    description: 'Add product to shopping cart',
    inputSchema: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'Product ID' },
        quantity: { type: 'number', description: 'Quantity (default: 1)' }
      },
      required: ['product_id']
    }
  },
  
  get_faq: {
    name: 'get_faq',
    description: 'Get frequently asked questions',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Category filter (optional)' },
        query: { type: 'string', description: 'Search query (optional)' }
      }
    }
  },
  
  contact_support: {
    name: 'contact_support',
    description: 'Show contact form for support',
    inputSchema: {
      type: 'object',
      properties: {
        subject: { type: 'string', description: 'Pre-filled subject (optional)' }
      }
    }
  },
  
  show_login: {
    name: 'show_login',
    description: 'Show login form',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  
  list_categories: {
    name: 'list_categories',
    description: 'List product categories',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
}

// ============================================
// MCP Server Template (TypeScript)
// ============================================

export const MCP_SERVER_TEMPLATE = `
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { mcpWidgetResponse, MCP_TOOL_SCHEMAS } from 'flowkit/integrations'

const server = new Server({ name: 'flowkit-server', version: '1.0.0' }, { capabilities: { tools: {} } })

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: Object.values(MCP_TOOL_SCHEMAS)
}))

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params
  
  // Implement your tool logic here
  switch (name) {
    case 'search_products':
      return mcpWidgetResponse([{
        type: 'ProductGrid',
        title: 'Products',
        columns: 2,
        products: [] // Your products
      }])
    
    default:
      return { content: [{ type: 'text', text: \`Unknown tool: \${name}\` }], isError: true }
  }
})

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main()
`

// ============================================
// FastMCP Template (Python)
// ============================================

export const FASTMCP_SERVER_TEMPLATE = `
from fastmcp import FastMCP
import json

mcp = FastMCP("FlowKit Server")

def widget_response(widgets: list) -> str:
    return json.dumps({"widgets": widgets})

@mcp.tool()
def search_products(query: str, limit: int = 6) -> str:
    """Search for products"""
    return widget_response([{
        "type": "ProductGrid",
        "title": f"Results for '{query}'",
        "columns": 2,
        "products": []  # Your products
    }])

@mcp.tool()
def track_order(order_id: str) -> str:
    """Track order status"""
    return widget_response([{
        "type": "OrderTracking",
        "orderId": order_id,
        "status": "shipped",
        "timeline": []  # Your timeline
    }])

if __name__ == "__main__":
    mcp.run()
`

export default {
  mcpWidgetResponse,
  mcpErrorResponse,
  mcpSuccessResponse,
  MCP_TOOL_SCHEMAS,
  MCP_SERVER_TEMPLATE,
  FASTMCP_SERVER_TEMPLATE,
}
