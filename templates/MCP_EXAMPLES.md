# MCP (Model Context Protocol) Examples

Use FlowKit widgets in your MCP servers. Works with FastMCP and Python MCP SDK.

---

## What is MCP?

MCP (Model Context Protocol) is Anthropic's standard for connecting AI models to external tools and data sources. With FlowKit, your MCP server can return beautiful widgets instead of just text.

---

## Option 1: FastMCP (Recommended)

FastMCP is the easiest way to build MCP servers in Python.

### Installation

```bash
pip install fastmcp
```

### Example: E-commerce MCP Server

```python
# mcp_server.py
from fastmcp import FastMCP
import json

# Create MCP server
mcp = FastMCP("FlowKit E-commerce Demo")

# Widget helper
def widget_response(widgets: list) -> str:
    """Format widgets for MCP response"""
    return json.dumps({"widgets": widgets}, ensure_ascii=False)

# ============================================
# Tools
# ============================================

@mcp.tool()
def search_products(query: str, limit: int = 6) -> str:
    """Search for products by query
    
    Args:
        query: Search query (e.g., "headphones", "laptop")
        limit: Maximum number of results (default: 6)
    
    Returns:
        ProductGrid widget with matching products
    """
    # TODO: Replace with your actual product search
    products = [
        {
            "productId": "1",
            "title": f"Product matching '{query}' #1",
            "price": 99.99,
            "image": "https://via.placeholder.com/200",
            "rating": 4.5,
            "reviews": 100
        },
        {
            "productId": "2",
            "title": f"Product matching '{query}' #2",
            "price": 149.99,
            "image": "https://via.placeholder.com/200",
            "rating": 4.8,
            "reviews": 250
        }
    ]
    
    return widget_response([{
        "type": "ProductGrid",
        "title": f"Results for '{query}'",
        "columns": 2,
        "products": products[:limit]
    }])

@mcp.tool()
def get_product(product_id: str) -> str:
    """Get detailed information about a product
    
    Args:
        product_id: The product ID
    
    Returns:
        ProductCard widget with product details
    """
    return widget_response([{
        "type": "ProductCard",
        "productId": product_id,
        "title": "Premium Headphones",
        "subtitle": "Wireless Noise Cancelling",
        "price": 299.99,
        "originalPrice": 399.99,
        "image": "https://via.placeholder.com/400",
        "rating": 4.8,
        "reviews": 1247,
        "badge": "SALE",
        "inStock": True,
        "onAddToCartAction": {
            "type": "add_to_cart",
            "data": {"productId": product_id}
        }
    }])

@mcp.tool()
def track_order(order_id: str) -> str:
    """Track order status
    
    Args:
        order_id: The order ID to track
    
    Returns:
        OrderTracking widget with timeline
    """
    return widget_response([{
        "type": "OrderTracking",
        "orderId": order_id,
        "status": "shipped",
        "estimatedDelivery": "March 20, 2026",
        "timeline": [
            {
                "status": "Order Placed",
                "timestamp": "Mar 10, 2026 • 2:30 PM",
                "description": "Your order has been confirmed",
                "completed": True,
                "current": False
            },
            {
                "status": "Processing",
                "timestamp": "Mar 11, 2026 • 9:00 AM",
                "description": "Order is being prepared",
                "completed": True,
                "current": False
            },
            {
                "status": "Shipped",
                "timestamp": "Mar 12, 2026 • 3:45 PM",
                "description": "Package picked up by carrier",
                "location": "New York, NY",
                "completed": True,
                "current": True
            },
            {
                "status": "Out for Delivery",
                "timestamp": "",
                "completed": False,
                "current": False
            },
            {
                "status": "Delivered",
                "timestamp": "",
                "completed": False,
                "current": False
            }
        ]
    }])

@mcp.tool()
def view_cart() -> str:
    """View shopping cart contents
    
    Returns:
        OrderSummary widget with cart items
    """
    return widget_response([{
        "type": "OrderSummary",
        "title": "Shopping Cart",
        "items": [
            {
                "name": "Premium Headphones",
                "quantity": 1,
                "price": 299.99,
                "image": "https://via.placeholder.com/100"
            },
            {
                "name": "Wireless Keyboard",
                "quantity": 2,
                "price": 149.99,
                "image": "https://via.placeholder.com/100"
            }
        ],
        "subtotal": 599.97,
        "shipping": 15.00,
        "tax": 48.00,
        "total": 662.97,
        "currency": "$"
    }])

@mcp.tool()
def add_to_cart(product_id: str, quantity: int = 1) -> str:
    """Add product to cart
    
    Args:
        product_id: Product ID to add
        quantity: Quantity to add (default: 1)
    
    Returns:
        Confirmation widget
    """
    return widget_response([{
        "type": "Confirmation",
        "icon": "success",
        "title": "Added to Cart!",
        "message": f"Added {quantity} item(s) to your shopping cart.",
        "details": [
            {"label": "Product ID", "value": product_id},
            {"label": "Quantity", "value": str(quantity)}
        ],
        "primaryAction": {
            "label": "View Cart",
            "onClickAction": {"type": "view_cart"}
        },
        "secondaryAction": {
            "label": "Continue Shopping",
            "onClickAction": {"type": "continue"}
        }
    }])

@mcp.tool()
def get_faq(category: str = None) -> str:
    """Get frequently asked questions
    
    Args:
        category: Optional category filter (e.g., "shipping", "returns")
    
    Returns:
        FAQ widget with questions and answers
    """
    faqs = [
        {
            "id": "1",
            "question": "How do I track my order?",
            "answer": "You can track your order by clicking the tracking link in your confirmation email, or by using the 'Track Order' feature with your order ID.",
            "category": "orders"
        },
        {
            "id": "2",
            "question": "What is your return policy?",
            "answer": "We offer a 30-day return policy for all unused items in their original packaging. Simply initiate a return from your account.",
            "category": "returns"
        },
        {
            "id": "3",
            "question": "Do you offer international shipping?",
            "answer": "Yes! We ship to over 100 countries worldwide. International shipping rates and delivery times vary by location.",
            "category": "shipping"
        }
    ]
    
    if category:
        faqs = [f for f in faqs if f["category"] == category]
    
    return widget_response([{
        "type": "FAQ",
        "title": "Frequently Asked Questions",
        "items": faqs
    }])

@mcp.tool()
def show_login() -> str:
    """Show login form
    
    Returns:
        Login widget with email/password fields
    """
    return widget_response([{
        "type": "Login",
        "title": "Sign In",
        "subtitle": "Welcome back!",
        "fields": [
            {
                "name": "email",
                "type": "email",
                "placeholder": "Email address",
                "required": True
            },
            {
                "name": "password",
                "type": "password",
                "placeholder": "Password",
                "required": True
            }
        ],
        "submitLabel": "Sign In",
        "forgotPasswordAction": {"type": "forgot_password"},
        "signupAction": {"type": "signup"}
    }])

# ============================================
# Resources (for context)
# ============================================

@mcp.resource("flowkit://widgets/schema")
def widget_schema() -> str:
    """Get FlowKit widget schema for context"""
    return json.dumps({
        "availableWidgets": [
            "ProductCard", "ProductGrid", "OrderSummary", "OrderTracking",
            "FAQ", "ContactForm", "Login", "Register", "Confirmation",
            "Button", "Text", "Title", "Card", "Row", "Col"
        ],
        "responseFormat": {
            "widgets": "Array of widget objects"
        }
    }, indent=2)

@mcp.resource("flowkit://products/featured")
def featured_products() -> str:
    """Get featured products"""
    return widget_response([{
        "type": "ProductGrid",
        "title": "Featured Products",
        "columns": 3,
        "products": [
            {"productId": "1", "title": "Featured Product 1", "price": 99.99, "image": "https://via.placeholder.com/200"},
            {"productId": "2", "title": "Featured Product 2", "price": 149.99, "image": "https://via.placeholder.com/200"},
            {"productId": "3", "title": "Featured Product 3", "price": 199.99, "image": "https://via.placeholder.com/200"}
        ]
    }])

# ============================================
# Prompts
# ============================================

@mcp.prompt()
def ecommerce_assistant() -> str:
    """Prompt for e-commerce assistant using FlowKit widgets"""
    return """You are a helpful e-commerce assistant. When users ask about products, orders, or need help:

1. Use the search_products tool to find products
2. Use the get_product tool for product details
3. Use the track_order tool for order status
4. Use the view_cart tool to show cart
5. Use the add_to_cart tool to add items
6. Use the get_faq tool for common questions

Always return widgets when appropriate. Be helpful and friendly."""

# ============================================
# Run Server
# ============================================

if __name__ == "__main__":
    mcp.run()
```

### Run FastMCP Server

```bash
# Development
python mcp_server.py

# Or with Claude Desktop
# Add to claude_desktop_config.json:
{
  "mcpServers": {
    "flowkit-ecommerce": {
      "command": "python",
      "args": ["/path/to/mcp_server.py"]
    }
  }
}
```

---

## Option 2: Python MCP SDK

Official Python SDK from Anthropic.

### Installation

```bash
pip install mcp
```

### Example: Support MCP Server

```python
# mcp_server.py
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
import json

# Create server
server = Server("flowkit-support")

def widget_response(widgets: list) -> list:
    """Format widgets for MCP response"""
    return [TextContent(
        type="text",
        text=json.dumps({"widgets": widgets}, ensure_ascii=False)
    )]

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="contact_form",
            description="Show contact form for support",
            inputSchema={
                "type": "object",
                "properties": {
                    "subject": {
                        "type": "string",
                        "description": "Pre-filled subject"
                    }
                }
            }
        ),
        Tool(
            name="faq_search",
            description="Search FAQs",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query"
                    }
                },
                "required": ["query"]
            }
        ),
        Tool(
            name="show_order_history",
            description="Show user's order history",
            inputSchema={
                "type": "object",
                "properties": {}
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list:
    if name == "contact_form":
        return widget_response([{
            "type": "ContactForm",
            "title": "Contact Support",
            "subtitle": "We'll get back to you within 24 hours",
            "fields": [
                {"name": "name", "type": "text", "placeholder": "Your Name", "required": True},
                {"name": "email", "type": "email", "placeholder": "Your Email", "required": True},
                {"name": "subject", "type": "text", "placeholder": arguments.get("subject", "Subject"), "required": True},
                {"name": "message", "type": "textarea", "placeholder": "How can we help?", "required": True}
            ]
        }])
    
    elif name == "faq_search":
        query = arguments.get("query", "")
        return widget_response([{
            "type": "FAQ",
            "title": f"Results for '{query}'",
            "items": [
                {
                    "id": "1",
                    "question": "How do I reset my password?",
                    "answer": "Click 'Forgot Password' on the login page and follow the instructions."
                }
            ]
        }])
    
    elif name == "show_order_history":
        return widget_response([{
            "type": "OrderHistory",
            "orders": [
                {
                    "id": "ORD-001",
                    "date": "Mar 10, 2026",
                    "status": "Delivered",
                    "total": 299.99,
                    "items": 2
                },
                {
                    "id": "ORD-002",
                    "date": "Mar 5, 2026",
                    "status": "Shipped",
                    "total": 149.99,
                    "items": 1
                }
            ]
        }])
    
    return [TextContent(type="text", text=f"Unknown tool: {name}")]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

---

## Option 3: Node.js MCP Server

Using `@modelcontextprotocol/sdk`.

### Installation

```bash
npm install @modelcontextprotocol/sdk zod
```

### Example: Node.js MCP Server

```typescript
// mcp-server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'

// Widget response helper
function widgetResponse(widgets: any[]) {
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({ widgets }, null, 2)
    }]
  }
}

// Create server
const server = new Server({
  name: 'flowkit-mcp-server',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
})

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'show_products',
        description: 'Display product grid',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Product category' },
            limit: { type: 'number', description: 'Max results' }
          }
        }
      },
      {
        name: 'show_categories',
        description: 'Display category list',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  }
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params
  
  switch (name) {
    case 'show_products':
      return widgetResponse([{
        type: 'ProductGrid',
        title: 'Products',
        columns: 2,
        products: [
          { productId: '1', title: 'Product 1', price: 99.99, image: 'https://via.placeholder.com/200' },
          { productId: '2', title: 'Product 2', price: 149.99, image: 'https://via.placeholder.com/200' }
        ]
      }])
    
    case 'show_categories':
      return widgetResponse([{
        type: 'CategoryList',
        title: 'Categories',
        layout: 'grid',
        categories: [
          { id: '1', name: 'Electronics', icon: '📱', count: 156 },
          { id: '2', name: 'Clothing', icon: '👕', count: 324 },
          { id: '3', name: 'Home & Garden', icon: '🏠', count: 89 }
        ]
      }])
    
    default:
      return {
        content: [{
          type: 'text',
          text: `Unknown tool: ${name}`
        }],
        isError: true
      }
  }
})

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('FlowKit MCP server running on stdio')
}

main().catch(console.error)
```

---

## Using with Claude Desktop

### Claude Desktop Config

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "flowkit-ecommerce": {
      "command": "python",
      "args": ["/path/to/your/mcp_server.py"]
    },
    "flowkit-support": {
      "command": "node",
      "args": ["/path/to/your/mcp-server.js"]
    }
  }
}
```

### Restart Claude Desktop

After updating the config, restart Claude Desktop to load the MCP servers.

---

## Testing MCP Server

### Using MCP Inspector

```bash
# Install MCP Inspector
npm install -g @modelcontextprotocol/inspector

# Run inspector
mcp-inspector python mcp_server.py

# Or for Node.js
mcp-inspector node mcp-server.js
```

### Test Tools

```bash
# List tools
curl -X POST http://localhost:3000/tools/list

# Call tool
curl -X POST http://localhost:3000/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name": "search_products", "arguments": {"query": "headphones"}}'
```

---

## Widget Response Format

All MCP tools should return widgets in this format:

```json
{
  "widgets": [
    {
      "type": "ProductCard",
      "productId": "1",
      "title": "Product Name",
      "price": 99.99
    }
  ]
}
```

---

## Best Practices

1. **Always use the widget_response helper** - Ensures consistent format
2. **Include tool descriptions** - Help the LLM understand when to use each tool
3. **Use proper JSON escaping** - Let the helper handle escaping
4. **Return widgets, not just text** - Better UX with visual widgets
5. **Handle errors gracefully** - Return error widgets, not exceptions

---

## More Examples

See the `/examples` folder for:
- Full e-commerce MCP server
- Customer support MCP server
- Booking/reservations MCP server
- Real estate MCP server

---

**Questions?** Open an issue at https://github.com/openclawabdullah/flowkit
