# Backend Templates

Copy-paste starter code for your backend.

## Python (FastAPI)

```python
# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str | List[Any]

class ChatRequest(BaseModel):
    message: str
    context: Optional[dict] = None

class WidgetAction(BaseModel):
    type: str
    data: Optional[dict] = None

def unescape_llm_json(text: str) -> str:
    """Unescape JSON from LLM responses"""
    text = text.replace('\\"', '"')
    text = text.replace(r'\/', '/')
    text = text.replace('\\\\', '\\')
    return text

def parse_widgets(response: str) -> List[dict]:
    """Parse widgets from LLM response"""
    try:
        # Try direct parse
        data = json.loads(response)
        if isinstance(data, dict) and 'widgets' in data:
            return data['widgets']
        elif isinstance(data, list):
            return data
        elif isinstance(data, dict) and 'type' in data:
            return [data]
    except:
        pass
    
    # Try unescape then parse
    try:
        unescaped = unescape_llm_json(response)
        data = json.loads(unescaped)
        if isinstance(data, dict) and 'widgets' in data:
            return data['widgets']
        elif isinstance(data, list):
            return data
        elif isinstance(data, dict) and 'type' in data:
            return [data]
    except:
        pass
    
    # Extract from markdown code blocks
    import re
    match = re.search(r'```(?:json)?\s*([\s\S]*?)```', response)
    if match:
        try:
            data = json.loads(unescape_llm_json(match.group(1)))
            if isinstance(data, dict) and 'widgets' in data:
                return data['widgets']
            elif isinstance(data, list):
                return data
        except:
            pass
    
    return []

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Handle chat messages and return widgets"""
    
    # TODO: Replace with your LLM integration
    # response = await your_llm.generate(request.message)
    
    # Demo: Return sample widgets
    if "product" in request.message.lower():
        return {
            "widgets": [
                {
                    "type": "ProductGrid",
                    "title": "Products",
                    "columns": 2,
                    "products": [
                        {
                            "productId": "1",
                            "title": "Product 1",
                            "price": 99.99,
                            "image": "https://via.placeholder.com/200",
                            "rating": 4.5
                        },
                        {
                            "productId": "2",
                            "title": "Product 2",
                            "price": 149.99,
                            "image": "https://via.placeholder.com/200",
                            "rating": 4.8
                        }
                    ]
                }
            ]
        }
    
    return {
        "text": "I received your message! Ask me about products, orders, or support."
    }

@app.post("/api/action")
async def handle_action(action: WidgetAction):
    """Handle widget actions (button clicks, form submits, etc.)"""
    
    if action.type == "add_to_cart":
        return {
            "widgets": [{
                "type": "Confirmation",
                "icon": "success",
                "title": "Added to Cart!",
                "message": "Item has been added to your shopping cart."
            }]
        }
    
    return {"text": f"Action received: {action.type}"}

# Widget schema endpoint (for LLM context)
@app.get("/api/widget-schema")
async def widget_schema():
    """Return widget schema for LLM context"""
    return {
        "availableWidgets": [
            "ProductCard", "ProductGrid", "OrderSummary", "OrderTracking",
            "FAQ", "ContactForm", "Login", "Register", "Confirmation",
            "Button", "Text", "Title", "Card", "Row", "Col"
        ],
        "responseFormat": {
            "widgets": "array of widget objects"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Python (Flask)

```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re

app = Flask(__name__)
CORS(app)

def unescape_llm_json(text):
    text = text.replace('\\"', '"')
    text = text.replace(r'\/', '/')
    text = text.replace('\\\\', '\\')
    return text

def parse_widgets(response):
    try:
        data = json.loads(response)
        if isinstance(data, dict) and 'widgets' in data:
            return data['widgets']
    except:
        pass
    return []

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    
    # Demo response
    return jsonify({
        'widgets': [{
            'type': 'Text',
            'value': f'You said: {message}'
        }]
    })

@app.route('/api/action', methods=['POST'])
def handle_action():
    action = request.json
    return jsonify({
        'widgets': [{
            'type': 'Confirmation',
            'icon': 'success',
            'title': 'Success!',
            'message': f'Action: {action.get("type")}'
        }]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
```

## Node.js (Express)

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Unescape JSON from LLM responses
function unescapeLLMJson(text) {
  return text
    .replace(/\\"/g, '"')
    .replace(/\\\//g, '/')
    .replace(/\\\\/g, '\\');
}

// Parse widgets from LLM response
function parseWidgets(response) {
  try {
    const data = JSON.parse(response);
    if (data.widgets) return data.widgets;
    if (Array.isArray(data)) return data;
    if (data.type) return [data];
  } catch (e) {
    // Try unescaped
    try {
      const unescaped = unescapeLLMJson(response);
      const data = JSON.parse(unescaped);
      if (data.widgets) return data.widgets;
      if (Array.isArray(data)) return data;
      if (data.type) return [data];
    } catch (e2) {}
  }
  return [];
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  // TODO: Replace with your LLM integration
  // const response = await yourLLM.generate(message);
  
  // Demo response
  if (message.toLowerCase().includes('product')) {
    res.json({
      widgets: [{
        type: 'ProductGrid',
        title: 'Products',
        columns: 2,
        products: [
          { productId: '1', title: 'Product 1', price: 99.99, image: 'https://via.placeholder.com/200' },
          { productId: '2', title: 'Product 2', price: 149.99, image: 'https://via.placeholder.com/200' }
        ]
      }]
    });
  } else {
    res.json({
      text: 'I received your message! Ask me about products.'
    });
  }
});

// Action endpoint
app.post('/api/action', (req, res) => {
  const { type, data } = req.body;
  
  res.json({
    widgets: [{
      type: 'Confirmation',
      icon: 'success',
      title: 'Success!',
      message: `Action: ${type}`
    }]
  });
});

// Widget schema endpoint
app.get('/api/widget-schema', (req, res) => {
  res.json({
    availableWidgets: [
      'ProductCard', 'ProductGrid', 'OrderSummary', 'OrderTracking',
      'FAQ', 'ContactForm', 'Login', 'Register', 'Confirmation',
      'Button', 'Text', 'Title', 'Card', 'Row', 'Col'
    ],
    responseFormat: {
      widgets: 'array of widget objects'
    }
  });
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
```

## Next.js API Route

```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

function unescapeLLMJson(text: string): string {
  return text
    .replace(/\\"/g, '"')
    .replace(/\\\//g, '/')
    .replace(/\\\\/g, '\\');
}

function parseWidgets(response: string): any[] {
  try {
    const data = JSON.parse(response);
    if (data.widgets) return data.widgets;
    if (Array.isArray(data)) return data;
    if (data.type) return [data];
  } catch (e) {
    try {
      const unescaped = unescapeLLMJson(response);
      const data = JSON.parse(unescaped);
      if (data.widgets) return data.widgets;
    } catch (e2) {}
  }
  return [];
}

export async function POST(request: NextRequest) {
  const { message, context } = await request.json();
  
  // TODO: Replace with your LLM integration
  
  return NextResponse.json({
    widgets: [{
      type: 'Text',
      value: `You said: ${message}`
    }]
  });
}
```

## LangChain Integration

```python
# langchain_flowkit.py
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.tools import Tool
import json

class FlowKitAgent:
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.7,
            openai_api_key=openai_api_key
        )
        
        self.system_prompt = """You are a helpful assistant that responds with widgets.

When the user asks for products, orders, or specific information, respond with JSON widgets.

Available widgets: ProductCard, ProductGrid, OrderSummary, OrderTracking, FAQ, ContactForm, Login, Button, Text, Title

IMPORTANT: Return widgets as JSON. Example:
{
  "widgets": [
    {"type": "ProductCard", "productId": "1", "title": "Product Name", "price": 99.99}
  ]
}

For text responses, just respond normally."""
    
    def chat(self, message: str, history: list = None) -> dict:
        messages = [SystemMessage(content=self.system_prompt)]
        
        if history:
            for msg in history[-10:]:
                messages.append(msg)
        
        messages.append(HumanMessage(content=message))
        
        response = self.llm(messages)
        
        # Try to parse as widgets
        content = response.content
        
        try:
            data = json.loads(content)
            if isinstance(data, dict) and 'widgets' in data:
                return {"widgets": data['widgets']}
            elif isinstance(data, list):
                return {"widgets": data}
            elif isinstance(data, dict) and 'type' in data:
                return {"widgets": [data]}
        except:
            pass
        
        # Return as text
        return {"text": content}
    
    def handle_action(self, action_type: str, action_data: dict = None) -> dict:
        """Handle widget actions"""
        
        action_handlers = {
            "add_to_cart": lambda: {
                "widgets": [{
                    "type": "Confirmation",
                    "icon": "success",
                    "title": "Added to Cart!",
                    "message": "Item has been added to your shopping cart."
                }]
            },
            "login": lambda: {
                "widgets": [{
                    "type": "Confirmation",
                    "icon": "success",
                    "title": "Welcome!",
                    "message": "You have successfully logged in."
                }]
            }
        }
        
        handler = action_handlers.get(action_type, lambda: {
            "text": f"Action received: {action_type}"
        })
        
        return handler()

# Usage
agent = FlowKitAgent(openai_api_key="your-key")
result = agent.chat("Show me products")
print(result)  # {"widgets": [...]}
```

---

## Quick Start

1. Copy the template for your framework
2. Replace TODO comments with your LLM integration
3. Start the server
4. Connect FlowKit frontend:

```typescript
import { HTTPAdapter } from 'flowkit'

const adapter = new HTTPAdapter({
  endpoint: 'http://localhost:8000/api/chat'
})

<Chat adapter={adapter} />
```

Done! 🚀
