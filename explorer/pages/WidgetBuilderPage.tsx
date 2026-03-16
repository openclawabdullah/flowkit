/**
 * FlowKit Explorer - Widget Builder Page
 * 
 * Visual widget builder with 3-panel approach (like OpenAI):
 * - Component Tree: Drag & drop building blocks
 * - Schema Editor: Define structure and validation
 * - Preview: Live rendered output
 */

import React, { useState, useEffect } from 'react'

interface ComponentDef {
  id: string
  type: string
  props: Record<string, any>
  children?: ComponentDef[]
}

interface SchemaField {
  name: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  required: boolean
  description?: string
  default?: any
}

export function WidgetBuilderPage() {
  const [components, setComponents] = useState<ComponentDef[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [schemaFields, setSchemaFields] = useState<SchemaField[]>([
    { name: 'type', type: 'string', required: true, description: 'Widget type identifier' }
  ])
  const [widgetName, setWidgetName] = useState('MyWidget')
  const [exportedJSON, setExportedJSON] = useState('')
  
  const selectedComponent = components.find(c => c.id === selectedId)
  
  // Available building blocks
  const buildingBlocks = [
    { type: 'Text', icon: '📝', defaultProps: { text: 'Text', as: 'p', weight: 'normal' } },
    { type: 'Heading', icon: '📌', defaultProps: { text: 'Heading', level: 2 } },
    { type: 'Image', icon: '🖼️', defaultProps: { src: '', alt: '', width: 100 } },
    { type: 'Button', icon: '🔘', defaultProps: { label: 'Button', variant: 'primary' } },
    { type: 'Link', icon: '🔗', defaultProps: { text: 'Link', href: '#' } },
    { type: 'Input', icon: 'inbox', defaultProps: { type: 'text', placeholder: 'Enter...' } },
    { type: 'Badge', icon: '🏷️', defaultProps: { text: 'Badge', variant: 'info' } },
    { type: 'Icon', icon: '⭐', defaultProps: { name: 'Star', size: 24 } },
    { type: 'Divider', icon: '➖', defaultProps: { orientation: 'horizontal' } },
    { type: 'Spacer', icon: '⬜', defaultProps: { size: 16 } },
    { type: 'Card', icon: '🃏', defaultProps: { padding: 16, borderRadius: 8 } },
    { type: 'Container', icon: '📦', defaultProps: { background: '#fff', padding: 16 } },
    { type: 'Grid', icon: '🔲', defaultProps: { columns: 2, gap: 16 } },
    { type: 'Flex', icon: '↔️', defaultProps: { direction: 'row', gap: 8, align: 'center' } },
    { type: 'Price', icon: '💰', defaultProps: { value: 0, currency: 'USD' } },
    { type: 'Rating', icon: '⭐', defaultProps: { value: 4.5, max: 5 } },
    { type: 'Avatar', icon: '👤', defaultProps: { name: 'User', size: 'md' } },
    { type: 'Progress', icon: '📊', defaultProps: { value: 50, max: 100 } },
    { type: 'Alert', icon: '⚠️', defaultProps: { severity: 'info', message: 'Alert' } },
    { type: 'List', icon: '📋', defaultProps: { items: ['Item 1', 'Item 2'] } },
  ]
  
  const addComponent = (type: string) => {
    const block = buildingBlocks.find(b => b.type === type)
    if (!block) return
    
    const newComp: ComponentDef = {
      id: `${type}-${Date.now()}`,
      type,
      props: { ...block.defaultProps },
      children: type === 'Card' || type === 'Container' || type === 'Grid' || type === 'Flex' ? [] : undefined
    }
    
    setComponents([...components, newComp])
    setSelectedId(newComp.id)
    
    // Auto-add to schema
    addSchemaField(type.toLowerCase(), getSchemaTypeForComponent(type))
  }
  
  const getSchemaTypeForComponent = (type: string): SchemaField['type'] => {
    if (['Progress', 'Rating', 'Price'].includes(type)) return 'number'
    if (['List', 'Grid'].includes(type)) return 'array'
    if (['Card', 'Container'].includes(type)) return 'object'
    return 'string'
  }
  
  const addSchemaField = (name: string, type: SchemaField['type']) => {
    if (schemaFields.some(f => f.name === name)) return
    setSchemaFields([...schemaFields, { name, type, required: false, description: '' }])
  }
  
  const updateComponent = (id: string, props: Record<string, any>) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, props: { ...c.props, ...props } } : c
    ))
  }
  
  const deleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id))
    if (selectedId === id) setSelectedId(null)
  }
  
  const moveComponent = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = fromIndex + (direction === 'up' ? -1 : 1)
    if (toIndex < 0 || toIndex >= components.length) return
    
    const newComponents = [...components]
    ;[newComponents[fromIndex], newComponents[toIndex]] = [newComponents[toIndex], newComponents[fromIndex]]
    setComponents(newComponents)
  }
  
  const updateSchemaField = (index: number, updates: Partial<SchemaField>) => {
    const newFields = [...schemaFields]
    newFields[index] = { ...newFields[index], ...updates }
    setSchemaFields(newFields)
  }
  
  const removeSchemaField = (index: number) => {
    setSchemaFields(schemaFields.filter((_, i) => i !== index))
  }
  
  // Generate JSON from components
  const generateJSON = () => {
    const obj: Record<string, any> = { type: widgetName }
    
    components.forEach(comp => {
      const key = comp.type.toLowerCase()
      if (comp.type === 'Text' || comp.type === 'Heading') {
        obj[key] = comp.props.text
      } else if (comp.type === 'Image') {
        obj.image = comp.props.src || 'https://example.com/image.jpg'
      } else if (comp.type === 'Button') {
        obj.buttonText = comp.props.label
      } else if (comp.type === 'Price') {
        obj.price = comp.props.value
      } else if (comp.type === 'Rating') {
        obj.rating = comp.props.value
      } else if (comp.type === 'Badge') {
        obj.badge = comp.props.text
      } else if (comp.type === 'Progress') {
        obj.progress = comp.props.value
      } else {
        obj[key] = comp.props
      }
    })
    
    return JSON.stringify(obj, null, 2)
  }
  
  useEffect(() => {
    setExportedJSON(generateJSON())
  }, [components, widgetName])
  
  // Generate Zod schema
  const generateZod = () => {
    let zod = `import { z } from 'zod'\n\n`
    zod += `export const ${widgetName}Schema = z.object({\n`
    zod += `  type: z.literal('${widgetName}'),\n`
    
    schemaFields.filter(f => f.name !== 'type').forEach(field => {
      let typeStr = ''
      switch (field.type) {
        case 'string': typeStr = 'z.string()'; break
        case 'number': typeStr = 'z.number()'; break
        case 'boolean': typeStr = 'z.boolean()'; break
        case 'array': typeStr = 'z.array(z.any())'; break
        case 'object': typeStr = 'z.record(z.any())'; break
      }
      
      if (!field.required) {
        typeStr += '.optional()'
      }
      
      if (field.description) {
        typeStr += `.describe('${field.description}')`
      }
      
      zod += `  ${field.name}: ${typeStr},\n`
    })
    
    zod += `})\n\n`
    zod += `export type ${widgetName} = z.infer<typeof ${widgetName}Schema>`
    
    return zod
  }
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }
  
  return (
    <div className="page widget-builder-page">
      <div className="builder-header">
        <div>
          <h1 className="page-title">Widget Builder</h1>
          <p className="page-subtitle">Build custom widgets with visual components</p>
        </div>
        <div className="builder-actions">
          <input
            type="text"
            className="widget-name-input"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            placeholder="Widget Name"
          />
        </div>
      </div>
      
      <div className="builder-container">
        {/* Left Panel - Component Palette & Tree */}
        <div className="builder-panel builder-components-panel">
          <div className="panel-section">
            <h3>Add Components</h3>
            <div className="component-palette">
              {buildingBlocks.map(block => (
                <button
                  key={block.type}
                  className="palette-item"
                  onClick={() => addComponent(block.type)}
                >
                  <span className="palette-icon">{block.icon}</span>
                  <span className="palette-label">{block.type}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="panel-section">
            <h3>Component Tree ({components.length})</h3>
            <div className="component-tree">
              {components.length === 0 ? (
                <div className="tree-empty">
                  <p>No components yet</p>
                  <p className="hint">Click components above to add</p>
                </div>
              ) : (
                components.map((comp, index) => (
                  <div
                    key={comp.id}
                    className={`tree-item ${selectedId === comp.id ? 'selected' : ''}`}
                    onClick={() => setSelectedId(comp.id)}
                  >
                    <span className="tree-icon">
                      {buildingBlocks.find(b => b.type === comp.type)?.icon || '📦'}
                    </span>
                    <span className="tree-label">{comp.type}</span>
                    <div className="tree-actions">
                      <button onClick={(e) => { e.stopPropagation(); moveComponent(index, 'up') }} disabled={index === 0}>↑</button>
                      <button onClick={(e) => { e.stopPropagation(); moveComponent(index, 'down') }} disabled={index === components.length - 1}>↓</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteComponent(comp.id) }} className="delete">✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Middle Panel - Schema/Props Editor */}
        <div className="builder-panel builder-schema-panel">
          {selectedComponent ? (
            <div className="panel-section">
              <h3>{selectedComponent.type} Properties</h3>
              <div className="props-editor">
                {Object.entries(selectedComponent.props).map(([key, value]) => (
                  <div key={key} className="prop-field">
                    <label>{key}</label>
                    {typeof value === 'boolean' ? (
                      <select
                        value={value ? 'true' : 'false'}
                        onChange={(e) => updateComponent(selectedComponent.id, { [key]: e.target.value === 'true' })}
                      >
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : typeof value === 'number' ? (
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateComponent(selectedComponent.id, { [key]: parseFloat(e.target.value) })}
                      />
                    ) : typeof value === 'string' ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateComponent(selectedComponent.id, { [key]: e.target.value })}
                      />
                    ) : (
                      <input
                        type="text"
                        value={JSON.stringify(value)}
                        onChange={(e) => {
                          try {
                            updateComponent(selectedComponent.id, { [key]: JSON.parse(e.target.value) })
                          } catch {}
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="panel-section">
              <h3>Schema Definition</h3>
              <p className="section-hint">Select a component to edit its properties, or define schema fields below</p>
              
              <div className="schema-fields">
                {schemaFields.map((field, index) => (
                  <div key={index} className="schema-field">
                    <input
                      type="text"
                      placeholder="Field name"
                      value={field.name}
                      onChange={(e) => updateSchemaField(index, { name: e.target.value })}
                      className="field-name"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => updateSchemaField(index, { type: e.target.value as SchemaField['type'] })}
                      className="field-type"
                    >
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="boolean">boolean</option>
                      <option value="array">array</option>
                      <option value="object">object</option>
                    </select>
                    <label className="field-required">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateSchemaField(index, { required: e.target.checked })}
                      />
                      Required
                    </label>
                    <button onClick={() => removeSchemaField(index)} className="field-remove">✕</button>
                  </div>
                ))}
                
                <button
                  onClick={() => addSchemaField('newField', 'string')}
                  className="add-field-btn"
                >
                  + Add Field
                </button>
              </div>
            </div>
          )}
          
          {/* Zod Output */}
          <div className="panel-section zod-output">
            <div className="section-header">
              <h3>Zod Schema</h3>
              <button onClick={() => copyToClipboard(generateZod())} className="copy-btn">Copy</button>
            </div>
            <pre className="code-output">{generateZod()}</pre>
          </div>
        </div>
        
        {/* Right Panel - Preview & JSON */}
        <div className="builder-panel builder-output-panel">
          <div className="panel-section">
            <div className="section-header">
              <h3>JSON Output</h3>
              <button onClick={() => copyToClipboard(exportedJSON)} className="copy-btn">Copy</button>
            </div>
            <pre className="json-output">{exportedJSON}</pre>
          </div>
          
          <div className="panel-section">
            <h3>Preview</h3>
            <div className="preview-area">
              {components.length === 0 ? (
                <div className="preview-empty">
                  <p>Add components to see preview</p>
                </div>
              ) : (
                <div className="preview-content">
                  {components.map(comp => (
                    <PreviewComponent key={comp.id} component={comp} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Preview renderer for building blocks
function PreviewComponent({ component }: { component: ComponentDef }) {
  const { type, props } = component
  
  const baseStyle: React.CSSProperties = {
    margin: '8px 0'
  }
  
  switch (type) {
    case 'Text':
      return <p style={{ ...baseStyle, fontSize: 14, color: '#374151' }}>{props.text}</p>
    
    case 'Heading':
      const HeadingTag = `h${props.level || 2}` as keyof JSX.IntrinsicElements
      return <HeadingTag style={{ ...baseStyle, margin: '12px 0 8px', fontWeight: 700 }}>{props.text}</HeadingTag>
    
    case 'Image':
      return props.src ? (
        <img src={props.src} alt={props.alt} style={{ maxWidth: '100%', borderRadius: 8 }} />
      ) : (
        <div style={{ ...baseStyle, height: 100, background: '#f3f4f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>🖼️ Image</div>
      )
    
    case 'Button':
      return (
        <button style={{
          ...baseStyle,
          padding: '10px 20px',
          background: props.variant === 'primary' ? '#10a37f' : 'white',
          color: props.variant === 'primary' ? 'white' : '#374151',
          border: props.variant === 'primary' ? 'none' : '1px solid #e5e5e5',
          borderRadius: 8,
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          {props.label}
        </button>
      )
    
    case 'Link':
      return <a href={props.href} style={{ color: '#10a37f', textDecoration: 'underline' }}>{props.text}</a>
    
    case 'Badge':
      const badgeColors: Record<string, string> = {
        info: '#dbeafe',
        success: '#dcfce7',
        warning: '#fef3c7',
        error: '#fee2e2'
      }
      return (
        <span style={{
          display: 'inline-block',
          padding: '4px 10px',
          background: badgeColors[props.variant] || badgeColors.info,
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 600
        }}>
          {props.text}
        </span>
      )
    
    case 'Price':
      return (
        <div style={{ ...baseStyle, fontSize: 20, fontWeight: 700, color: '#10a37f' }}>
          ${props.value.toFixed(2)}
        </div>
      )
    
    case 'Rating':
      return (
        <div style={{ ...baseStyle, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#fbbf24' }}>{'★'.repeat(Math.round(props.value))}</span>
          <span style={{ fontWeight: 600 }}>{props.value}</span>
        </div>
      )
    
    case 'Progress':
      return (
        <div style={{ ...baseStyle }}>
          <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${props.value}%`, height: '100%', background: '#10a37f' }}></div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 11, color: '#6b7280', marginTop: 4 }}>{props.value}%</div>
        </div>
      )
    
    case 'Avatar':
      return (
        <div style={{ ...baseStyle, width: 40, height: 40, borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
          {props.name?.[0] || '?'}
        </div>
      )
    
    case 'Divider':
      return <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '16px 0' }} />
    
    case 'Spacer':
      return <div style={{ height: props.size }}></div>
    
    case 'Card':
      return (
        <div style={{ ...baseStyle, background: 'white', padding: props.padding, borderRadius: props.borderRadius, border: '1px solid #e5e5e5' }}>
          {component.children?.map(child => (
            <PreviewComponent key={child.id} component={child} />
          ))}
        </div>
      )
    
    case 'List':
      return (
        <ul style={{ ...baseStyle, paddingLeft: 20 }}>
          {props.items?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    
    case 'Alert':
      const alertColors: Record<string, string> = {
        info: '#dbeafe',
        success: '#dcfce7',
        warning: '#fef3c7',
        error: '#fee2e2'
      }
      return (
        <div style={{ ...baseStyle, padding: 12, background: alertColors[props.severity] || alertColors.info, borderRadius: 8 }}>
          {props.message}
        </div>
      )
    
    default:
      return <div style={{ ...baseStyle, color: '#9ca3af' }}>{type}</div>
  }
}

export default WidgetBuilderPage
