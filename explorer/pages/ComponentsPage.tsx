/**
 * FlowKit Explorer - Components Page
 * 
 * Library of ALL available components for building widgets
 */

import React, { useState } from 'react'

export function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  
  const categories = [
    { id: 'all', label: 'All Components', icon: '📦' },
    { id: 'inputs', label: 'Input Elements', icon: '📝' },
    { id: 'buttons', label: 'Buttons & Actions', icon: '🔘' },
    { id: 'display', label: 'Display', icon: '🖼️' },
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'feedback', label: 'Feedback', icon: '✅' },
    { id: 'navigation', label: 'Navigation', icon: '🧭' },
  ]
  
  const components = getAllComponents()
  
  const filteredComponents = selectedCategory === 'all' 
    ? components 
    : components.filter(c => c.category === selectedCategory)
  
  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }
  
  return (
    <div className="page components-page">
      <div className="page-header">
        <h1 className="page-title">Components</h1>
        <p className="page-subtitle">
          {components.length} components available for building widgets
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="components-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
      
      {/* Components Grid */}
      <div className="components-grid">
        {filteredComponents.map(comp => (
          <div key={comp.id} className="component-card">
            <div className="component-preview">
              {comp.preview}
            </div>
            
            <div className="component-info">
              <h3 className="component-title">{comp.name}</h3>
              <p className="component-description">{comp.description}</p>
              
              {comp.props && (
                <div className="component-props">
                  <h4>Properties</h4>
                  <table className="props-mini-table">
                    <tbody>
                      {comp.props.slice(0, 3).map((prop: any, i: number) => (
                        <tr key={i}>
                          <td className="prop-name">{prop.name}</td>
                          <td className="prop-type">{prop.type}</td>
                        </tr>
                      ))}
                      {comp.props.length > 3 && (
                        <tr>
                          <td colSpan={2} className="props-more">
                            +{comp.props.length - 3} more properties
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="component-code">
                <div className="code-header">
                  <span>Usage</span>
                  <button 
                    className={`copy-btn ${copiedCode === comp.id ? 'copied' : ''}`}
                    onClick={() => copyCode(comp.code, comp.id)}
                  >
                    {copiedCode === comp.id ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="code-snippet">{comp.code}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getAllComponents() {
  return [
    // === INPUT ELEMENTS ===
    {
      id: 'text-input',
      category: 'inputs',
      name: 'Text Input',
      description: 'Single-line text input field',
      preview: (
        <input 
          type="text" 
          placeholder="Enter text..." 
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            fontSize: 14
          }}
        />
      ),
      props: [
        { name: 'type', type: 'string' },
        { name: 'placeholder', type: 'string' },
        { name: 'value', type: 'string' },
        { name: 'required', type: 'boolean' },
        { name: 'disabled', type: 'boolean' },
      ],
      code: `{
  "type": "Input",
  "inputType": "text",
  "placeholder": "Enter text...",
  "name": "username"
}`
    },
    {
      id: 'email-input',
      category: 'inputs',
      name: 'Email Input',
      description: 'Email input with validation',
      preview: (
        <input 
          type="email" 
          placeholder="email@example.com" 
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            fontSize: 14
          }}
        />
      ),
      props: [
        { name: 'type', type: '"email"' },
        { name: 'placeholder', type: 'string' },
        { name: 'validation', type: 'object' },
      ],
      code: `{
  "type": "Input",
  "inputType": "email",
  "placeholder": "email@example.com",
  "required": true
}`
    },
    {
      id: 'password-input',
      category: 'inputs',
      name: 'Password Input',
      description: 'Password input with toggle visibility',
      preview: (
        <input 
          type="password" 
          placeholder="••••••••" 
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            fontSize: 14
          }}
        />
      ),
      props: [
        { name: 'showToggle', type: 'boolean' },
        { name: 'minLength', type: 'number' },
      ],
      code: `{
  "type": "Input",
  "inputType": "password",
  "placeholder": "••••••••",
  "showToggle": true
}`
    },
    {
      id: 'number-input',
      category: 'inputs',
      name: 'Number Input',
      description: 'Numeric input with increment/decrement',
      preview: (
        <input 
          type="number" 
          placeholder="0" 
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            fontSize: 14
          }}
        />
      ),
      props: [
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'step', type: 'number' },
      ],
      code: `{
  "type": "Input",
  "inputType": "number",
  "min": 0,
  "max": 100,
  "step": 1
}`
    },
    {
      id: 'textarea',
      category: 'inputs',
      name: 'Textarea',
      description: 'Multi-line text input',
      preview: (
        <textarea 
          placeholder="Enter message..." 
          rows={3}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            fontSize: 14,
            resize: 'vertical'
          }}
        />
      ),
      props: [
        { name: 'rows', type: 'number' },
        { name: 'maxLength', type: 'number' },
      ],
      code: `{
  "type": "Textarea",
  "placeholder": "Enter message...",
  "rows": 4,
  "maxLength": 500
}`
    },
    {
      id: 'checkbox',
      category: 'inputs',
      name: 'Checkbox',
      description: 'Single checkbox input',
      preview: (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: 18, height: 18 }} />
          <span style={{ fontSize: 14 }}>Accept terms</span>
        </label>
      ),
      props: [
        { name: 'checked', type: 'boolean' },
        { name: 'label', type: 'string' },
      ],
      code: `{
  "type": "Checkbox",
  "label": "Accept terms",
  "name": "terms"
}`
    },
    {
      id: 'radio',
      category: 'inputs',
      name: 'Radio Group',
      description: 'Radio button group for single selection',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Option 1', 'Option 2', 'Option 3'].map((opt, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="radio" name="radio" defaultChecked={i === 0} style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 13 }}>{opt}</span>
            </label>
          ))}
        </div>
      ),
      props: [
        { name: 'options', type: 'array' },
        { name: 'value', type: 'string' },
      ],
      code: `{
  "type": "RadioGroup",
  "name": "plan",
  "options": [
    { "label": "Basic", "value": "basic" },
    { "label": "Pro", "value": "pro" },
    { "label": "Enterprise", "value": "enterprise" }
  ],
  "value": "pro"
}`
    },
    {
      id: 'select',
      category: 'inputs',
      name: 'Select/Dropdown',
      description: 'Dropdown selection',
      preview: (
        <select style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #e5e5e5',
          borderRadius: 8,
          fontSize: 14
        }}>
          <option>Select option...</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      ),
      props: [
        { name: 'options', type: 'array' },
        { name: 'placeholder', type: 'string' },
      ],
      code: `{
  "type": "Select",
  "placeholder": "Select...",
  "options": [
    { "label": "US", "value": "us" },
    { "label": "UK", "value": "uk" },
    { "label": "EU", "value": "eu" }
  ]
}`
    },
    {
      id: 'toggle',
      category: 'inputs',
      name: 'Toggle/Switch',
      description: 'On/off toggle switch',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 44,
            height: 24,
            background: '#10a37f',
            borderRadius: 12,
            position: 'relative',
            cursor: 'pointer'
          }}>
            <div style={{
              width: 20,
              height: 20,
              background: 'white',
              borderRadius: '50%',
              position: 'absolute',
              right: 2,
              top: 2
            }}></div>
          </div>
          <span style={{ fontSize: 14 }}>Enabled</span>
        </div>
      ),
      props: [
        { name: 'checked', type: 'boolean' },
        { name: 'label', type: 'string' },
      ],
      code: `{
  "type": "Toggle",
  "label": "Enable notifications",
  "checked": true
}`
    },
    {
      id: 'range-slider',
      category: 'inputs',
      name: 'Range Slider',
      description: 'Range/slider input',
      preview: (
        <div style={{ width: '100%' }}>
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="50"
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b7280', marginTop: 4 }}>
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      ),
      props: [
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'value', type: 'number' },
      ],
      code: `{
  "type": "RangeSlider",
  "min": 0,
  "max": 100,
  "value": 50,
  "label": "Volume"
}`
    },
    
    // === BUTTONS & ACTIONS ===
    {
      id: 'button-primary',
      category: 'buttons',
      name: 'Primary Button',
      description: 'Main call-to-action button',
      preview: (
        <button style={{
          padding: '10px 20px',
          background: '#10a37f',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
          width: '100%'
        }}>
          Primary Action
        </button>
      ),
      props: [
        { name: 'label', type: 'string' },
        { name: 'icon', type: 'string' },
        { name: 'onClickAction', type: 'object' },
      ],
      code: `{
  "type": "Button",
  "label": "Submit",
  "variant": "primary",
  "onClickAction": {
    "type": "submit",
    "data": {}
  }
}`
    },
    {
      id: 'button-secondary',
      category: 'buttons',
      name: 'Secondary Button',
      description: 'Secondary/outline button',
      preview: (
        <button style={{
          padding: '10px 20px',
          background: 'white',
          color: '#374151',
          border: '1px solid #e5e5e5',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
          width: '100%'
        }}>
          Secondary Action
        </button>
      ),
      props: [
        { name: 'label', type: 'string' },
        { name: 'variant', type: '"secondary"' },
      ],
      code: `{
  "type": "Button",
  "label": "Cancel",
  "variant": "secondary"
}`
    },
    {
      id: 'button-icon',
      category: 'buttons',
      name: 'Icon Button',
      description: 'Button with icon',
      preview: (
        <button style={{
          padding: '10px 20px',
          background: '#10a37f',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%'
        }}>
          <span>🛒</span>
          <span>Add to Cart</span>
        </button>
      ),
      props: [
        { name: 'iconStart', type: 'string' },
        { name: 'iconEnd', type: 'string' },
      ],
      code: `{
  "type": "Button",
  "label": "Add to Cart",
  "iconStart": "ShoppingCart",
  "variant": "primary"
}`
    },
    
    // === DISPLAY ===
    {
      id: 'text-heading',
      category: 'display',
      name: 'Heading/Title',
      description: 'Text heading (h1-h6)',
      preview: (
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 700 }}>Main Heading</h2>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>Subtitle text goes here</p>
        </div>
      ),
      props: [
        { name: 'level', type: '1-6' },
        { name: 'text', type: 'string' },
      ],
      code: `{
  "type": "Text",
  "text": "Welcome Back",
  "as": "h2",
  "weight": "bold"
}`
    },
    {
      id: 'text-paragraph',
      category: 'display',
      name: 'Paragraph',
      description: 'Body text paragraph',
      preview: (
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#374151' }}>
          This is a paragraph of text. It can contain multiple sentences and will wrap naturally.
        </p>
      ),
      props: [
        { name: 'text', type: 'string' },
        { name: 'size', type: '"sm"|"md"|"lg"' },
      ],
      code: `{
  "type": "Text",
  "text": "Your long text here...",
  "as": "p"
}`
    },
    {
      id: 'badge',
      category: 'display',
      name: 'Badge',
      description: 'Small badge/label',
      preview: (
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#166534', fontSize: 12, fontWeight: 600, borderRadius: 4 }}>Success</span>
          <span style={{ padding: '4px 10px', background: '#dbeafe', color: '#1e40af', fontSize: 12, fontWeight: 600, borderRadius: 4 }}>Info</span>
          <span style={{ padding: '4px 10px', background: '#fef3c7', color: '#92400e', fontSize: 12, fontWeight: 600, borderRadius: 4 }}>Warning</span>
        </div>
      ),
      props: [
        { name: 'text', type: 'string' },
        { name: 'variant', type: 'string' },
      ],
      code: `{
  "type": "Badge",
  "text": "NEW",
  "variant": "success"
}`
    },
    {
      id: 'image',
      category: 'display',
      name: 'Image',
      description: 'Display an image',
      preview: (
        <div style={{ 
          width: '100%', 
          height: 100, 
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af'
        }}>
          🖼️ Image
        </div>
      ),
      props: [
        { name: 'src', type: 'string' },
        { name: 'alt', type: 'string' },
        { name: 'width', type: 'number' },
      ],
      code: `{
  "type": "Image",
  "src": "https://...",
  "alt": "Product image",
  "width": 400
}`
    },
    {
      id: 'rating',
      category: 'display',
      name: 'Rating',
      description: 'Star rating display',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#fbbf24', fontSize: 16 }}>★★★★★</span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>4.8</span>
          <span style={{ color: '#9ca3af', fontSize: 12 }}>(124)</span>
        </div>
      ),
      props: [
        { name: 'value', type: 'number' },
        { name: 'count', type: 'number' },
      ],
      code: `{
  "type": "Rating",
  "value": 4.8,
  "count": 124,
  "max": 5
}`
    },
    {
      id: 'price',
      category: 'display',
      name: 'Price',
      description: 'Price display with optional discount',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: 14 }}>$149</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#10a37f' }}>$99</span>
        </div>
      ),
      props: [
        { name: 'value', type: 'number' },
        { name: 'originalPrice', type: 'number' },
        { name: 'currency', type: 'string' },
      ],
      code: `{
  "type": "Price",
  "value": 99.99,
  "originalPrice": 149.99,
  "currency": "USD"
}`
    },
    {
      id: 'avatar',
      category: 'display',
      name: 'Avatar',
      description: 'User avatar/image',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>JD</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>John Doe</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>john@example.com</div>
          </div>
        </div>
      ),
      props: [
        { name: 'name', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'size', type: '"sm"|"md"|"lg"' },
      ],
      code: `{
  "type": "Avatar",
  "name": "John Doe",
  "image": "https://...",
  "size": "md"
}`
    },
    
    // === LAYOUT ===
    {
      id: 'card-container',
      category: 'layout',
      name: 'Card',
      description: 'Container with border and padding',
      preview: (
        <div style={{ background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e5e5e5' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Card Title</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Card content goes here</div>
        </div>
      ),
      props: [
        { name: 'children', type: 'array' },
        { name: 'padding', type: 'number' },
      ],
      code: `{
  "type": "Card",
  "children": [
    { "type": "Text", "text": "Title" }
  ]
}`
    },
    {
      id: 'divider',
      category: 'layout',
      name: 'Divider',
      description: 'Horizontal/vertical divider',
      preview: (
        <div style={{ height: 1, background: '#e5e5e5', width: '100%' }}></div>
      ),
      props: [
        { name: 'orientation', type: '"horizontal"|"vertical"' },
      ],
      code: `{
  "type": "Divider",
  "orientation": "horizontal"
}`
    },
    {
      id: 'spacer',
      category: 'layout',
      name: 'Spacer',
      description: 'Add vertical/horizontal spacing',
      preview: (
        <div style={{ height: 20, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#9ca3af' }}>
          20px spacing
        </div>
      ),
      props: [
        { name: 'size', type: 'number' },
        { name: 'direction', type: '"vertical"|"horizontal"' },
      ],
      code: `{
  "type": "Spacer",
  "size": 20,
  "direction": "vertical"
}`
    },
    {
      id: 'grid-layout',
      category: 'layout',
      name: 'Grid',
      description: 'CSS Grid layout',
      preview: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ height: 30, background: '#f3f4f6', borderRadius: 4 }}></div>
          ))}
        </div>
      ),
      props: [
        { name: 'columns', type: 'number' },
        { name: 'gap', type: 'number' },
        { name: 'children', type: 'array' },
      ],
      code: `{
  "type": "Grid",
  "columns": 3,
  "gap": 16,
  "children": [...]
}`
    },
    
    // === FEEDBACK ===
    {
      id: 'progress-bar',
      category: 'feedback',
      name: 'Progress Bar',
      description: 'Horizontal progress indicator',
      preview: (
        <div style={{ width: '100%' }}>
          <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: '65%', height: '100%', background: '#10a37f' }}></div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 11, color: '#6b7280', marginTop: 4 }}>65%</div>
        </div>
      ),
      props: [
        { name: 'value', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'color', type: 'string' },
      ],
      code: `{
  "type": "Progress",
  "value": 65,
  "max": 100,
  "color": "#10a37f"
}`
    },
    {
      id: 'spinner',
      category: 'feedback',
      name: 'Spinner',
      description: 'Loading spinner',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ 
            width: 20, 
            height: 20, 
            border: '2px solid #e5e7eb',
            borderTopColor: '#10a37f',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ fontSize: 13 }}>Loading...</span>
        </div>
      ),
      props: [
        { name: 'size', type: 'number' },
        { name: 'label', type: 'string' },
      ],
      code: `{
  "type": "Spinner",
  "size": 24,
  "label": "Loading..."
}`
    },
    {
      id: 'alert-info',
      category: 'feedback',
      name: 'Alert',
      description: 'Alert/notification message',
      preview: (
        <div style={{ padding: 12, background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>ℹ️</span>
          <div style={{ fontSize: 13 }}>This is an info alert</div>
        </div>
      ),
      props: [
        { name: 'severity', type: '"info"|"success"|"warning"|"error"' },
        { name: 'title', type: 'string' },
        { name: 'message', type: 'string' },
      ],
      code: `{
  "type": "Alert",
  "severity": "info",
  "title": "Heads up!",
  "message": "This is important info"
}`
    },
    
    // === NAVIGATION ===
    {
      id: 'breadcrumb',
      category: 'navigation',
      name: 'Breadcrumb',
      description: 'Breadcrumb navigation',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <span style={{ color: '#6b7280' }}>Home</span>
          <span style={{ color: '#d1d5db' }}>/</span>
          <span style={{ color: '#6b7280' }}>Products</span>
          <span style={{ color: '#d1d5db' }}>/</span>
          <span style={{ color: '#202123', fontWeight: 500 }}>Details</span>
        </div>
      ),
      props: [
        { name: 'items', type: 'array' },
      ],
      code: `{
  "type": "Breadcrumb",
  "items": [
    { "label": "Home", "href": "/" },
    { "label": "Products", "href": "/products" },
    { "label": "Details" }
  ]
}`
    },
    {
      id: 'pagination',
      category: 'navigation',
      name: 'Pagination',
      description: 'Page navigation',
      preview: (
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={{ padding: '6px 12px', border: '1px solid #e5e5e5', background: 'white', borderRadius: 6, fontSize: 12 }}>←</button>
          {[1,2,3].map(i => (
            <button key={i} style={{ 
              padding: '6px 12px', 
              border: '1px solid #e5e5e5', 
              background: i === 1 ? '#10a37f' : 'white',
              color: i === 1 ? 'white' : 'inherit',
              borderRadius: 6, 
              fontSize: 12 
            }}>{i}</button>
          ))}
          <button style={{ padding: '6px 12px', border: '1px solid #e5e5e5', background: 'white', borderRadius: 6, fontSize: 12 }}>→</button>
        </div>
      ),
      props: [
        { name: 'page', type: 'number' },
        { name: 'totalPages', type: 'number' },
      ],
      code: `{
  "type": "Pagination",
  "page": 1,
  "totalPages": 10,
  "onPageChangeAction": {
    "type": "change_page",
    "data": {}
  }
}`
    },
  ]
}

export default ComponentsPage
