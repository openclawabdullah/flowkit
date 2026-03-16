/**
 * FlowKit Explorer - Main App
 * 
 * Interactive website for exploring FlowKit:
 * - Gallery: Browse all widgets
 * - Icons: Browse all icons
 * - Components: Learn components with examples
 * - Studio: Build and save custom widgets
 * - Docs: Comprehensive documentation
 */

import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Grid3x3, 
  Smile, 
  Puzzle, 
  Wrench, 
  BookOpen, 
  Github,
  Hammer
} from 'lucide-react'

// Pages
import { GalleryPage } from './pages/GalleryPage'
import { IconsPage } from './pages/IconsPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { StudioPage } from './pages/StudioPage'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'
import { WidgetBuilderPage } from './pages/WidgetBuilderPage'

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
            <Route path="/icons" element={<IconsPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/builder" element={<WidgetBuilderPage />} />
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
    { path: '/', icon: 'Home', label: 'Home' },
    { path: '/gallery', icon: 'Grid3x3', label: 'Gallery' },
    { path: '/icons', icon: 'Smile', label: 'Icons' },
    { path: '/components', icon: 'Puzzle', label: 'Components' },
    { path: '/builder', icon: 'Hammer', label: 'Builder' },
    { path: '/studio', icon: 'Wrench', label: 'Studio' },
    { path: '/docs', icon: 'BookOpen', label: 'Documentation' },
  ]
  
  // Icon component mapper
  const getIcon = (name: string) => {
    const icons: Record<string, any> = {
      'Home': Home,
      'Grid3x3': Grid3x3,
      'Smile': Smile,
      'Puzzle': Puzzle,
      'Wrench': Wrench,
      'BookOpen': BookOpen,
      'Hammer': Hammer,
    }
    const Icon = icons[name]
    return Icon ? <Icon size={20} /> : null
  }
  
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
            <span className="nav-icon">{getIcon(item.icon)}</span>
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
          <Github size={16} />
          <span>GitHub</span>
        </a>
      </div>
    </aside>
  )
}

export default FlowKitExplorer
