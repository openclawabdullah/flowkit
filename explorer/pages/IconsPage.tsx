/**
 * FlowKit Explorer - Icons Page
 * 
 * Browse all available Lucide icons
 */

import React, { useState } from 'react'
import * as AllIcons from 'lucide-react'

// Type for forwardRef component
type ForwardRefComponent = {
  $$typeof: symbol | number
  render: (...args: any[]) => any
}

export function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const iconsPerPage = 96
  
  // Known non-icon exports to exclude
  const excludeList = [
    'createLucideIcon',
    'LucideIcon', 
    'LucideProps',
    'Icon',
    'icons',
    'default'
  ]
  
  // Get all icon names
  const iconNames: string[] = []
  
  for (const key of Object.keys(AllIcons)) {
    // Skip excluded names
    if (excludeList.includes(key)) continue
    
    // Icons start with uppercase letter
    if (!/^[A-Z]/.test(key)) continue
    
    const val = (AllIcons as any)[key]
    
    // Icons are React.forwardRef objects with $$typeof and render
    if (val && typeof val === 'object' && val.$$typeof && typeof val.render === 'function') {
      iconNames.push(key)
    }
  }
  
  console.log('Total icons found:', iconNames.length)
  
  // Sort alphabetically
  iconNames.sort()
  
  const filteredIcons = searchQuery 
    ? iconNames.filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
    : iconNames
  
  // Pagination
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage)
  const startIndex = (currentPage - 1) * iconsPerPage
  const endIndex = startIndex + iconsPerPage
  const paginatedIcons = filteredIcons.slice(startIndex, endIndex)
  
  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])
  
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
        {paginatedIcons.map(iconName => {
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
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
            <span className="pagination-total">
              ({filteredIcons.length} icons)
            </span>
          </div>
          
          <div className="pagination-pages">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  className={`pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
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
