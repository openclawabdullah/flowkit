# FlowKit + Tailwind CSS

Make FlowKit look stunning like OpenAI's ChatKit!

---

## Quick Start

### 1. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure tailwind.config.js

```javascript
import flowkitConfig from 'flowkit/tailwind.config.js'

export default {
  ...flowkitConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowkit/**/*.{js,ts,jsx,tsx}',
  ],
}
```

### 3. Import Tailwind Styles

```css
/* src/index.css */
@import 'flowkit/styles/tailwind.css';
```

### 4. Use TailwindChat

```tsx
import { TailwindChat, DemoAdapter } from 'flowkit'
import 'flowkit/styles/tailwind.css'

const adapter = new DemoAdapter()

function App() {
  return (
    <div className="h-screen">
      <TailwindChat
        adapter={adapter}
        welcomeTitle="How can I help?"
        suggestions={['Show products', 'Track order', 'Contact support']}
      />
    </div>
  )
}
```

---

## What's Included

### Styled Components

| Component | Description |
|-----------|-------------|
| `TailwindChat` | Full chat interface with OpenAI styling |
| `.flowkit-chat` | Main chat container |
| `.flowkit-messages` | Messages scroll area |
| `.flowkit-message` | Message wrapper |
| `.flowkit-bubble-user` | User message bubble (green) |
| `.flowkit-bubble-assistant` | Assistant message bubble |
| `.flowkit-input-wrapper` | Input container with focus states |
| `.flowkit-widget` | Widget card with hover effects |
| `.flowkit-typing` | Typing indicator with animation |

### Widget Styles

| Widget | Class | Features |
|--------|-------|----------|
| Card | `.flowkit-card` | Rounded corners, shadow, hover effects |
| Button | `.flowkit-button-*` | Primary, secondary, outline, ghost |
| Badge | `.flowkit-badge-*` | Success, warning, error, info |
| Alert | `.flowkit-alert-*` | Icon + colored background |
| Product Card | `.flowkit-product-card` | Image, hover lift effect |
| Order Summary | `.flowkit-order-summary` | Items list, totals |
| FAQ | `.flowkit-faq-*` | Accordion style |
| Progress | `.flowkit-progress` | Animated progress bar |
| Stats | `.flowkit-stats` | Large value, change indicator |
| Timeline | `.flowkit-timeline-*` | Vertical timeline with dots |

### Animations

| Animation | Description |
|-----------|-------------|
| `animate-slide-up` | Message fade-in + slide |
| `animate-typing-dot` | Bouncing typing dots |
| `animate-fade-in` | Simple fade |
| `animate-pulse-soft` | Soft pulsing |

---

## Customization

### Override Colors

```css
/* In your CSS */
:root {
  --flowkit-primary: #10a37f;
  --flowkit-primary-hover: #0d8a6a;
  --flowkit-background: #ffffff;
  --flowkit-surface: #f7f7f8;
}
```

### Custom Tailwind Config

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        flowkit: {
          primary: '#YOUR_COLOR',
          'primary-hover': '#YOUR_DARKER_COLOR',
        }
      }
    }
  }
}
```

### Custom Welcome Screen

```tsx
<TailwindChat
  adapter={adapter}
  welcomeIcon="🛒"
  welcomeTitle="Welcome to My Store!"
  welcomeSubtitle="I'm your shopping assistant"
  suggestions={['Browse products', 'Track order']}
/>
```

---

## Complete Example

```tsx
// App.tsx
import { TailwindChat, OpenAIAdapter } from 'flowkit'
import 'flowkit/styles/tailwind.css'

const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: `You are a helpful shopping assistant.
  
Return widgets for products, orders, and cart operations.
Use the ProductCard widget for products, OrderSummary for cart, etc.`
})

function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">
          My Store Assistant
        </h1>
      </header>
      
      {/* Chat */}
      <TailwindChat
        adapter={adapter}
        className="flex-1"
        welcomeTitle="How can I help you shop today?"
        suggestions={[
          'Show me headphones',
          'Track my order',
          'What\'s in my cart?',
          'Contact support',
        ]}
      />
    </div>
  )
}
```

---

## Dark Mode

FlowKit supports dark mode via CSS custom properties:

```css
@media (prefers-color-scheme: dark) {
  .flowkit-dark-auto {
    --flowkit-background: #1a1a1a;
    --flowkit-surface: #2a2a2a;
    --flowkit-text: #ffffff;
    --flowkit-text-secondary: #a0a0a0;
    --flowkit-border: #3a3a3a;
  }
}
```

Or use with Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-900">
  <TailwindChat adapter={adapter} />
</div>
```

---

## Comparison

| Feature | Default Chat | TailwindChat |
|---------|-------------|--------------|
| Styling | Inline CSS | Tailwind classes |
| Customization | Limited | Full Tailwind |
| Size | Smaller | +Tailwind bundle |
| Look | Basic | OpenAI-like |
| Animations | None | Smooth transitions |
| Dark mode | No | Yes |

---

## Files

```
flowkit/
├── src/
│   ├── styles/
│   │   └── tailwind.css     # All Tailwind styles
│   ├── TailwindChat.tsx     # Styled chat component
│   └── index.ts             # Exports
├── tailwind.config.js       # Tailwind config with FlowKit theme
└── README-TAILWIND.md       # This file
```

---

## Questions?

Open an issue at https://github.com/openclawabdullah/flowkit
