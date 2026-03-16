/**
 * FlowKit Explorer - Studio Page
 * 
 * Interactive widget builder with code editor, live preview, and management
 */

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface SavedWidget {
  id: string
  name: string
  code: string
  createdAt: number
  updatedAt: number
}

export function StudioPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [savedWidgets, setSavedWidgets] = useState<SavedWidget[]>(() => loadFromStorage())
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [previewWidget, setPreviewWidget] = useState<any>(null)
  const [editingName, setEditingName] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  
  // Check if we got a widget from Gallery
  useEffect(() => {
    const widgetData = (location.state as any)?.widget
    if (widgetData) {
      const codeStr = JSON.stringify(widgetData, null, 2)
      const existing = savedWidgets.find(w => w.code === codeStr)
      if (existing) {
        setSelectedWidgetId(existing.id)
        setCode(existing.code)
        setPreviewWidget(widgetData)
      } else {
        const newWidget: SavedWidget = {
          id: Date.now().toString(),
          name: widgetData.type || 'Imported Widget',
          code: codeStr,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        const updated = [...savedWidgets, newWidget]
        setSavedWidgets(updated)
        saveToStorage(updated)
        setSelectedWidgetId(newWidget.id)
        setCode(newWidget.code)
        setPreviewWidget(widgetData)
      }
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state])
  
  const parseCode = () => {
    setError(null)
    if (!code.trim()) {
      setError('Please enter widget JSON')
      setPreviewWidget(null)
      return
    }
    try {
      const parsed = JSON.parse(code)
      setPreviewWidget(parsed)
    } catch (e: any) {
      setError(`Parse error: ${e.message}`)
      setPreviewWidget(null)
    }
  }
  
  const createNew = () => {
    const newWidget: SavedWidget = {
      id: Date.now().toString(),
      name: 'New Widget',
      code: '{\n  "type": "ProductCard",\n  "title": "Product Name",\n  "price": 99.99\n}',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const updated = [...savedWidgets, newWidget]
    setSavedWidgets(updated)
    saveToStorage(updated)
    setSelectedWidgetId(newWidget.id)
    setCode(newWidget.code)
    setPreviewWidget(null)
  }
  
  const saveWidget = () => {
    if (!selectedWidgetId) {
      const newWidget: SavedWidget = {
        id: Date.now().toString(),
        name: previewWidget?.type || 'Widget',
        code,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      const updated = [...savedWidgets, newWidget]
      setSavedWidgets(updated)
      saveToStorage(updated)
      setSelectedWidgetId(newWidget.id)
    } else {
      const updated = savedWidgets.map(w =>
        w.id === selectedWidgetId
          ? { ...w, code, updatedAt: Date.now() }
          : w
      )
      setSavedWidgets(updated)
      saveToStorage(updated)
    }
  }
  
  const loadWidget = (widget: SavedWidget) => {
    setSelectedWidgetId(widget.id)
    setCode(widget.code)
    parseCode()
  }
  
  const deleteWidget = (id: string) => {
    const updated = savedWidgets.filter(w => w.id !== id)
    setSavedWidgets(updated)
    saveToStorage(updated)
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null)
      setCode('')
      setPreviewWidget(null)
    }
  }
  
  const startRename = (widget: SavedWidget) => {
    setEditingName(widget.id)
    setEditName(widget.name)
  }
  
  const finishRename = (id: string) => {
    if (!editName.trim()) return
    const updated = savedWidgets.map(w =>
      w.id === id
        ? { ...w, name: editName.trim(), updatedAt: Date.now() }
        : w
    )
    setSavedWidgets(updated)
    saveToStorage(updated)
    setEditingName(null)
  }
  
  const downloadWidget = (widget: SavedWidget) => {
    const blob = new Blob([widget.code], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${widget.name.replace(/[^a-z0-9]/gi, '_')}.widget`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  const uploadWidget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      try {
        const parsed = JSON.parse(content)
        const newWidget: SavedWidget = {
          id: Date.now().toString(),
          name: parsed.type || file.name.replace('.widget', ''),
          code: content,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        const updated = [...savedWidgets, newWidget]
        setSavedWidgets(updated)
        saveToStorage(updated)
        setSelectedWidgetId(newWidget.id)
        setCode(content)
        setPreviewWidget(parsed)
      } catch {
        setError('Invalid widget file')
      }
    }
    reader.readAsText(file)
  }
  
  return (
    <div className="page studio-page">
      <div className="studio-container">
        {/* Left Panel - Widget List */}
        <div className="studio-sidebar">
          <div className="studio-sidebar-header">
            <h3>Studio</h3>
            <div className="studio-sidebar-actions">
              <button onClick={createNew} className="btn-icon" title="New Widget">+</button>
              <label className="btn-icon" title="Upload Widget">
                ↑
                <input type="file" accept=".widget,.json" onChange={uploadWidget} hidden />
              </label>
            </div>
          </div>
          
          <div className="studio-widget-list">
            {savedWidgets.length === 0 ? (
              <div className="studio-empty">
                <p>No widgets yet</p>
                <p>Click + to create one</p>
              </div>
            ) : (
              savedWidgets.map(widget => (
                <div 
                  key={widget.id}
                  className={`studio-widget-item ${selectedWidgetId === widget.id ? 'active' : ''}`}
                >
                  {editingName === widget.id ? (
                    <input
                      type="text"
                      className="studio-rename-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => finishRename(widget.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') finishRename(widget.id)
                        if (e.key === 'Escape') setEditingName(null)
                      }}
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className="studio-widget-name" onClick={() => loadWidget(widget)}>
                        {widget.name}
                      </div>
                      <div className="studio-widget-actions">
                        <button onClick={(e) => { e.stopPropagation(); startRename(widget) }} title="Rename">✏️</button>
                        <button onClick={(e) => { e.stopPropagation(); downloadWidget(widget) }} title="Download">⬇️</button>
                        <button onClick={(e) => { e.stopPropagation(); deleteWidget(widget.id) }} title="Delete" className="delete">🗑️</button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Middle Panel - Code Editor */}
        <div className="studio-editor">
          <div className="studio-panel-header">
            <h3>JSON Editor</h3>
            <div className="studio-panel-actions">
              <button className="btn-secondary btn-sm" onClick={parseCode}>▶ Preview</button>
              <button className="btn-primary btn-sm" onClick={saveWidget}>💾 Save</button>
            </div>
          </div>
          
          <textarea
            className="studio-code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='{\n  "type": "ProductCard",\n  "title": "...",\n  "price": 99.99\n}'
            spellCheck={false}
          />
          
          {error && <div className="studio-error">{error}</div>}
        </div>
        
        {/* Right Panel - Preview */}
        <div className="studio-preview">
          <div className="studio-panel-header">
            <h3>Preview</h3>
            {previewWidget && <span className="studio-widget-type">{previewWidget.type}</span>}
          </div>
          
          <div className="studio-preview-content">
            {previewWidget ? (
              <WidgetPreview widget={previewWidget} />
            ) : (
              <div className="studio-preview-empty">
                <div className="studio-preview-icon">🎨</div>
                <p>No preview yet</p>
                <p className="hint">Edit JSON and click Preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Widget Preview Component - Renders ALL widget types
function WidgetPreview({ widget }: { widget: any }) {
  if (!widget || !widget.type) return <div style={{ padding: 20, color: '#ef4444' }}>Invalid widget</div>
  
  const type = widget.type
  
  // ProductCard
  if (type === 'ProductCard') {
    return (
      <div style={{ maxWidth: 280, background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e5e5', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        {widget.image && <img src={widget.image} alt={widget.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />}
        <div style={{ padding: 16 }}>
          {widget.badge && <span style={{ display: 'inline-block', padding: '4px 8px', background: widget.badgeColor || '#ef4444', color: 'white', fontSize: 11, fontWeight: 600, borderRadius: 4, marginBottom: 8 }}>{widget.badge}</span>}
          <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 600 }}>{widget.title || 'Product'}</h3>
          {widget.subtitle && <p style={{ margin: '0 0 8px 0', fontSize: 13, color: '#6b7280' }}>{widget.subtitle}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            {widget.originalPrice && <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: 14 }}>${widget.originalPrice}</span>}
            <span style={{ fontSize: 20, fontWeight: 700, color: '#10a37f' }}>${widget.price}</span>
          </div>
          {widget.rating && <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}><span style={{ color: '#fbbf24' }}>★</span><span style={{ fontWeight: 600, fontSize: 14 }}>{widget.rating}</span>{widget.reviews && <span style={{ color: '#9ca3af', fontSize: 12 }}>({widget.reviews})</span>}</div>}
          <button style={{ width: '100%', padding: 10, background: '#10a37f', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Add to Cart</button>
        </div>
      </div>
    )
  }
  
  // ProductGrid
  if (type === 'ProductGrid') {
    const products = widget.products || []
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, maxWidth: 320 }}>
        {products.slice(0, 4).map((p: any, i: number) => (
          <div key={i} style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
            {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: 80, objectFit: 'cover' }} />}
            <div style={{ padding: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#10a37f' }}>${p.price}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Login
  if (type === 'Login') {
    return (
      <div style={{ maxWidth: 280, background: 'white', padding: 24, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <h2 style={{ margin: '0 0 4px 0', textAlign: 'center', fontSize: 20 }}>{widget.title || 'Sign In'}</h2>
        <p style={{ margin: '0 0 20px 0', textAlign: 'center', color: '#6b7280', fontSize: 14 }}>{widget.subtitle || 'Welcome back'}</p>
        <input type="email" placeholder={widget.emailPlaceholder || 'Email'} style={{ width: '100%', padding: 10, marginBottom: 12, border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 14 }} />
        <input type="password" placeholder={widget.passwordPlaceholder || 'Password'} style={{ width: '100%', padding: 10, marginBottom: 16, border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 14 }} />
        <button style={{ width: '100%', padding: 10, background: '#10a37f', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{widget.submitButtonText || 'Sign In'}</button>
      </div>
    )
  }
  
  // Register
  if (type === 'Register') {
    return (
      <div style={{ maxWidth: 280, background: 'white', padding: 24, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <h2 style={{ margin: '0 0 4px 0', textAlign: 'center', fontSize: 20 }}>{widget.title || 'Create Account'}</h2>
        <p style={{ margin: '0 0 20px 0', textAlign: 'center', color: '#6b7280', fontSize: 14 }}>{widget.subtitle || 'Get started'}</p>
        <input type="text" placeholder="Full Name" style={{ width: '100%', padding: 10, marginBottom: 10, border: '1px solid #e5e5e5', borderRadius: 6, fontSize: 13 }} />
        <input type="email" placeholder="Email" style={{ width: '100%', padding: 10, marginBottom: 10, border: '1px solid #e5e5e5', borderRadius: 6, fontSize: 13 }} />
        <input type="password" placeholder="Password" style={{ width: '100%', padding: 10, marginBottom: 16, border: '1px solid #e5e5e5', borderRadius: 6, fontSize: 13 }} />
        <button style={{ width: '100%', padding: 10, background: '#10a37f', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>{widget.submitButtonText || 'Create Account'}</button>
      </div>
    )
  }
  
  // FAQ
  if (type === 'FAQ') {
    const items = widget.items || []
    return (
      <div style={{ maxWidth: 320, background: 'white', borderRadius: 12, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e5e5', fontWeight: 600, fontSize: 14 }}>{widget.title || 'FAQ'}</div>
        <div style={{ padding: 8 }}>
          {items.slice(0, 3).map((item: any, i: number) => (
            <div key={i} style={{ padding: 10, background: '#f7f7f8', borderRadius: 6, marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 4 }}>▼ {item.question}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // ColorSwatches
  if (type === 'ColorSwatches') {
    const colors = widget.colors || []
    return (
      <div style={{ maxWidth: 240, background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>{widget.label || 'Color'}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {colors.map((c: any, i: number) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 32, height: 32, background: c.hex, borderRadius: '50%', border: i === 0 ? '3px solid #10a37f' : '2px solid #e5e5e5', marginBottom: 4 }}></div>
              <div style={{ fontSize: 9, color: '#6b7280' }}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // SizeSelector
  if (type === 'SizeSelector') {
    const sizes = widget.sizes || []
    return (
      <div style={{ maxWidth: 280, background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>{widget.label || 'Size'}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {sizes.map((s: any, i: number) => (
            <button key={i} style={{ padding: '8px 14px', border: i === 2 ? '2px solid #10a37f' : '1px solid #e5e5e5', background: i === 2 ? '#ecfdf5' : 'white', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {s.label || s.value}
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  // OrderSummary
  if (type === 'OrderSummary') {
    const items = widget.items || []
    return (
      <div style={{ maxWidth: 280, background: 'white', borderRadius: 12, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #e5e5e5', fontWeight: 600, fontSize: 12 }}>🛒 Cart ({items.length})</div>
        <div style={{ padding: 8 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ width: 32, height: 32, background: '#f3f4f6', borderRadius: 4 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 500 }}>{item.title}</div>
                <div style={{ fontSize: 9, color: '#6b7280' }}>Qty: {item.quantity}</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600 }}>${item.price}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 12px', background: '#f7f7f8', borderTop: '1px solid #e5e5e5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}><span>Subtotal:</span><span>${widget.subtotal || 0}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 600, marginTop: 4 }}><span>Total:</span><span style={{ color: '#10a37f' }}>${widget.total || 0}</span></div>
        </div>
      </div>
    )
  }
  
  // Confirmation
  if (type === 'Confirmation') {
    return (
      <div style={{ maxWidth: 280, background: 'white', padding: 32, borderRadius: 12, border: '1px solid #e5e5e5', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✓</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: 18 }}>{widget.title || 'Success!'}</h3>
        <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>{widget.message || 'Your changes have been saved.'}</p>
      </div>
    )
  }
  
  // Alert
  if (type === 'Alert') {
    const colors: any = { info: '#dbeafe', success: '#dcfce7', warning: '#fef3c7', error: '#fee2e2' }
    const icons: any = { info: 'ℹ️', success: '✓', warning: '⚠️', error: '✕' }
    return (
      <div style={{ maxWidth: 280, background: colors[widget.severity] || colors.info, border: '1px solid #93c5fd', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{icons[widget.severity] || icons.info}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{widget.title}</div>
          <div style={{ fontSize: 12, color: '#374151' }}>{widget.message}</div>
        </div>
      </div>
    )
  }
  
  // Progress
  if (type === 'Progress') {
    return (
      <div style={{ maxWidth: 240, background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600 }}>{widget.label || 'Progress'}</div>
        <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${widget.value || 0}%`, height: '100%', background: widget.color || '#10a37f' }}></div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, color: '#6b7280', marginTop: 4 }}>{widget.value || 0}%</div>
      </div>
    )
  }
  
  // ContactForm
  if (type === 'ContactForm') {
    return (
      <div style={{ maxWidth: 280, background: 'white', padding: 24, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 18 }}>{widget.title || 'Contact Us'}</h3>
        <input type="text" placeholder="Name" style={{ width: '100%', padding: 10, marginBottom: 10, border: '1px solid #e5e5e5', borderRadius: 6, fontSize: 13 }} />
        <input type="email" placeholder="Email" style={{ width: '100%', padding: 10, marginBottom: 10, border: '1px solid #e5e5e5', borderRadius: 6, fontSize: 13 }} />
        <textarea placeholder="Message" rows={3} style={{ width: '100%', padding: 10, marginBottom: 12, border: '1px solid #e5e5e5', borderRadius: 6, fontSize: 13, resize: 'none' }}></textarea>
        <button style={{ width: '100%', padding: 10, background: '#10a37f', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Send Message</button>
      </div>
    )
  }
  
  // Timeline
  if (type === 'Timeline') {
    const items = widget.items || []
    return (
      <div style={{ maxWidth: 240, background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        {items.map((item: any, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < items.length - 1 ? 16 : 0 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.status === 'completed' ? '#10a37f' : '#e5e7eb', marginTop: 4 }}></div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Stats
  if (type === 'Stats') {
    return (
      <div style={{ maxWidth: 180, background: 'white', padding: 16, borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>{widget.title || 'Stats'}</div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{widget.value}</div>
        {widget.change && <div style={{ fontSize: 12, color: widget.changeType === 'increase' ? '#10a37f' : '#ef4444' }}>{widget.changeType === 'increase' ? '↑' : '↓'} {widget.change}</div>}
      </div>
    )
  }
  
  // Default: show formatted JSON
  return (
    <div style={{ background: '#1e1e1e', color: '#d4d4d4', padding: 16, borderRadius: 8, fontFamily: 'Monaco, Menlo, monospace', fontSize: 12, maxHeight: 400, overflow: 'auto', maxWidth: '100%' }}>
      <div style={{ marginBottom: 8, color: '#9ca3af', fontSize: 11 }}>No preview for type: {type}</div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(widget, null, 2)}</pre>
    </div>
  )
}

// Storage helpers
function loadFromStorage(): SavedWidget[] {
  try {
    const stored = localStorage.getItem('flowkit-studio-widgets')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveToStorage(widgets: SavedWidget[]) {
  localStorage.setItem('flowkit-studio-widgets', JSON.stringify(widgets))
}

export default StudioPage
