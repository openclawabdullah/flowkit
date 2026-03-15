/**
 * FlowKit Explorer - Main App
 * 
 * Interactive website for exploring FlowKit:
 * - Gallery: Browse all widgets
 * - Components: Learn components with examples
 * - Studio: Build and save custom widgets
 * - Docs: Comprehensive documentation
 */

import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

// Pages
import { GalleryPage } from './pages/GalleryPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { StudioPage } from './pages/StudioPage'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'

// Styles
import './styles/explorer.css'

export function FlowKitExplorer() {
  return (
      <div className="explorer">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="explorer-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/docs/*" element={<DocsPage />} />
          </Routes>
        </main>
      </div>
  )
}

function Sidebar() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/gallery', icon: '🎨', label: 'Gallery' },
    { path: '/components', icon: '🧩', label: 'Components' },
    { path: '/studio', icon: '🔧', label: 'Widget Studio' },
    { path: '/docs', icon: '📚', label: 'Documentation' },
  ]
  
  return (
    <aside className="explorer-sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          <span className="sidebar-logo">🌊</span>
          FlowKit
        </h1>
        <span className="sidebar-version">v1.0.0</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <a 
          href="https://github.com/openclawabdullah/flowkit" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <span>📦</span> GitHub
        </a>
      </div>
    </aside>
  )
}

export default FlowKitExplorer
