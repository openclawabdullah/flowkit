/**
 * FlowKit Explorer - Icons Page
 * 
 * Browse all available Lucide icons
 */

import React, { useState, useMemo } from 'react'
import * as AllIcons from 'lucide-react'

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  
  // Get only actual icon components - filter out utilities and types
  const iconNames = useMemo(() => {
    const excludeList = new Set([
      'default',
      'createLucideIcon', 
      'LucideIcon',
      'LucideProps',
      'Icon',
      'icons'
    ])
    
    return Object.keys(AllIcons)
      .filter(key => {
        // Skip excluded names
        if (excludeList.has(key)) return false
        
        // Icons start with uppercase letter
        if (!/^[A-Z]/.test(key)) return false
        
        // Must be a function
        const val = (AllIcons as any)[key]
        if (typeof val !== 'function') return false
        
        // Skip if it has $$typeof (React element, not component)
        if (val.$$typeof) return false
        
        return true
      })
      .sort()
  }, [])
  
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return iconNames
    const query = searchQuery.toLowerCase()
    return iconNames.filter(name => name.toLowerCase().includes(query))
  }, [iconNames, searchQuery])
  
  const copyToClipboard = (iconName: string) => {
    const usageCode = `import { ${iconName} } from 'lucide-react'\n\n<${iconName} size={24} />`
    navigator.clipboard.writeText(usageCode)
    setCopiedIcon(iconName)
    setTimeout(() => setCopiedIcon(null), 2000)
  }
  
  return (
    <div className="page icons-page">
      <div className="page-header">
        <h1 className="page-title">Icons</h1>
        <p className="page-subtitle">
          {iconNames.length} Lucide icons available
        </p>
      </div>
      
      <div className="icons-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>
      
      <div className="icons-grid">
        {filteredIcons.map(iconName => {
          const IconComponent = (AllIcons as any)[iconName]
          if (!IconComponent) return null
          
          return (
            <div 
              key={iconName}
              className="icon-card"
              onClick={() => copyToClipboard(iconName)}
              title={`${iconName} - Click to copy`}
            >
              <div className="icon-preview">
                <IconComponent size={20} />
              </div>
              <div className="icon-name">{iconName}</div>
              {copiedIcon === iconName && (
                <div className="icon-copied">✓</div>
              )}
            </div>
          )
        })}
      </div>
      
      {filteredIcons.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
          No icons found matching "{searchQuery}"
        </div>
      )}
      
      <div className="usage-example" style={{ marginTop: 32 }}>
        <h3>How to use icons</h3>
        <div className="code-block">
          <pre>{`// Import icon
import { Home, Star, Heart } from 'lucide-react'

// Use in React
<Home size={24} />
<Star size={20} color="#fbbf24" />
<Heart size={16} className="text-red-500" />

// In FlowKit widget JSON
{
  "type": "Button",
  "label": "Home",
  "iconStart": "Home",
  "iconPosition": "left"
}`}</pre>
        </div>
      </div>
    </div>
  )
}

export default IconsPage
