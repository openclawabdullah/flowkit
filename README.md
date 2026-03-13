# 🌊 FlowKit

**A beautiful, open-source widget system for chat interfaces.**  
Like ChatKit, but yours.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

---

## ✨ What's New

### 🎨 Chart Widget (5 types!)
- Bar, Line, Pie, Donut, Area charts
- Pure SVG-based, zero dependencies
- Animated & responsive

### 📝 Form Controls
- Input with icons, validation, variants
- Textarea with auto-resize
- Label with required indicator

---

## 🎯 Why FlowKit?

| Feature | FlowKit | ChatKit |
|---------|---------|---------|
| Beautiful UI | ✅ | ✅ |
| Open Source | ✅ MIT | ❌ Proprietary |
| Any Backend | ✅ | ❌ OpenAI only |
| No API Key | ✅ | ❌ Required |
| Full Customization | ✅ | ❌ Limited |
| TypeScript | ✅ | ✅ |

---

## 🚀 Quick Start

```bash
npm install flowkit
```

```tsx
import { Chat, DemoAdapter } from 'flowkit'

const adapter = new DemoAdapter()

function App() {
  return <Chat adapter={adapter} />
}
```

---

## 🧩 All Components (40+)

### 🎛️ Controls
| Component | Description |
|-----------|-------------|
| `Button` | Action buttons (primary, secondary, outline, ghost) |
| `DatePicker` | Date input |
| `Select` | Dropdown select |
| `Checkbox` | Checkbox input |
| `Radio` | Radio button |
| `Input` | Text input with icons, validation |
| `Textarea` | Multi-line text input |
| `Toggle` | On/off switch |
| `Slider` | Range slider |
| `Rating` | Star rating |
| `Upload` | File upload |

### 📐 Layout
| Component | Description |
|-----------|-------------|
| `Box` | Flexible container |
| `Row` | Horizontal flexbox |
| `Col` | Vertical flexbox |
| `Spacer` | Flexible spacing |
| `Divider` | Horizontal/vertical separator |
| `Table` | Data table |
| `Card` | Container with padding, shadows |
| `Grid` | CSS Grid layout |
| `Collapse` | Expandable content |
| `Tabs` | Tabbed interface |
| `Accordion` | Collapsible sections |

### ✏️ Typography
| Component | Description |
|-----------|-------------|
| `Text` | Plain text with formatting |
| `Title` | Headings (h1-h6) |
| `Caption` | Small helper text |
| `Label` | Form labels |
| `Markdown` | Markdown rendering |

### 🎨 Content
| Component | Description |
|-----------|-------------|
| `Image` | Image display |
| `Icon` | Emoji icons |
| `Avatar` | User avatars |
| `Badge` | Status labels |
| `Chart` | Bar, Line, Pie, Donut, Area charts |

### 🔐 Authentication
| Component | Description |
|-----------|-------------|
| `Login` | Complete login form |
| `VerifyOTP` | OTP verification |
| `Register` | Registration form |
| `ForgotPassword` | Password recovery |

### 🛒 E-Commerce
| Component | Description |
|-----------|-------------|
| `ProductCard` | Product display card |
| `ProductGrid` | Product grid layout |
| `Checkout` | Multi-step checkout |
| `PaymentMethod` | Payment selection |
| `OrderSummary` | Order summary |
| `OrderTracking` | Shipment tracking |
| `Invoice` | Invoice display |

### 📂 Categories
| Component | Description |
|-----------|-------------|
| `CategoryList` | Category grid/list |
| `CategoryTree` | Hierarchical categories |

### 💬 Support
| Component | Description |
|-----------|-------------|
| `ContactForm` | Contact form |
| `FAQ` | FAQ accordion |
| `Terms` | Terms & conditions |

### ✅ Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Alert banner |
| `Toast` | Toast notification |
| `Progress` | Progress bar |
| `Spinner` | Loading spinner |
| `Confirmation` | Confirmation dialog |
| `Success` | Success message |
| `Error` | Error display |

---

## 📋 Widget Examples

### Input
```json
{
  "type": "Input",
  "name": "email",
  "placeholder": "Enter email",
  "type_": "email",
  "leftIcon": "✉️",
  "required": true
}
```

### Chart
```json
{
  "type": "Chart",
  "chartType": "bar",
  "title": "Monthly Sales",
  "data": {
    "labels": ["Jan", "Feb", "Mar"],
    "datasets": [{
      "label": "Sales",
      "data": [100, 200, 150]
    }]
  }
}
```

### ProductCard
```json
{
  "type": "ProductCard",
  "productId": "prod-001",
  "image": "https://...",
  "title": "Premium Headphones",
  "price": 299,
  "rating": 4.8,
  "onAddToCartAction": { "type": "add_to_cart" }
}
```

---

## 🔌 Backend Integration

FlowKit works with ANY backend:

### LangGraph
```python
@app.post("/api/chat")
async def chat(request: ChatRequest):
    widgets = process_message(request.message)
    return {"widgets": widgets}
```

### Express
```typescript
app.post('/api/chat', async (req, res) => {
  const widgets = await processMessage(req.body.message)
  res.json({ widgets })
})
```

### Custom Adapter
```typescript
class MyAdapter implements FlowKitAdapter {
  async *sendMessage(message: string): AsyncGenerator<StreamEvent> {
    const response = await fetch('your-api/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    })
    const data = await response.json()
    for (const widget of data.widgets) {
      yield { type: 'widget', widget }
    }
  }
}
```

---

## 📦 Installation

```bash
# npm
npm install flowkit

# yarn
yarn add flowkit

# pnpm
pnpm add flowkit
```

---

## 🎨 Theming

```tsx
import { FlowKitProvider, Theme } from 'flowkit'

const theme: Theme = {
  colors: {
    primary: '#10a37f',    // Your brand color
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  }
}

<FlowKitProvider theme={theme}>
  <Chat adapter={adapter} />
</FlowKitProvider>
```

---

## 📄 License

MIT © [Open Source Community](LICENSE)

---

## 🤝 Contributing

Contributions welcome! See [Contributing Guide](CONTRIBUTING.md).

---

<div align="center">

**[GitHub](https://github.com/openclawabdullah/flowkit)** • **[Demo](#)**

Made with 💚 by the open-source community

</div>
