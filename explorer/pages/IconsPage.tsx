/**
 * FlowKit Explorer - Icons Page
 * 
 * Browse all available Lucide icons
 */

import React, { useState } from 'react'
import * as Icons from 'lucide-react'

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  
  // Filter only actual icon components (they start with uppercase and are functions)
  const iconNames = Object.keys(Icons).filter(key => {
    // Skip non-icon exports
    if (['default', 'icons', 'createLucideIcon', 'LucideIcon', 'LucideProps'].includes(key)) return false
    // Icons start with uppercase letter
    if (!/^[A-Z]/.test(key)) return false
    // Must be a function (component)
    return typeof (Icons as any)[key] === 'function'
  })
  
  const filteredIcons = iconNames.filter(name => {
    return name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  
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
          const IconComponent = (Icons as any)[iconName]
          
          return (
            <div 
              key={iconName}
              className="icon-card"
              onClick={() => copyToClipboard(iconName)}
            >
              <div className="icon-preview">
                <IconComponent size={24} />
              </div>
              <div className="icon-name">{iconName}</div>
              {copiedIcon === iconName && (
                <div className="icon-copied">✓</div>
              )}
            </div>
          )
        })}
      </div>
      
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
