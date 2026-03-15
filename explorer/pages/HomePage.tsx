/**
 * FlowKit Explorer - Home Page
 */

import React from 'react'
import { Link } from 'react-router-dom'

export function HomePage() {
  const features = [
    {
      icon: '🎨',
      title: 'Widget Gallery',
      description: 'Explore 70+ beautiful, production-ready widgets',
      link: '/gallery',
      color: '#10a37f',
    },
    {
      icon: '🧩',
      title: 'Components',
      description: 'Learn about all available components and APIs',
      link: '/components',
      color: '#6366f1',
    },
    {
      icon: '🔧',
      title: 'Widget Studio',
      description: 'Build, save, and manage custom widgets',
      link: '/studio',
      color: '#f59e0b',
    },
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Complete guide to FlowKit',
      link: '/docs',
      color: '#ec4899',
    },
  ]
  
  const stats = [
    { label: 'Widgets', value: '70+' },
    { label: 'Themes', value: '10' },
    { label: 'Integrations', value: '9' },
    { label: 'MIT License', value: '100% Free' },
  ]
  
  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🌊 Open Source</div>
          <h1 className="hero-title">
            FlowKit
            <span className="hero-subtitle">Beautiful Widget System for Chat Interfaces</span>
          </h1>
          <p className="hero-description">
            Like ChatKit, but yours. 70+ production-ready widgets, 10 themes, 
            complete integrations with OpenAI, Anthropic, LangChain, MCP, and more.
          </p>
          <div className="hero-actions">
            <Link to="/gallery" className="btn btn-primary">
              Explore Gallery →
            </Link>
            <Link to="/docs" className="btn btn-secondary">
              Read Docs
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-widget-preview">
            {/* Mini chat preview */}
            <div className="mini-chat">
              <div className="mini-message mini-user">Show me products</div>
              <div className="mini-message mini-assistant">
                <div className="mini-product-card">
                  <div className="mini-product-img"></div>
                  <div className="mini-product-title">Product Name</div>
                  <div className="mini-product-price">$99.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Explore FlowKit</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <Link key={i} to={feature.link} className="feature-card">
              <div 
                className="feature-icon"
                style={{ background: `${feature.color}15`, color: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <span className="feature-link">Explore →</span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Quick Start */}
      <section className="quickstart-section">
        <h2 className="section-title">Quick Start</h2>
        <div className="quickstart-content">
          <div className="code-block">
            <button className="copy-button">Copy</button>
            <pre>{`npm install flowkit`}</pre>
          </div>
          <div className="code-block">
            <button className="copy-button">Copy</button>
            <pre>{`import { TailwindChat, DemoAdapter } from 'flowkit'
import 'flowkit/styles/tailwind.css'

const adapter = new DemoAdapter()

function App() {
  return <TailwindChat adapter={adapter} />
}`}</pre>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="home-footer">
        <p>
          Made with 💚 by the open-source community
        </p>
        <a 
          href="https://github.com/openclawabdullah/flowkit" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub →
        </a>
      </footer>
    </div>
  )
}

export default HomePage
