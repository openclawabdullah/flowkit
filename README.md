<div align="center">

# 🌊 FlowKit

**A beautiful, open-source widget system for chat interfaces.**  
Like ChatKit, but yours.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

[Demo](#-demo) • [Features](#-features) • [Widgets](#-widgets) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 🎯 Why FlowKit?

ChatKit by OpenAI is beautiful, but it locks you into their ecosystem. **FlowKit** gives you:

- ✅ **Same gorgeous UI** - Clean, modern, OpenAI-inspired design
- ✅ **Zero vendor lock-in** - Use ANY backend (LangGraph, CrewAI, n8n, custom)
- ✅ **25+ production-ready widgets** - Everything for e-commerce, auth, support
- ✅ **Full TypeScript** - Complete type safety
- ✅ **100% open source** - MIT license, yours forever

---

## 🚀 Quick Start

### Install

```bash
npm install flowkit
# or
yarn add flowkit
# or
pnpm add flowkit
```

### Basic Usage

```tsx
import { Chat, DemoAdapter } from 'flowkit'
import 'flowkit/styles.css'

const adapter = new DemoAdapter()

function App() {
  return <Chat 
    adapter={adapter}
    placeholder="Ask me anything..."
  />
}
```

### With Your Backend

```tsx
import { Chat, FlowKitAdapter } from 'flowkit'

const adapter = new FlowKitAdapter({
  baseUrl: 'https://your-api.com',
  apiKey: 'your-api-key' // optional
})

function App() {
  return <Chat adapter={adapter} />
}
```

---

## 🧩 Widgets

FlowKit includes **25+ production-ready widgets** organized by category:

### 📦 Layout Widgets
| Widget | Description |
|--------|-------------|
| `Card` | Container with padding, shadows, borders |
| `Row` | Horizontal flexbox layout |
| `Col` | Vertical flexbox layout |
| `Box` | Flexible container |
| `Grid` | CSS Grid layout |
| `Spacer` | Flexible spacing |
| `Divider` | Horizontal/vertical separator |
| `Collapse` | Expandable content |
| `Tabs` | Tabbed interface |
| `Accordion` | Collapsible sections |

### ✏️ Typography Widgets
| Widget | Description |
|--------|-------------|
| `Text` | Plain text with formatting |
| `Title` | Headings (h1-h6) |
| `Caption` | Small helper text |
| `Markdown` | Markdown rendering |

### 🎛️ Interactive Widgets
| Widget | Description |
|--------|-------------|
| `Button` | Action buttons (primary, secondary, outline, ghost) |
| `Badge` | Status labels |
| `Chip` | Selectable chips/tags |
| `Toggle` | On/off switch |
| `Checkbox` | Checkbox input |
| `Radio` | Radio button |
| `Select` | Dropdown select |
| `DatePicker` | Date input |
| `TimePicker` | Time input |
| `Slider` | Range slider |
| `Rating` | Star rating |
| `Upload` | File upload |

### 🔐 Authentication Widgets
| Widget | Description |
|--------|-------------|
| `Login` | Complete login form |
| `VerifyOTP` | OTP verification |
| `Register` | Registration form |
| `ForgotPassword` | Password recovery |
| `ResetPassword` | Password reset |

### 🛒 E-Commerce Widgets
| Widget | Description |
|--------|-------------|
| `ProductCard` | Product display card |
| `ProductGrid` | Product grid layout |
| `ProductDetail` | Full product page |
| `Cart` | Shopping cart |
| `Checkout` | Multi-step checkout |
| `PaymentMethod` | Payment selection |
| `OrderSummary` | Order summary |
| `OrderTracking` | Shipment tracking |
| `OrderHistory` | Past orders |
| `Invoice` | Invoice display |
| `InvoiceList` | Invoice list |

### 📍 Address Widgets
| Widget | Description |
|--------|-------------|
| `AddressForm` | Address input form |
| `AddressList` | Saved addresses |

### 📂 Category Widgets
| Widget | Description |
|--------|-------------|
| `CategoryList` | Category grid/list |
| `CategoryTree` | Hierarchical categories |
| `Subcategory` | Subcategory view |

### 💬 Support Widgets
| Widget | Description |
|--------|-------------|
| `ContactForm` | Contact form |
| `FAQ` | FAQ accordion |
| `Terms` | Terms & conditions |
| `Privacy` | Privacy policy |

### ✅ Feedback Widgets
| Widget | Description |
|--------|-------------|
| `Confirmation` | Confirmation dialog |
| `Success` | Success message |
| `Error` | Error display |
| `Alert` | Alert banner |
| `Toast` | Toast notification |
| `Progress` | Progress bar |
| `Spinner` | Loading spinner |
| `Skeleton` | Loading skeleton |

### 🔍 Navigation Widgets
| Widget | Description |
|--------|-------------|
| `Search` | Search input with suggestions |
| `SearchResults` | Search results |
| `Breadcrumb` | Breadcrumb navigation |
| `Stepper` | Step indicator |
| `Pagination` | Page navigation |

---

## 🎨 Theming

FlowKit uses a simple theming system:

```tsx
import { FlowKitProvider, Theme } from 'flowkit'

const customTheme: Theme = {
  colors: {
    primary: '#10a37f',      // Your brand color
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: '#ffffff',
    surface: '#f7f7f8',
    text: '#202123',
    textSecondary: '#6b7280',
    border: '#e5e5e5',
  }
}

function App() {
  return (
    <FlowKitProvider theme={customTheme}>
      <Chat adapter={adapter} />
    </FlowKitProvider>
  )
}
```

---

## 🔌 Backend Integration

FlowKit works with ANY backend. Here are examples:

### LangGraph

```python
# Python backend
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

@app.post("/api/chat")
async def chat(request: ChatRequest):
    widgets = process_message(request.message)
    return {
        "widgets": widgets
    }

@app.post("/api/action")
async def handle_action(request: ActionRequest):
    widgets = handle_widget_action(request.action)
    return {
        "widgets": widgets
    }
```

### Node.js

```typescript
// Express backend
app.post('/api/chat', async (req, res) => {
  const { message } = req.body
  const widgets = await processMessage(message)
  res.json({ widgets })
})

app.post('/api/action', async (req, res) => {
  const { action } = req.body
  const widgets = await handleAction(action)
  res.json({ widgets })
})
```

### Custom Adapter

```typescript
import { FlowKitAdapter, StreamEvent } from 'flowkit'

class MyCustomAdapter implements FlowKitAdapter {
  async *sendMessage(message: string): AsyncGenerator<StreamEvent> {
    // Your logic here
    const response = await fetch('your-api/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    })
    
    const data = await response.json()
    
    for (const widget of data.widgets) {
      yield { type: 'widget', widget }
    }
  }
  
  async *handleAction(action: WidgetAction): AsyncGenerator<StreamEvent> {
    // Handle button clicks, form submits, etc.
    const response = await fetch('your-api/action', {
      method: 'POST',
      body: JSON.stringify(action)
    })
    
    const data = await response.json()
    
    for (const widget of data.widgets) {
      yield { type: 'widget', widget }
    }
  }
}
```

---

## 📋 Widget Schema

All widgets follow a simple JSON schema:

```typescript
interface Widget {
  type: string          // Widget type
  children?: Widget[]   // Nested widgets
  // ... component-specific props
}

interface WidgetAction {
  type: string           // Action type
  data?: any             // Action payload
  widgetId?: string      // Source widget ID
}
```

### Example: Product Card

```json
{
  "type": "ProductCard",
  "productId": "prod-001",
  "image": "https://example.com/product.jpg",
  "title": "Premium Headphones",
  "price": 299.99,
  "originalPrice": 399.99,
  "currency": "USD",
  "rating": 4.8,
  "reviews": 1247,
  "badge": "SALE",
  "inStock": true,
  "onAddToCartAction": {
    "type": "add_to_cart",
    "data": { "productId": "prod-001" }
  }
}
```

### Example: Login Form

```json
{
  "type": "Login",
  "title": "Welcome Back",
  "subtitle": "Sign in to continue",
  "fields": [
    { "name": "email", "type": "email", "placeholder": "Email", "required": true },
    { "name": "password", "type": "password", "placeholder": "Password", "required": true }
  ],
  "submitLabel": "Sign In",
  "forgotPasswordAction": { "type": "forgot_password" },
  "onSubmitAction": { "type": "login" }
}
```

---

## 🛠️ API Reference

### `<Chat />`

Main chat component.

```tsx
<Chat
  adapter={adapter}           // FlowKitAdapter instance
  placeholder="Type..."        // Input placeholder
  suggestions={['Hi', 'Help']} // Quick action chips
  onMessage={(msg) => {}}      // Message callback
  theme={customTheme}          // Custom theme
/>
```

### `<WidgetRenderer />`

Render a single widget.

```tsx
<WidgetRenderer
  widget={widget}              // Widget object
  onAction={(action) => {}}    // Action handler
/>
```

### `<FlowKitProvider />`

Theme provider.

```tsx
<FlowKitProvider theme={customTheme}>
  <Chat adapter={adapter} />
</FlowKitProvider>
```

---

## 🎯 Comparison

| Feature | FlowKit | ChatKit |
|---------|---------|---------|
| Beautiful UI | ✅ | ✅ |
| Open Source | ✅ MIT | ❌ Proprietary |
| Any Backend | ✅ | ❌ OpenAI only |
| No API Key | ✅ | ❌ Required |
| Full Customization | ✅ | ❌ Limited |
| TypeScript | ✅ | ✅ |
| Production Ready | ✅ | ✅ |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT © [Open Source Community](LICENSE)

---

## 🌟 Star History

If you find FlowKit useful, please consider giving it a star ⭐️

---

<div align="center">

**[Demo](#-demo) • [Documentation](#-documentation) • [Contributing](#-contributing)**

Made with ❤️ by the open-source community

</div>
