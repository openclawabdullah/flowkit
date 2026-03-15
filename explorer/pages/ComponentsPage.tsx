/**
 * FlowKit Explorer - Components Page
 * 
 * Browse all components with code examples
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState(components[0])
  
  return (
    <div className="page components-page">
      <div className="page-header">
        <h1 className="page-title">🧩 Components</h1>
        <p className="page-subtitle">
          Learn about all available components and how to use them
        </p>
      </div>
      
      <div className="components-layout">
        {/* Sidebar */}
        <aside className="components-sidebar">
          <div className="component-categories">
            {['Chat', 'Widgets', 'Adapters', 'Utilities', 'Theming'].map(cat => (
              <div key={cat} className="component-category">
                <h3 className="category-title">{cat}</h3>
                <div className="component-list">
                  {components
                    .filter(c => c.category === cat)
                    .map(comp => (
                      <button
                        key={comp.name}
                        className={`component-item ${selectedComponent?.name === comp.name ? 'active' : ''}`}
                        onClick={() => setSelectedComponent(comp)}
                      >
                        {comp.name}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="components-main">
          {selectedComponent && (
            <div className="component-docs">
              <header className="component-header">
                <h2 className="component-name">{selectedComponent.name}</h2>
                <p className="component-description">{selectedComponent.description}</p>
                <div className="component-meta">
                  <span className="meta-tag">{selectedComponent.category}</span>
                  {selectedComponent.since && (
                    <span className="meta-version">Since v{selectedComponent.since}</span>
                  )}
                </div>
              </header>
              
              {/* Props */}
              <section className="component-section">
                <h3>Props</h3>
                <table className="props-table">
                  <thead>
                    <tr>
                      <th>Prop</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedComponent.props.map(prop => (
                      <tr key={prop.name}>
                        <td className="prop-name">
                          {prop.name}
                          {prop.required && <span className="required">*</span>}
                        </td>
                        <td className="prop-type">{prop.type}</td>
                        <td className="prop-default">
                          {prop.default !== undefined ? (
                            <code>{JSON.stringify(prop.default)}</code>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="prop-description">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              
              {/* Usage */}
              <section className="component-section">
                <h3>Usage</h3>
                <div className="code-example">
                  <div className="code-header">
                    <span>Example</span>
                    <button className="copy-btn">Copy</button>
                  </div>
                  <pre className="code-block">
                    <code>{selectedComponent.usage}</code>
                  </pre>
                </div>
              </section>
              
              {/* Live Preview */}
              {selectedComponent.preview && (
                <section className="component-section">
                  <h3>Preview</h3>
                  <div className="preview-container">
                    <div className="preview-box">
                      {selectedComponent.preview}
                    </div>
                  </div>
                </section>
              )}
              
              {/* Related */}
              <section className="component-section">
                <h3>Related</h3>
                <div className="related-links">
                  {selectedComponent.related?.map(rel => (
                    <Link 
                      key={rel}
                      to={`/components#${rel}`}
                      className="related-link"
                    >
                      {rel}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

const components = [
  // Chat Components
  {
    name: 'Chat',
    category: 'Chat',
    description: 'Main chat component with full messaging interface',
    since: '1.0.0',
    props: [
      { name: 'adapter', type: 'FlowKitAdapter', required: true, description: 'Adapter for backend connection' },
      { name: 'placeholder', type: 'string', default: 'Type a message...', description: 'Input placeholder text' },
      { name: 'suggestions', type: 'string[]', description: 'Quick action suggestions' },
      { name: 'onMessage', type: '(message: Message) => void', description: 'Callback when message is sent' },
    ],
    usage: `import { Chat, DemoAdapter } from 'flowkit'

const adapter = new DemoAdapter()

<Chat
  adapter={adapter}
  placeholder="Ask me anything..."
  suggestions={['Show products', 'Track order']}
  onMessage={(msg) => console.log(msg)}
/>`,
    related: ['TailwindChat', 'FlowKitAdapter', 'Message'],
  },
  {
    name: 'TailwindChat',
    category: 'Chat',
    description: 'Pre-styled chat with OpenAI-like design',
    since: '1.0.0',
    props: [
      { name: 'adapter', type: 'FlowKitAdapter', required: true, description: 'Adapter instance' },
      { name: 'welcomeTitle', type: 'string', default: 'How can I help?', description: 'Welcome screen title' },
      { name: 'welcomeSubtitle', type: 'string', description: 'Welcome screen subtitle' },
      { name: 'suggestions', type: 'string[]', description: 'Suggestion chips' },
    ],
    usage: `import { TailwindChat, OpenAIAdapter } from 'flowkit'
import 'flowkit/styles/tailwind.css'

const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY
})

<TailwindChat
  adapter={adapter}
  welcomeTitle="Welcome!"
  suggestions={['Products', 'Orders', 'Support']}
/>`,
    related: ['Chat', 'ThemeProvider'],
  },
  {
    name: 'WidgetRenderer',
    category: 'Widgets',
    description: 'Render any widget from JSON',
    since: '1.0.0',
    props: [
      { name: 'widget', type: 'Widget', required: true, description: 'Widget object to render' },
      { name: 'onAction', type: '(action: WidgetAction) => void', description: 'Action handler' },
    ],
    usage: `import { WidgetRenderer } from 'flowkit'

const productCard = {
  type: 'ProductCard',
  productId: '1',
  title: 'Product Name',
  price: 99.99
}

<WidgetRenderer 
  widget={productCard}
  onAction={(action) => handleAction(action)}
/>`,
    related: ['Widget Types', 'WidgetAction'],
  },
  
  // Adapters
  {
    name: 'OpenAIAdapter',
    category: 'Adapters',
    description: 'Connect to OpenAI GPT models',
    since: '1.0.0',
    props: [
      { name: 'apiKey', type: 'string', required: true, description: 'OpenAI API key' },
      { name: 'model', type: 'string', default: 'gpt-4', description: 'Model to use' },
      { name: 'systemPrompt', type: 'string', description: 'System prompt' },
      { name: 'availableWidgets', type: 'string[]', description: 'Available widget types' },
    ],
    usage: `import { OpenAIAdapter } from 'flowkit'

const adapter = new OpenAIAdapter({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
  systemPrompt: 'You are a helpful assistant...',
  availableWidgets: ['ProductCard', 'FAQ', 'ContactForm']
})`,
    related: ['AnthropicAdapter', 'HTTPAdapter'],
  },
  {
    name: 'AnthropicAdapter',
    category: 'Adapters',
    description: 'Connect to Anthropic Claude models',
    since: '1.0.0',
    props: [
      { name: 'apiKey', type: 'string', required: true, description: 'Anthropic API key' },
      { name: 'model', type: 'string', default: 'claude-sonnet-4-20250514', description: 'Model to use' },
    ],
    usage: `import { AnthropicAdapter } from 'flowkit'

const adapter = new AnthropicAdapter({
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-20250514'
})`,
    related: ['OpenAIAdapter', 'HTTPAdapter'],
  },
  {
    name: 'HTTPAdapter',
    category: 'Adapters',
    description: 'Connect to any HTTP backend',
    since: '1.0.0',
    props: [
      { name: 'endpoint', type: 'string', required: true, description: 'API endpoint URL' },
      { name: 'headers', type: 'Record<string, string>', description: 'Custom headers' },
    ],
    usage: `import { HTTPAdapter } from 'flowkit'

const adapter = new HTTPAdapter({
  endpoint: 'https://your-api.com/chat',
  headers: {
    'Authorization': 'Bearer token'
  }
})`,
    related: ['OpenAIAdapter', 'LangChainAdapter'],
  },
  
  // Utilities
  {
    name: 'validateWidget',
    category: 'Utilities',
    description: 'Validate widget JSON before rendering',
    since: '1.0.0',
    props: [
      { name: 'widget', type: 'any', required: true, description: 'Widget to validate' },
      { name: 'options', type: 'ValidationOptions', description: 'Validation options' },
    ],
    usage: `import { validateWidget } from 'flowkit'

const result = validateWidget(widgetFromLLM, {
  allowUnknown: false,
  validateUrls: true
})

if (!result.valid) {
  console.error(result.errors)
}`,
    related: ['sanitizeWidget', 'parseWidgetsFromLLM'],
  },
  {
    name: 'parseWidgetsFromLLM',
    category: 'Utilities',
    description: 'Parse widgets from LLM response',
    since: '1.0.0',
    props: [
      { name: 'response', type: 'string', required: true, description: 'LLM response text' },
    ],
    usage: `import { parseWidgetsFromLLM } from 'flowkit'

const llmResponse = '{"widgets": [...]}'
const widgets = parseWidgetsFromLLM(llmResponse)

// Returns array of widgets, handles:
// - Escaped JSON
// - Markdown code blocks
// - Mixed text/JSON
`,
    related: ['unescapeLLMJson', 'validateWidget'],
  },
  {
    name: 'buildTheme',
    category: 'Utilities',
    description: 'Create custom theme from primary color',
    since: '1.0.0',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Theme name' },
      { name: 'primary', type: 'string', required: true, description: 'Primary color hex' },
      { name: 'mode', type: '"light" | "dark"', default: 'light', description: 'Color mode' },
    ],
    usage: `import { buildTheme } from 'flowkit'

const brandTheme = buildTheme({
  name: 'brand',
  primary: '#FF6B6B',
  mode: 'light'
})

// Auto-generates all color variations`,
    related: ['ThemeProvider', 'themes'],
  },
  
  // Theming
  {
    name: 'ThemeProvider',
    category: 'Theming',
    description: 'Provide theme context to all components',
    since: '1.0.0',
    props: [
      { name: 'defaultTheme', type: 'ThemeName', default: 'light', description: 'Initial theme' },
      { name: 'detectSystem', type: 'boolean', default: true, description: 'Auto-detect system preference' },
      { name: 'customThemes', type: 'Record<string, FlowKitTheme>', description: 'Custom themes' },
    ],
    usage: `import { ThemeProvider } from 'flowkit'
import 'flowkit/styles/theme-variables.css'

<ThemeProvider 
  defaultTheme="dark"
  detectSystem={true}
  customThemes={{ brand: brandTheme }}
>
  <App />
</ThemeProvider>`,
    related: ['useTheme', 'ThemeSwitcher'],
  },
  {
    name: 'useTheme',
    category: 'Theming',
    description: 'Access current theme and setters',
    since: '1.0.0',
    props: [],
    usage: `import { useTheme } from 'flowkit'

function MyComponent() {
  const { theme, setTheme, isDark, toggleDarkMode } = useTheme()
  
  return (
    <button onClick={toggleDarkMode}>
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}`,
    related: ['ThemeProvider', 'useThemeColors'],
  },
  {
    name: 'ThemeSwitcher',
    category: 'Theming',
    description: 'Pre-built theme dropdown',
    since: '1.0.0',
    props: [
      { name: 'showLabel', type: 'boolean', default: true, description: 'Show "Theme:" label' },
    ],
    usage: `import { ThemeSwitcher } from 'flowkit'

<ThemeSwitcher />
// Dropdown with all 10 themes`,
    related: ['ThemeProvider', 'useTheme'],
  },
]

export default ComponentsPage
