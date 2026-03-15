/**
 * FlowKit Explorer - Documentation Page
 */

import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export function DocsPage() {
  const location = useLocation()
  const hash = location.hash.slice(1) || 'getting-started'
  
  const sections = [
    { id: 'getting-started', title: 'Getting Started', content: gettingStarted },
    { id: 'installation', title: 'Installation', content: installation },
    { id: 'chat', title: 'Chat Components', content: chatDocs },
    { id: 'adapters', title: 'Adapters', content: adaptersDocs },
    { id: 'widgets', title: 'Widgets', content: widgetsDocs },
    { id: 'theming', title: 'Theming', content: themingDocs },
    { id: 'openai', title: 'OpenAI', content: openaiDocs },
    { id: 'anthropic', title: 'Anthropic', content: anthropicDocs },
    { id: 'langchain', title: 'LangChain', content: langchainDocs },
    { id: 'mcp', title: 'MCP', content: mcpDocs },
    { id: 'http', title: 'HTTP Backend', content: httpDocs },
    { id: 'streaming', title: 'Streaming', content: streamingDocs },
    { id: 'validation', title: 'Validation', content: validationDocs },
    { id: 'builder', title: 'Widget Builder', content: builderDocs },
    { id: 'examples', title: 'Examples', content: examplesDocs },
  ]
  
  const currentSection = sections.find(s => s.id === hash) || sections[0]
  
  return (
    <div className="page docs-page">
      <div className="docs-layout">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <div className="docs-nav">
            <div className="docs-nav-section">
              <div className="docs-nav-title">Start</div>
              <Link to="#getting-started" className={`docs-nav-item ${hash === 'getting-started' ? 'active' : ''}`}>
                Getting Started
              </Link>
              <Link to="#installation" className={`docs-nav-item ${hash === 'installation' ? 'active' : ''}`}>
                Installation
              </Link>
            </div>
            
            <div className="docs-nav-section">
              <div className="docs-nav-title">Core</div>
              <Link to="#chat" className={`docs-nav-item ${hash === 'chat' ? 'active' : ''}`}>Chat Components</Link>
              <Link to="#adapters" className={`docs-nav-item ${hash === 'adapters' ? 'active' : ''}`}>Adapters</Link>
              <Link to="#widgets" className={`docs-nav-item ${hash === 'widgets' ? 'active' : ''}`}>Widgets</Link>
              <Link to="#theming" className={`docs-nav-item ${hash === 'theming' ? 'active' : ''}`}>Theming</Link>
            </div>
            
            <div className="docs-nav-section">
              <div className="docs-nav-title">Integrations</div>
              <Link to="#openai" className={`docs-nav-item ${hash === 'openai' ? 'active' : ''}`}>OpenAI</Link>
              <Link to="#anthropic" className={`docs-nav-item ${hash === 'anthropic' ? 'active' : ''}`}>Anthropic</Link>
              <Link to="#langchain" className={`docs-nav-item ${hash === 'langchain' ? 'active' : ''}`}>LangChain</Link>
              <Link to="#mcp" className={`docs-nav-item ${hash === 'mcp' ? 'active' : ''}`}>MCP</Link>
              <Link to="#http" className={`docs-nav-item ${hash === 'http' ? 'active' : ''}`}>HTTP Backend</Link>
            </div>
            
            <div className="docs-nav-section">
              <div className="docs-nav-title">Advanced</div>
              <Link to="#streaming" className={`docs-nav-item ${hash === 'streaming' ? 'active' : ''}`}>Streaming</Link>
              <Link to="#validation" className={`docs-nav-item ${hash === 'validation' ? 'active' : ''}`}>Validation</Link>
              <Link to="#builder" className={`docs-nav-item ${hash === 'builder' ? 'active' : ''}`}>Widget Builder</Link>
            </div>
            
            <div className="docs-nav-section">
              <div className="docs-nav-title">More</div>
              <Link to="#examples" className={`docs-nav-item ${hash === 'examples' ? 'active' : ''}`}>Examples</Link>
            </div>
          </div>
        </aside>
        
        {/* Content */}
        <main className="docs-content">
          <div className="doc-section">
            {currentSection.content}
          </div>
        </main>
      </div>
    </div>
  )
}

// Doc sections content
const gettingStarted = (
  <>
    <h1>Getting Started</h1>
    <p className="lead">FlowKit is a beautiful, open-source widget system for chat interfaces. Like ChatKit, but yours.</p>
    
    <h2>Why FlowKit?</h2>
    <ul>
      <li><strong>70+ Widgets</strong> - Production-ready components</li>
      <li><strong>10 Themes</strong> - Light, dark, and brand themes</li>
      <li><strong>Zero Lock-in</strong> - Works with any backend</li>
      <li><strong>TypeScript</strong> - Full type safety</li>
      <li><strong>MIT License</strong> - 100% free and open source</li>
    </ul>
    
    <h2>Quick Start</h2>
    <div className="code-block">
      <pre>{`import { TailwindChat, DemoAdapter } from 'flowkit'
import 'flowkit/styles/tailwind.css'

const adapter = new DemoAdapter()

function App() {
  return <TailwindChat adapter={adapter} />
}`}</pre>
    </div>
    
    <h2>Features</h2>
    <div className="features-grid">
      <div className="feature">
        <h3>🎨 Beautiful UI</h3>
        <p>OpenAI-inspired design with smooth animations</p>
      </div>
      <div className="feature">
        <h3>🔧 Flexible</h3>
        <p>Use any LLM backend - OpenAI, Anthropic, custom</p>
      </div>
      <div className="feature">
        <h3>📦 Complete</h3>
        <p>70+ widgets for e-commerce, auth, support, and more</p>
      </div>
      <div className="feature">
        <h3>🌙 Themes</h3>
        <p>10 built-in themes or create your own</p>
      </div>
    </div>
  </>
)

const installation = (
  <>
    <h1>Installation</h1>
    
    <h2>Package Manager</h2>
    <div className="code-block">
      <pre>{`# npm
npm install flowkit

# yarn
yarn add flowkit

# pnpm
pnpm add flowkit`}</pre>
    </div>
    
    <h2>Import Styles</h2>
    <div className="code-block">
      <pre>{`// Tailwind styles (recommended)
import 'flowkit/styles/tailwind.css'

// Or theme variables for custom styling
import 'flowkit/styles/theme-variables.css'`}</pre>
    </div>
    
    <h2>Requirements</h2>
    <ul>
      <li>React 17+</li>
      <li>React DOM 17+</li>
    </ul>
    
    <h2>CDN (Coming Soon)</h2>
    <p>For quick prototyping without a build step.</p>
  </>
)

const chatDocs = (
  <>
    <h1>Chat Components</h1>
    
    <h2>Chat</h2>
    <p>Basic chat component with full messaging interface.</p>
    <div className="code-block">
      <pre>{`import { Chat, DemoAdapter } from 'flowkit'

const adapter = new DemoAdapter()

<Chat
  adapter={adapter}
  placeholder="Type a message..."
  suggestions={['Products', 'Orders', 'Support']}
  onMessage={(msg) => console.log(msg)}
/>`}</pre>
    </div>
    
    <h3>Props</h3>
    <table className="props-table">
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>adapter</td><td>FlowKitAdapter</td><td>required</td><td>Backend adapter</td></tr>
        <tr><td>placeholder</td><td>string</td><td>'Message...'</td><td>Input placeholder</td></tr>
        <tr><td>suggestions</td><td>string[]</td><td>-</td><td>Quick action chips</td></tr>
        <tr><td>onMessage</td><td>function</td><td>-</td><td>Message callback</td></tr>
      </tbody>
    </table>
    
    <h2>TailwindChat</h2>
    <p>Pre-styled chat with OpenAI-like design.</p>
    <div className="code-block">
      <pre>{`import { TailwindChat, OpenAIAdapter } from 'flowkit'
import 'flowkit/styles/tailwind.css'

const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY
})

<TailwindChat
  adapter={adapter}
  welcomeTitle="How can I help?"
  welcomeSubtitle="Ask me anything"
  suggestions={['Products', 'Orders']}
/>`}</pre>
    </div>
    
    <h2>WidgetRenderer</h2>
    <p>Render any widget from JSON.</p>
    <div className="code-block">
      <pre>{`import { WidgetRenderer } from 'flowkit'

const productCard = {
  type: 'ProductCard',
  productId: '1',
  title: 'Product Name',
  price: 99.99
}

<WidgetRenderer 
  widget={productCard}
  onAction={(action) => handleAction(action)}
/>`}</pre>
    </div>
  </>
)

const adaptersDocs = (
  <>
    <h1>Adapters</h1>
    <p>Adapters connect FlowKit to backends.</p>
    
    <h2>Built-in Adapters</h2>
    <table className="props-table">
      <thead>
        <tr><th>Adapter</th><th>Use Case</th></tr>
      </thead>
      <tbody>
        <tr><td>OpenAIAdapter</td><td>GPT-4, GPT-3.5</td></tr>
        <tr><td>AnthropicAdapter</td><td>Claude</td></tr>
        <tr><td>HTTPAdapter</td><td>Custom backends</td></tr>
        <tr><td>DemoAdapter</td><td>Testing</td></tr>
        <tr><td>MockAdapter</td><td>Predefined responses</td></tr>
      </tbody>
    </table>
    
    <h2>OpenAIAdapter</h2>
    <div className="code-block">
      <pre>{`import { OpenAIAdapter } from 'flowkit'

const adapter = new OpenAIAdapter({
  apiKey: 'sk-...',
  model: 'gpt-4',
  systemPrompt: 'You are a helpful assistant...',
  availableWidgets: ['ProductCard', 'FAQ']
})`}</pre>
    </div>
    
    <h2>AnthropicAdapter</h2>
    <div className="code-block">
      <pre>{`import { AnthropicAdapter } from 'flowkit'

const adapter = new AnthropicAdapter({
  apiKey: 'sk-ant-...',
  model: 'claude-sonnet-4-20250514'
})`}</pre>
    </div>
    
    <h2>HTTPAdapter</h2>
    <div className="code-block">
      <pre>{`import { HTTPAdapter } from 'flowkit'

const adapter = new HTTPAdapter({
  endpoint: 'https://your-api.com/chat',
  headers: {
    'Authorization': 'Bearer token'
  }
})`}</pre>
    </div>
    
    <h2>Custom Adapter</h2>
    <div className="code-block">
      <pre>{`class MyAdapter implements FlowKitAdapter {
  async *sendMessage(message: string): AsyncGenerator<StreamEvent> {
    yield { type: 'text', text: 'Hello!' }
    yield { type: 'widget', widget: myWidget }
  }
  
  async *handleAction(action: WidgetAction): AsyncGenerator<StreamEvent> {
    // Handle widget actions
  }
}`}</pre>
    </div>
  </>
)

const widgetsDocs = (
  <>
    <h1>Widgets</h1>
    <p>FlowKit includes 70+ production-ready widgets.</p>
    
    <h2>Categories</h2>
    <ul>
      <li><strong>E-Commerce</strong> (14) - ProductCard, Cart, Checkout, etc.</li>
      <li><strong>Auth</strong> (5) - Login, Register, VerifyOTP</li>
      <li><strong>Support</strong> (4) - FAQ, ContactForm, Terms</li>
      <li><strong>Layout</strong> (7) - Card, Row, Col, Box, Grid</li>
      <li><strong>Feedback</strong> (10) - Progress, Alert, Confirmation</li>
      <li><strong>Advanced</strong> (14) - Calendar, Kanban, Chart, Map</li>
    </ul>
    
    <h2>Widget Schema</h2>
    <div className="code-block">
      <pre>{`{
  "type": "ProductCard",
  "productId": "1",
  "title": "Product Name",
  "price": 99.99,
  "image": "https://...",
  "onAddToCartAction": {
    "type": "add_to_cart",
    "data": { "productId": "1" }
  }
}`}</pre>
    </div>
    
    <h2>Response Format</h2>
    <p>LLM returns widgets in this format:</p>
    <div className="code-block">
      <pre>{`{
  "widgets": [
    { "type": "ProductCard", ... },
    { "type": "Button", ... }
  ]
}`}</pre>
    </div>
    
    <h2>Handling Actions</h2>
    <div className="code-block">
      <pre>{`<WidgetRenderer 
  widget={widget} 
  onAction={(action) => {
    if (action.type === 'add_to_cart') {
      addToCart(action.data.productId)
    }
  }}
/>`}</pre>
    </div>
    
    <p><Link to="/gallery">Browse all widgets in Gallery →</Link></p>
  </>
)

const themingDocs = (
  <>
    <h1>Theming</h1>
    
    <h2>10 Built-in Themes</h2>
    <ul>
      <li>Light (default)</li>
      <li>Dark</li>
      <li>OpenAI</li>
      <li>Midnight</li>
      <li>Sunset</li>
      <li>Forest</li>
      <li>Ocean</li>
      <li>Rose</li>
      <li>Purple</li>
      <li>Cyberpunk</li>
    </ul>
    
    <h2>ThemeProvider</h2>
    <div className="code-block">
      <pre>{`import { ThemeProvider } from 'flowkit'

<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>`}</pre>
    </div>
    
    <h2>useTheme Hook</h2>
    <div className="code-block">
      <pre>{`import { useTheme } from 'flowkit'

function MyComponent() {
  const { theme, setTheme, isDark, toggleDarkMode } = useTheme()
  
  return (
    <button onClick={toggleDarkMode}>
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}`}</pre>
    </div>
    
    <h2>Custom Theme</h2>
    <div className="code-block">
      <pre>{`import { buildTheme } from 'flowkit'

const brandTheme = buildTheme({
  name: 'brand',
  primary: '#FF6B6B',
  mode: 'light'
})

<ThemeProvider customThemes={{ brand: brandTheme }}>
  <App />
</ThemeProvider>`}</pre>
    </div>
    
    <h2>CSS Variables</h2>
    <div className="code-block">
      <pre>{`.my-component {
  background-color: var(--flowkit-surface);
  color: var(--flowkit-text);
  border: 1px solid var(--flowkit-border);
}`}</pre>
    </div>
  </>
)

const openaiDocs = (
  <>
    <h1>OpenAI Integration</h1>
    
    <h2>Setup</h2>
    <div className="code-block">
      <pre>{`import { OpenAIAdapter, TailwindChat } from 'flowkit'
import 'flowkit/styles/tailwind.css'

const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
  systemPrompt: \`You are a helpful assistant.
Return widgets as JSON when appropriate.\`
})

function App() {
  return <TailwindChat adapter={adapter} />
}`}</pre>
    </div>
    
    <h2>Available Widgets</h2>
    <p>Limit which widgets the LLM can use:</p>
    <div className="code-block">
      <pre>{`const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY,
  availableWidgets: ['ProductCard', 'FAQ', 'ContactForm']
})`}</pre>
    </div>
  </>
)

const anthropicDocs = (
  <>
    <h1>Anthropic Integration</h1>
    
    <h2>Setup</h2>
    <div className="code-block">
      <pre>{`import { AnthropicAdapter, TailwindChat } from 'flowkit'

const adapter = new AnthropicAdapter({
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-20250514',
  systemPrompt: 'You are a helpful assistant.'
})

function App() {
  return <TailwindChat adapter={adapter} />
}`}</pre>
    </div>
  </>
)

const langchainDocs = (
  <>
    <h1>LangChain Integration</h1>
    
    <h2>LangChain.js (TypeScript)</h2>
    <div className="code-block">
      <pre>{`import { LangChainAdapter } from 'flowkit/integrations'
import { ChatOpenAI } from '@langchain/openai'

const llm = new ChatOpenAI({ model: 'gpt-4' })

const adapter = new LangChainAdapter({
  llm,
  systemPrompt: 'You are a helpful assistant.'
})`}</pre>
    </div>
    
    <h2>Python Backend</h2>
    <div className="code-block">
      <pre>{`from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")

@app.post("/api/chat")
async def chat(request: ChatRequest):
    response = llm.invoke(request.message)
    return {"widgets": parse_widgets(response.content)}`}</pre>
    </div>
  </>
)

const mcpDocs = (
  <>
    <h1>MCP (Model Context Protocol) Integration</h1>
    
    <h2>Overview</h2>
    <p>FlowKit works great with MCP servers for tool calling.</p>
    
    <h2>FastMCP Example</h2>
    <div className="code-block">
      <pre>{`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("flowkit-tools")

@mcp.tool()
def show_product(product_id: str) -> dict:
    return {
        "type": "ProductCard",
        "productId": product_id,
        "title": "Product Name",
        "price": 99.99
    }`}</pre>
    </div>
    
    <h2>MCP Widget Response Helper</h2>
    <div className="code-block">
      <pre>{`import { mcpWidgetResponse } from 'flowkit/integrations'

// In your MCP tool handler
const response = mcpWidgetResponse(widget)
// Returns properly formatted MCP response`}</pre>
    </div>
  </>
)

const httpDocs = (
  <>
    <h1>HTTP Backend Integration</h1>
    
    <h2>Setup</h2>
    <div className="code-block">
      <pre>{`import { HTTPAdapter } from 'flowkit'

const adapter = new HTTPAdapter({
  endpoint: 'https://your-api.com/chat',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  }
})`}</pre>
    </div>
    
    <h2>Backend Response Format</h2>
    <p>Your backend should return:</p>
    <div className="code-block">
      <pre>{`{
  "widgets": [
    { "type": "ProductCard", "title": "...", "price": 99.99 },
    { "type": "Button", "label": "Add to Cart" }
  ]
}`}</pre>
    </div>
    
    <h2>Streaming (SSE)</h2>
    <p>For streaming responses, use Server-Sent Events:</p>
    <div className="code-block">
      <pre>{`// Backend (Express)
app.post('/chat', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  
  // Stream widgets
  res.write(\`data: {"type": "text", "text": "Here"}\\n\\n\`)
  res.write(\`data: {"type": "widget", "widget": {...}}\\n\\n\`)
  res.end()
})`}</pre>
    </div>
  </>
)

const streamingDocs = (
  <>
    <h1>Streaming</h1>
    
    <h2>Overview</h2>
    <p>FlowKit supports streaming responses for better UX.</p>
    
    <h2>Stream Events</h2>
    <div className="code-block">
      <pre>{`// Text chunk
{ type: 'text', text: 'Hello' }

// Widget
{ type: 'widget', widget: { type: 'ProductCard', ... } }

// Done
{ type: 'done' }

// Error
{ type: 'error', error: 'Something went wrong' }`}</pre>
    </div>
    
    <h2>Custom Adapter Streaming</h2>
    <div className="code-block">
      <pre>{`class MyAdapter implements FlowKitAdapter {
  async *sendMessage(message: string): AsyncGenerator<StreamEvent> {
    // Stream text
    yield { type: 'text', text: 'Here is ' }
    yield { type: 'text', text: 'your product' }
    
    // Stream widget
    yield { 
      type: 'widget', 
      widget: { type: 'ProductCard', ... } 
    }
    
    // Done
    yield { type: 'done' }
  }
}`}</pre>
    </div>
  </>
)

const validationDocs = (
  <>
    <h1>Validation</h1>
    
    <h2>validateWidget</h2>
    <p>Validate widgets before rendering.</p>
    <div className="code-block">
      <pre>{`import { validateWidget } from 'flowkit'

const result = validateWidget(widgetFromLLM, {
  allowUnknown: false,
  validateUrls: true
})

if (!result.valid) {
  console.error('Invalid widget:', result.errors)
}`}</pre>
    </div>
    
    <h2>parseWidgetsFromLLM</h2>
    <p>Parse widgets from LLM response (handles escaped JSON, markdown code blocks, etc.)</p>
    <div className="code-block">
      <pre>{`import { parseWidgetsFromLLM } from 'flowkit'

const response = await llm.generate(prompt)
const widgets = parseWidgetsFromLLM(response)

// Handles:
// - Escaped JSON (\\"{ ... }\\")
// - Markdown code blocks
// - Mixed text/JSON`}</pre>
    </div>
  </>
)

const builderDocs = (
  <>
    <h1>Widget Builder</h1>
    
    <h2>Overview</h2>
    <p>Fluent API for building widgets programmatically.</p>
    
    <h2>Usage</h2>
    <div className="code-block">
      <pre>{`import { widget } from 'flowkit'

const product = widget('ProductCard')
  .set('title', 'Product Name')
  .set('price', 99.99)
  .set('image', 'https://...')
  .action('addToCart', { productId: '1' })
  .build()

// Result:
// {
//   type: 'ProductCard',
//   title: 'Product Name',
//   price: 99.99,
//   image: 'https://...',
//   onAddToCartAction: { type: 'addToCart', data: { productId: '1' } }
// }`}</pre>
    </div>
    
    <h2>Widget Schema Generator</h2>
    <div className="code-block">
      <pre>{`import { generateWidgetSchema } from 'flowkit'

// Generate schema for LLM function calling
const schema = generateWidgetSchema(['ProductCard', 'FAQ'])
// Returns JSON schema for all listed widgets`}</pre>
    </div>
  </>
)

const examplesDocs = (
  <>
    <h1>Examples</h1>
    
    <h2>E-commerce Chatbot</h2>
    <div className="code-block">
      <pre>{`import { TailwindChat, OpenAIAdapter } from 'flowkit'

const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: \`You are a shopping assistant.
Help users find products and manage their cart.
Available widgets: ProductCard, Cart, Checkout\`,
  availableWidgets: ['ProductCard', 'ProductGrid', 'Cart', 'Checkout']
})

function App() {
  return <TailwindChat adapter={adapter} />
}`}</pre>
    </div>
    
    <h2>Support Bot</h2>
    <div className="code-block">
      <pre>{`const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: \`You are a support assistant.
Help users with common questions and issues.
Available widgets: FAQ, ContactForm, OrderTracking\`,
  availableWidgets: ['FAQ', 'ContactForm', 'OrderTracking', 'Login']
})`}</pre>
    </div>
    
    <h2>Custom Backend</h2>
    <div className="code-block">
      <pre>{`import { HTTPAdapter } from 'flowkit'

const adapter = new HTTPAdapter({
  endpoint: 'https://your-api.com/chat',
  headers: {
    'Authorization': \`Bearer \${process.env.API_TOKEN}\`
  }
})

<TailwindChat adapter={adapter} />`}</pre>
    </div>
  </>
)

export default DocsPage
