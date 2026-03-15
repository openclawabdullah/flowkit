/**
 * FlowKit Explorer - Gallery Page
 * 
 * Visual gallery of all 70+ widgets with live previews
 */

import React, { useState } from 'react'

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWidget, setSelectedWidget] = useState<any>(null)
  
  const categories = [
    { id: 'all', label: 'All Widgets', icon: '🎨' },
    { id: 'ecommerce', label: 'E-Commerce', icon: '🛒' },
    { id: 'auth', label: 'Auth', icon: '🔐' },
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'feedback', label: 'Feedback', icon: '✅' },
    { id: 'support', label: 'Support', icon: '💬' },
    { id: 'advanced', label: 'Advanced', icon: '🚀' },
  ]
  
  const widgets = getAllWidgets()
  
  const filteredWidgets = widgets.filter(w => {
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory
    const matchesSearch = !searchQuery || 
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  return (
    <div className="page gallery-page">
      <div className="page-header">
        <h1 className="page-title">🎨 Widget Gallery</h1>
        <p className="page-subtitle">
          Explore {widgets.length} beautiful, production-ready widgets
        </p>
      </div>
      
      {/* Search & Filter */}
      <div className="gallery-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Widgets Grid */}
      <div className="widgets-grid">
        {filteredWidgets.map((widget, i) => (
          <div 
            key={i}
            className="widget-showcase-card"
            onClick={() => setSelectedWidget(widget)}
          >
            <div className="widget-preview">
              {widget.preview}
            </div>
            <div className="widget-info">
              <h3 className="widget-name">{widget.name}</h3>
              <p className="widget-description">{widget.description}</p>
              <div className="widget-tags">
                <span className="tag">{widget.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Widget Modal */}
      {selectedWidget && (
        <WidgetModal 
          widget={selectedWidget}
          onClose={() => setSelectedWidget(null)}
        />
      )}
    </div>
  )
}

function WidgetModal({ widget, onClose }: { widget: any; onClose: () => void }) {
  return (
    <div className="widget-modal-overlay" onClick={onClose}>
      <div className="widget-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{widget.name}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-preview">
          {widget.fullPreview || widget.preview}
        </div>
        
        <div className="modal-code">
          <h3>JSON Schema</h3>
          <div className="code-block">
            <pre>{JSON.stringify(widget.schema, null, 2)}</pre>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="btn btn-primary">
            Copy JSON
          </button>
          <button className="btn btn-secondary">
            Open in Studio
          </button>
        </div>
      </div>
    </div>
  )
}

function getAllWidgets() {
  return [
    // E-Commerce
    {
      name: 'ProductCard',
      category: 'ecommerce',
      description: 'Display product with image, price, rating, and add to cart',
      preview: <ProductCardPreview />,
      schema: {
        type: 'ProductCard',
        productId: '1',
        title: 'Product Name',
        price: 99.99,
        image: 'https://...'
      }
    },
    {
      name: 'ProductGrid',
      category: 'ecommerce',
      description: 'Grid layout for multiple products',
      preview: <ProductGridPreview />,
      schema: { type: 'ProductGrid', columns: 2, products: [] }
    },
    {
      name: 'OrderSummary',
      category: 'ecommerce',
      description: 'Shopping cart with items and totals',
      preview: <OrderSummaryPreview />,
      schema: { type: 'OrderSummary', items: [], subtotal: 0, total: 0 }
    },
    {
      name: 'OrderTracking',
      category: 'ecommerce',
      description: 'Track order status with timeline',
      preview: <OrderTrackingPreview />,
      schema: { type: 'OrderTracking', orderId: '', status: 'shipped', timeline: [] }
    },
    {
      name: 'QuantitySelector',
      category: 'ecommerce',
      description: '+/- buttons for quantity',
      preview: <QuantityPreview />,
      schema: { type: 'QuantitySelector', name: 'qty', value: 1 }
    },
    {
      name: 'StockIndicator',
      category: 'ecommerce',
      description: 'Show stock availability',
      preview: <StockPreview />,
      schema: { type: 'StockIndicator', stock: 5 }
    },
    {
      name: 'ColorSwatches',
      category: 'ecommerce',
      description: 'Product color selection',
      preview: <ColorSwatchesPreview />,
      schema: { type: 'ColorSwatches', colors: [] }
    },
    {
      name: 'SizeSelector',
      category: 'ecommerce',
      description: 'Product size selection',
      preview: <SizeSelectorPreview />,
      schema: { type: 'SizeSelector', sizes: [] }
    },
    {
      name: 'CouponInput',
      category: 'ecommerce',
      description: 'Promo code input',
      preview: <CouponPreview />,
      schema: { type: 'CouponInput' }
    },
    {
      name: 'DeliveryEstimate',
      category: 'ecommerce',
      description: 'Estimated delivery dates',
      preview: <DeliveryPreview />,
      schema: { type: 'DeliveryEstimate', minDays: 3, maxDays: 5 }
    },
    
    // Auth
    {
      name: 'Login',
      category: 'auth',
      description: 'Login form with email/password',
      preview: <LoginPreview />,
      schema: { type: 'Login', fields: [] }
    },
    {
      name: 'Register',
      category: 'auth',
      description: 'Registration form',
      preview: <RegisterPreview />,
      schema: { type: 'Register', fields: [] }
    },
    {
      name: 'VerifyOTP',
      category: 'auth',
      description: 'OTP verification code input',
      preview: <OTPPreview />,
      schema: { type: 'VerifyOTP', length: 6 }
    },
    {
      name: 'ContactForm',
      category: 'auth',
      description: 'Contact/support form',
      preview: <ContactPreview />,
      schema: { type: 'ContactForm', fields: [] }
    },
    
    // Layout
    {
      name: 'Card',
      category: 'layout',
      description: 'Container with padding and border',
      preview: <CardPreview />,
      schema: { type: 'Card', children: [] }
    },
    {
      name: 'Row',
      category: 'layout',
      description: 'Horizontal layout',
      preview: <RowPreview />,
      schema: { type: 'Row', children: [] }
    },
    {
      name: 'Col',
      category: 'layout',
      description: 'Vertical layout',
      preview: <ColPreview />,
      schema: { type: 'Col', children: [] }
    },
    {
      name: 'Grid',
      category: 'layout',
      description: 'CSS Grid layout',
      preview: <GridPreview />,
      schema: { type: 'Grid', columns: 3 }
    },
    {
      name: 'Box',
      category: 'layout',
      description: 'Flexible container',
      preview: <BoxPreview />,
      schema: { type: 'Box' }
    },
    
    // Feedback
    {
      name: 'Confirmation',
      category: 'feedback',
      description: 'Success confirmation message',
      preview: <ConfirmationPreview />,
      schema: { type: 'Confirmation', icon: 'success', title: 'Success!' }
    },
    {
      name: 'Alert',
      category: 'feedback',
      description: 'Alert message with icon',
      preview: <AlertPreview />,
      schema: { type: 'Alert', severity: 'info', message: '' }
    },
    {
      name: 'Progress',
      category: 'feedback',
      description: 'Progress bar',
      preview: <ProgressPreview />,
      schema: { type: 'Progress', value: 75 }
    },
    {
      name: 'CircularProgress',
      category: 'feedback',
      description: 'Circular progress indicator',
      preview: <CircularProgressPreview />,
      schema: { type: 'CircularProgress', value: 75 }
    },
    {
      name: 'Spinner',
      category: 'feedback',
      description: 'Loading spinner',
      preview: <SpinnerPreview />,
      schema: { type: 'Spinner' }
    },
    {
      name: 'NotificationBadge',
      category: 'feedback',
      description: 'Badge with count',
      preview: <NotificationBadgePreview />,
      schema: { type: 'NotificationBadge', count: 5 }
    },
    
    // Support
    {
      name: 'FAQ',
      category: 'support',
      description: 'FAQ accordion',
      preview: <FAQPreview />,
      schema: { type: 'FAQ', items: [] }
    },
    {
      name: 'Timeline',
      category: 'support',
      description: 'Vertical timeline',
      preview: <TimelinePreview />,
      schema: { type: 'Timeline', items: [] }
    },
    {
      name: 'Stats',
      category: 'support',
      description: 'Statistics display',
      preview: <StatsPreview />,
      schema: { type: 'Stats', title: 'Revenue', value: '$12,345' }
    },
    
    // Advanced
    {
      name: 'Chart',
      category: 'advanced',
      description: 'Charts (bar, line, pie, donut)',
      preview: <ChartPreview />,
      schema: { type: 'Chart', chartType: 'bar', data: {} }
    },
    {
      name: 'Map',
      category: 'advanced',
      description: 'Interactive map',
      preview: <MapPreview />,
      schema: { type: 'Map', markers: [] }
    },
    {
      name: 'Calendar',
      category: 'advanced',
      description: 'Calendar with events',
      preview: <CalendarPreview />,
      schema: { type: 'Calendar', events: [] }
    },
    {
      name: 'Kanban',
      category: 'advanced',
      description: 'Kanban board',
      preview: <KanbanPreview />,
      schema: { type: 'Kanban', columns: [] }
    },
    {
      name: 'SignaturePad',
      category: 'advanced',
      description: 'Signature capture',
      preview: <SignaturePreview />,
      schema: { type: 'SignaturePad', name: 'signature' }
    },
    {
      name: 'QRCode',
      category: 'advanced',
      description: 'QR code generator',
      preview: <QRCodePreview />,
      schema: { type: 'QRCode', value: 'https://...' }
    },
  ]
}

// Preview Components (simplified for visual display)
function ProductCardPreview() {
  return (
    <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
      <div style={{ height: 80, background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        📦
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Product Name</div>
        <div style={{ color: '#10a37f', fontWeight: 700 }}>$99.99</div>
      </div>
    </div>
  )
}

function ProductGridPreview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      <div style={{ height: 40, background: '#f3f4f6', borderRadius: 4 }}></div>
      <div style={{ height: 40, background: '#f3f4f6', borderRadius: 4 }}></div>
      <div style={{ height: 40, background: '#f3f4f6', borderRadius: 4 }}></div>
      <div style={{ height: 40, background: '#f3f4f6', borderRadius: 4 }}></div>
    </div>
  )
}

function OrderSummaryPreview() {
  return (
    <div style={{ background: '#f7f7f8', borderRadius: 8, padding: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Cart (2 items)</div>
      <div style={{ fontSize: 12, color: '#6b7280' }}>Item 1 - $99</div>
      <div style={{ fontSize: 12, color: '#6b7280' }}>Item 2 - $49</div>
      <div style={{ marginTop: 8, fontWeight: 600 }}>Total: $148</div>
    </div>
  )
}

function OrderTrackingPreview() {
  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontWeight: 600 }}>Order #12345</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10a37f' }}></div>
        <div style={{ width: 40, height: 2, background: '#10a37f' }}></div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10a37f' }}></div>
        <div style={{ width: 40, height: 2, background: '#e5e5e5' }}></div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e5e5e5' }}></div>
      </div>
    </div>
  )
}

function QuantityPreview() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button style={{ width: 28, height: 28, border: '1px solid #e5e5e5', borderRadius: 4 }}>−</button>
      <span style={{ fontWeight: 600 }}>1</span>
      <button style={{ width: 28, height: 28, border: '1px solid #e5e5e5', borderRadius: 4 }}>+</button>
    </div>
  )
}

function StockPreview() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div>
      <span style={{ fontSize: 12 }}>In Stock</span>
    </div>
  )
}

function ColorSwatchesPreview() {
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b']
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {colors.map((c, i) => (
        <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: i === 0 ? '3px solid #202123' : '1px solid #e5e5e5' }}></div>
      ))}
    </div>
  )
}

function SizeSelectorPreview() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {['S', 'M', 'L', 'XL'].map((s, i) => (
        <button key={s} style={{ 
          padding: '4px 10px', 
          border: i === 1 ? '2px solid #10a37f' : '1px solid #e5e5e5',
          background: i === 1 ? '#ecfdf5' : 'white',
          borderRadius: 4,
          fontSize: 11
        }}>{s}</button>
      ))}
    </div>
  )
}

function CouponPreview() {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <input placeholder="Coupon code" style={{ flex: 1, padding: '6px 8px', border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 11 }} />
      <button style={{ padding: '6px 12px', background: '#10a37f', color: 'white', border: 'none', borderRadius: 4, fontSize: 11 }}>Apply</button>
    </div>
  )
}

function DeliveryPreview() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f7f7f8', padding: 8, borderRadius: 8 }}>
      <span>🚚</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 11 }}>Est. Delivery</div>
        <div style={{ fontSize: 10, color: '#6b7280' }}>Mar 18-20</div>
      </div>
    </div>
  )
}

function LoginPreview() {
  return (
    <div style={{ background: '#f7f7f8', padding: 12, borderRadius: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>Sign In</div>
      <input placeholder="Email" style={{ width: '100%', padding: 6, marginBottom: 6, border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 10 }} />
      <input placeholder="Password" type="password" style={{ width: '100%', padding: 6, marginBottom: 8, border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 10 }} />
      <button style={{ width: '100%', padding: 6, background: '#10a37f', color: 'white', border: 'none', borderRadius: 4, fontSize: 10 }}>Sign In</button>
    </div>
  )
}

function RegisterPreview() {
  return (
    <div style={{ background: '#f7f7f8', padding: 12, borderRadius: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>Create Account</div>
      <input placeholder="Name" style={{ width: '100%', padding: 6, marginBottom: 6, border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 10 }} />
      <input placeholder="Email" style={{ width: '100%', padding: 6, marginBottom: 6, border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 10 }} />
      <button style={{ width: '100%', padding: 6, background: '#10a37f', color: 'white', border: 'none', borderRadius: 4, fontSize: 10 }}>Create Account</button>
    </div>
  )
}

function OTPPreview() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Enter Code</div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {[0,1,2,3,5].map(i => (
          <div key={i} style={{ width: 28, height: 32, border: '1px solid #e5e5e5', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>•</div>
        ))}
      </div>
    </div>
  )
}

function ContactPreview() {
  return (
    <div style={{ background: '#f7f7f8', padding: 12, borderRadius: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Contact Us</div>
      <input placeholder="Your name" style={{ width: '100%', padding: 6, marginBottom: 6, border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 10 }} />
      <input placeholder="Message" style={{ width: '100%', padding: 6, border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 10 }} />
    </div>
  )
}

function CardPreview() {
  return (
    <div style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: 8, padding: 16 }}>
      <div style={{ fontWeight: 600 }}>Card Title</div>
      <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Card content goes here</div>
    </div>
  )
}

function RowPreview() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ flex: 1, height: 30, background: '#e5e5e5', borderRadius: 4 }}></div>
      <div style={{ flex: 1, height: 30, background: '#d1d5db', borderRadius: 4 }}></div>
    </div>
  )
}

function ColPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ height: 16, background: '#e5e5e5', borderRadius: 2 }}></div>
      <div style={{ height: 16, background: '#d1d5db', borderRadius: 2 }}></div>
    </div>
  )
}

function GridPreview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
      {[0,1,2,3,4,5].map(i => (
        <div key={i} style={{ height: 24, background: '#e5e5e5', borderRadius: 2 }}></div>
      ))}
    </div>
  )
}

function BoxPreview() {
  return (
    <div style={{ border: '2px dashed #d1d5db', borderRadius: 8, padding: 16, textAlign: 'center', color: '#9ca3af', fontSize: 11 }}>
      Flexible Container
    </div>
  )
}

function ConfirmationPreview() {
  return (
    <div style={{ textAlign: 'center', padding: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#dcfce7', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>✓</div>
      <div style={{ fontWeight: 600 }}>Success!</div>
    </div>
  )
}

function AlertPreview() {
  return (
    <div style={{ background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 6, padding: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span>ℹ️</span>
      <span style={{ fontSize: 11 }}>Information message</span>
    </div>
  )
}

function ProgressPreview() {
  return (
    <div>
      <div style={{ height: 6, background: '#e5e5e5', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: '75%', height: '100%', background: '#10a37f' }}></div>
      </div>
      <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>75%</div>
    </div>
  )
}

function CircularProgressPreview() {
  return (
    <div style={{ position: 'relative', width: 48, height: 48 }}>
      <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e5e5" strokeWidth="3"></circle>
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10a37f" strokeWidth="3" strokeDasharray="75 100" transform="rotate(-90 18 18)"></circle>
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 10, fontWeight: 600 }}>75%</div>
    </div>
  )
}

function SpinnerPreview() {
  return (
    <div style={{ width: 24, height: 24, border: '3px solid #e5e5e5', borderTopColor: '#10a37f', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
  )
}

function NotificationBadgePreview() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ width: 24, height: 24, background: '#e5e5e5', borderRadius: 4 }}></div>
      <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: '#ef4444', borderRadius: '50%', color: 'white', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
    </div>
  )
}

function FAQPreview() {
  return (
    <div style={{ fontSize: 11 }}>
      <div style={{ padding: '6px 0', borderBottom: '1px solid #e5e5e5', fontWeight: 500 }}>▼ How do I track my order?</div>
      <div style={{ padding: '6px 0', borderBottom: '1px solid #e5e5e5' }}>▶ What is your return policy?</div>
      <div style={{ padding: '6px 0' }}>▶ Do you ship internationally?</div>
    </div>
  )
}

function TimelinePreview() {
  return (
    <div style={{ fontSize: 10, paddingLeft: 12, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 3, top: 4, bottom: 4, width: 2, background: '#e5e5e5' }}></div>
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <div style={{ position: 'absolute', left: -12, width: 8, height: 8, borderRadius: '50%', background: '#10a37f' }}></div>
        Order Placed ✓
      </div>
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <div style={{ position: 'absolute', left: -12, width: 8, height: 8, borderRadius: '50%', background: '#10a37f' }}></div>
        Shipped ✓
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: -12, width: 8, height: 8, borderRadius: '50%', border: '2px solid #10a37f', background: 'white' }}></div>
        Delivered
      </div>
    </div>
  )
}

function StatsPreview() {
  return (
    <div style={{ background: '#f7f7f8', padding: 12, borderRadius: 8 }}>
      <div style={{ fontSize: 10, color: '#6b7280' }}>Total Revenue</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>$12,345</div>
      <div style={{ fontSize: 10, color: '#22c55e' }}>↑ 12.5%</div>
    </div>
  )
}

function ChartPreview() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
      <div style={{ width: 12, height: 30, background: '#10a37f', borderRadius: 2 }}></div>
      <div style={{ width: 12, height: 45, background: '#10a37f', borderRadius: 2 }}></div>
      <div style={{ width: 12, height: 35, background: '#10a37f', borderRadius: 2 }}></div>
      <div style={{ width: 12, height: 55, background: '#10a37f', borderRadius: 2 }}></div>
      <div style={{ width: 12, height: 40, background: '#10a37f', borderRadius: 2 }}></div>
    </div>
  )
}

function MapPreview() {
  return (
    <div style={{ height: 80, background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 24 }}>📍</span>
    </div>
  )
}

function CalendarPreview() {
  const days = Array.from({ length: 7 }, (_, i) => i + 1)
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{ fontSize: 8, textAlign: 'center', color: '#9ca3af' }}>{d}</div>
        ))}
        {days.map(d => (
          <div key={d} style={{ 
            fontSize: 8, 
            textAlign: 'center', 
            padding: 2,
            background: d === 3 ? '#10a37f' : 'transparent',
            color: d === 3 ? 'white' : 'inherit',
            borderRadius: 2
          }}>{d}</div>
        ))}
      </div>
    </div>
  )
}

function KanbanPreview() {
  return (
    <div style={{ display: 'flex', gap: 8, fontSize: 9 }}>
      <div style={{ flex: 1, background: '#f7f7f8', borderRadius: 4, padding: 6 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>To Do</div>
        <div style={{ background: 'white', padding: 4, borderRadius: 2, marginBottom: 2 }}>Task 1</div>
      </div>
      <div style={{ flex: 1, background: '#f7f7f8', borderRadius: 4, padding: 6 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Done</div>
        <div style={{ background: '#dcfce7', padding: 4, borderRadius: 2 }}>Task 2</div>
      </div>
    </div>
  )
}

function SignaturePreview() {
  return (
    <div style={{ border: '1px dashed #d1d5db', borderRadius: 4, padding: 16, textAlign: 'center', color: '#9ca3af', fontSize: 10 }}>
      ✍️ Sign here
    </div>
  )
}

function QRCodePreview() {
  return (
    <div style={{ width: 48, height: 48, background: '#202123', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: 'white', fontSize: 8 }}>QR</span>
    </div>
  )
}

export default GalleryPage
