/**
 * FlowKit Explorer - Icons Page
 * 
 * Browse all available Lucide icons
 */

import React, { useState } from 'react'
import * as AllIcons from 'lucide-react'

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  
  // Known non-icon exports to exclude
  const excludeList = [
    'createLucideIcon',
    'LucideIcon', 
    'LucideProps',
    'Icon',
    'icons',
    'default'
  ]
  
  // Get all icon names - simple approach
  const iconNames: string[] = []
  
  // Debug: log all keys
  console.log('Total keys from lucide-react:', Object.keys(AllIcons).length)
  console.log('First 10 keys:', Object.keys(AllIcons).slice(0, 10))
  
  for (const key of Object.keys(AllIcons)) {
    // Skip excluded names
    if (excludeList.includes(key)) continue
    
    // Icons start with uppercase letter
    if (!/^[A-Z]/.test(key)) continue
    
    // Must be a function (component)
    const val = (AllIcons as any)[key]
    
    // Debug first few
    if (iconNames.length < 3) {
      console.log(`Checking ${key}:`, {
        type: typeof val,
        isFunction: typeof val === 'function',
        val: val
      })
    }
    
    if (typeof val !== 'function') continue
    
    iconNames.push(key)
  }
  
  console.log('Filtered icon names:', iconNames.length)
  console.log('First 10 icons:', iconNames.slice(0, 10))
  
  // Sort alphabetically
  iconNames.sort()
  
  const filteredIcons = searchQuery 
    ? iconNames.filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
    : iconNames
  
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
        {filteredIcons.slice(0, 200).map(iconName => {
          const IconComponent = (AllIcons as any)[iconName]
          if (!IconComponent) return null
          
          return (
            <div 
              key={iconName}
              className="icon-card"
              onClick={() => copyToClipboard(iconName)}
              title={iconName}
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
      
      {filteredIcons.length > 200 && (
        <div style={{ textAlign: 'center', padding: 20, color: '#6b7280', fontSize: 14 }}>
          Showing first 200 of {filteredIcons.length} icons. Use search to find specific icons.
        </div>
      )}
      
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
