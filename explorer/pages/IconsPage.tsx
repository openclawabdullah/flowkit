/**
 * FlowKit Explorer - Icons Page
 * 
 * Browse all available Lucide icons
 */

import React, { useState } from 'react'
import * as LucideIcons from 'lucide-react'

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  
  const allIcons = Object.keys(LucideIcons).filter(
    key => key !== 'default' && typeof (LucideIcons as any)[key] === 'function'
  )
  
  const categories = [
    { id: 'all', label: 'All Icons', count: allIcons.length },
    { id: 'popular', label: 'Popular', icons: ['Home', 'Star', 'Heart', 'Settings', 'User', 'Mail', 'Search', 'Plus', 'Check', 'X'] },
  { id: 'arrows', label: 'Arrows', icons: allIcons.filter(i => i.toLowerCase().includes('arrow')) },
    { id: 'media', label: 'Media', icons: allIcons.filter(i => /(play|pause|music|video|image|camera|mic)/i.test(i.toLowerCase())) },
  ]
  
  const filteredIcons = allIcons.filter(name => {
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
        <h1 className="page-title">🎨 Icons</h1>
        <p className="page-subtitle">
          {allIcons.length} Lucide icons available
        </p>
      </div>
      
      <div className="icons-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="icons-grid">
        {filteredIcons.map(iconName => {
          const IconComponent = (LucideIcons as any)[iconName]
          
          return (
            <div 
              key={iconName}
              className="icon-card"
              onClick={() => copyToClipboard(iconName)}
            >
              <div className="icon-preview">
                {IconComponent && <IconComponent size={24} />}
              </div>
              <div className="icon-name">{iconName}</div>
              {copiedIcon === iconName && (
                <div className="icon-copied">✓ Copied!</div>
              )}
            </div>
          )
        })}
      </div>
      
      <div className="usage-example">
        <h3>How to use icons in FlowKit</h3>
        <div className="code-block">
          <pre>{`// Import icon
import { Home, Star, Heart } from 'lucide-react'

// Use in widget
const widget = {
  type: 'Button',
  label: 'Home',
  icon: 'Home',
  iconPosition: 'left'
}

// WidgetRenderer will render:
<Button>
  <Home size={18} />
  Home
</Button>`}</pre>
        </div>
      </div>
    </div>
  )
}

export default IconsPage
