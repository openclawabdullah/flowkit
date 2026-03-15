/**
 * FlowKit Explorer - Widget Studio Page
 * 
 * Build, save, and manage custom widgets
 */

import React, { useState, useRef } from 'react'

interface SavedWidget {
  id: string
  name: string
  code: string
  createdAt: number
  updatedAt: number
}

export function StudioPage() {
  const [code, setCode] = useState(DEFAULT_WIDGET)
  const [savedWidgets, setSavedWidgets] = useState<SavedWidget[]>(() => loadWidgets())
  const [selectedWidget, setSelectedWidget] = useState<SavedWidget | null>(null)
  const [isRenaming, setIsRenaming] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [previewWidget, setPreviewWidget] = useState<any>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  
  // Parse widget from code
  const parseWidget = () => {
    setError(null)
    try {
      const parsed = JSON.parse(code)
      setPreviewWidget(parsed)
    } catch (e: any) {
      setError(`Parse error: ${e.message}`)
      setPreviewWidget(null)
    }
  }
  
  // Save widget
  const saveWidget = () => {
    if (!previewWidget) {
      setError('Please parse widget first')
      return
    }
    
    const newWidget: SavedWidget = {
      id: Date.now().toString(),
      name: previewWidget.type || 'Unnamed Widget',
      code,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    
    const updated = [...savedWidgets, newWidget]
    setSavedWidgets(updated)
    saveToStorage(updated)
    setSelectedWidget(newWidget)
  }
  
  // Update widget
  const updateWidget = (id: string) => {
    if (!previewWidget) return
    
    const updated = savedWidgets.map(w => 
      w.id === id 
        ? { ...w, code, updatedAt: Date.now() }
        : w
    )
    setSavedWidgets(updated)
    saveToStorage(updated)
  }
  
  // Delete widget
  const deleteWidget = (id: string) => {
    const updated = savedWidgets.filter(w => w.id !== id)
    setSavedWidgets(updated)
    saveToStorage(updated)
    if (selectedWidget?.id === id) {
      setSelectedWidget(null)
    }
  }
  
  // Rename widget
  const renameWidget = (id: string, newName: string) => {
    const updated = savedWidgets.map(w =>
      w.id === id
        ? { ...w, name: newName, updatedAt: Date.now() }
        : w
    )
    setSavedWidgets(updated)
    saveToStorage(updated)
    setIsRenaming(null)
  }
  
  // Load widget into editor
  const loadWidget = (widget: SavedWidget) => {
    setCode(widget.code)
    setSelectedWidget(widget)
    parseWidget()
  }
  
  // Download widget
  const downloadWidget = (widget: SavedWidget) => {
    const blob = new Blob([widget.code], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${widget.name}.widget`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  // Upload widget
  const uploadWidget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setCode(content)
      parseWidget()
    }
    reader.readAsText(file)
  }
  
  return (
    <div className="page studio-page">
      <div className="page-header">
        <h1 className="page-title">🔧 Widget Studio</h1>
        <p className="page-subtitle">
          Build, save, and manage custom widgets
        </p>
      </div>
      
      <div className="studio-container">
        {/* Saved Widgets Panel */}
        <aside className="studio-sidebar">
          <div className="sidebar-header">
            <h3>Saved Widgets</h3>
            <label className="upload-btn">
              📤 Upload
              <input type="file" accept=".widget,.json" onChange={uploadWidget} hidden />
            </label>
          </div>
          
          <div className="widget-list">
            {savedWidgets.length === 0 ? (
              <div className="empty-state">
                <p>No saved widgets yet</p>
                <p className="hint">Create your first widget!</p>
              </div>
            ) : (
              savedWidgets.map(widget => (
                <div 
                  key={widget.id}
                  className={`widget-item ${selectedWidget?.id === widget.id ? 'active' : ''}`}
                >
                  {isRenaming === widget.id ? (
                    <input
                      type="text"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onBlur={() => renameWidget(widget.id, renameValue || widget.name)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') renameWidget(widget.id, renameValue || widget.name)
                        if (e.key === 'Escape') setIsRenaming(null)
                      }}
                      autoFocus
                    />
                  ) : (
                    <>
                      <div 
                        className="widget-name"
                        onClick={() => loadWidget(widget)}
                      >
                        {widget.name}
                      </div>
                      <div className="widget-actions">
                        <button 
                          title="Rename"
                          onClick={() => {
                            setIsRenaming(widget.id)
                            setRenameValue(widget.name)
                          }}
                        >
                          ✏️
                        </button>
                        <button 
                          title="Download"
                          onClick={() => downloadWidget(widget)}
                        >
                          ⬇️
                        </button>
                        <button 
                          title="Delete"
                          className="delete"
                          onClick={() => deleteWidget(widget.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>
        
        {/* Editor & Preview */}
        <div className="studio-main">
          {/* Editor */}
          <div className="editor-panel">
            <div className="panel-header">
              <h3>Code Editor</h3>
              <div className="editor-actions">
                <button className="btn-secondary" onClick={parseWidget}>
                  ▶️ Preview
                </button>
                <button className="btn-primary" onClick={selectedWidget ? () => updateWidget(selectedWidget.id) : saveWidget}>
                  💾 {selectedWidget ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
            
            <div className="editor-wrapper">
              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="code-editor"
                spellCheck={false}
              />
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>
          
          {/* Preview */}
          <div className="preview-panel">
            <div className="panel-header">
              <h3>Preview</h3>
            </div>
            
            <div className="preview-area">
              {previewWidget ? (
                <div className="preview-content">
                  {/* Widget Preview */}
                  <div className="widget-preview-box">
                    <pre>{JSON.stringify(previewWidget, null, 2)}</pre>
                  </div>
                </div>
              ) : (
                <div className="preview-placeholder">
                  <div className="placeholder-icon">🎨</div>
                  <p>Widget preview will appear here</p>
                  <p className="hint">Click "Preview" to see your widget</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Storage helpers
function loadWidgets(): SavedWidget[] {
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

// Default widget template
const DEFAULT_WIDGET = `{
  "type": "ProductCard",
  "productId": "1",
  "title": "Premium Headphones",
  "subtitle": "Wireless Noise Cancelling",
  "price": 299.99,
  "originalPrice": 399.99,
  "image": "https://via.placeholder.com/400x300",
  "rating": 4.8,
  "reviews": 1247,
  "badge": "SALE",
  "inStock": true,
  "onAddToCartAction": {
    "type": "add_to_cart",
    "data": { "productId": "1" }
  }
}`

export default StudioPage
