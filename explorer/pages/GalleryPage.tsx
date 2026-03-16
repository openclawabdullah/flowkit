/**
 * FlowKit Explorer - Gallery Page
 * 
 * Visual gallery of all 70+ widgets with live previews
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function GalleryPage() {
  const navigate = useNavigate()
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
              onClick={() => {
                console.log('Clicked:', cat.id)
                setSelectedCategory(cat.id)
              }}
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
          navigate={navigate}
        />
      )}
    </div>
  )
}

function WidgetModal({ widget, onClose, navigate }: { widget: any; onClose: () => void; navigate: any }) {
  const [copied, setCopied] = useState(false)
  
  const copyJSON = () => {
    const json = JSON.stringify(widget.schema, null, 2)
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const openInStudio = () => {
    // Save widget to localStorage for studio to pick up
    const studioWidget = {
      id: Date.now().toString(),
      name: widget.name,
      code: JSON.stringify(widget.schema, null, 2),
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    
    // Get existing widgets
    const existing = JSON.parse(localStorage.getItem('flowkit-studio-widgets') || '[]')
    existing.push(studioWidget)
    localStorage.setItem('flowkit-studio-widgets', JSON.stringify(existing))
    
    // Navigate to studio
    onClose()
    navigate('/studio')
  }
  
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
          <button className="btn btn-primary" onClick={copyJSON}>
            {copied ? '✓ Copied!' : 'Copy JSON'}
          </button>
          <button className="btn btn-secondary" onClick={openInStudio}>
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
        productId: 'prod_001',
        title: 'Premium Wireless Headphones',
        subtitle: 'Active Noise Cancellation',
        price: 299.99,
        originalPrice: 399.99,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 4.8,
        reviews: 1247,
        badge: 'SALE',
        badgeColor: '#ef4444',
        inStock: true,
        stockCount: 23,
        onAddToCartAction: {
          type: 'add_to_cart',
          data: { productId: 'prod_001', quantity: 1 }
        }
      }
    },
    {
      name: 'ProductGrid',
      category: 'ecommerce',
      description: 'Grid layout for multiple products',
      preview: <ProductGridPreview />,
      schema: {
        type: 'ProductGrid',
        columns: 2,
        products: [
          {
            productId: 'prod_001',
            title: 'Product 1',
            price: 99.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
          },
          {
            productId: 'prod_002',
            title: 'Product 2',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'
          }
        ]
      }
    },
    {
      name: 'OrderSummary',
      category: 'ecommerce',
      description: 'Shopping cart with items and totals',
      preview: <OrderSummaryPreview />,
      schema: {
        type: 'OrderSummary',
        items: [
          {
            productId: 'prod_001',
            title: 'Premium Headphones',
            quantity: 1,
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'
          },
          {
            productId: 'prod_002',
            title: 'Wireless Charger',
            quantity: 2,
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=100'
          }
        ],
        subtotal: 399.97,
        tax: 32.00,
        shipping: 0,
        discount: 40.00,
        total: 391.97,
        currency: 'USD'
      }
    },
    {
      name: 'OrderTracking',
      category: 'ecommerce',
      description: 'Track order status with timeline',
      preview: <OrderTrackingPreview />,
      schema: {
        type: 'OrderTracking',
        orderId: 'ORD-12345',
        status: 'in_transit',
        estimatedDelivery: '2026-03-20',
        carrier: 'FedEx',
        trackingNumber: '123456789012',
        timeline: [
          {
            status: 'ordered',
            title: 'Order Placed',
            description: 'Your order has been confirmed',
            timestamp: '2026-03-15T10:00:00Z',
            completed: true
          },
          {
            status: 'shipped',
            title: 'Shipped',
            description: 'Package picked up by carrier',
            timestamp: '2026-03-16T08:00:00Z',
            completed: true
          },
          {
            status: 'in_transit',
            title: 'In Transit',
            description: 'Package on the way',
            timestamp: '2026-03-17T14:00:00Z',
            completed: false,
            current: true
          },
          {
            status: 'delivered',
            title: 'Delivered',
            description: 'Package will be delivered',
            timestamp: null,
            completed: false
          }
        ]
      }
    },
    {
      name: 'QuantitySelector',
      category: 'ecommerce',
      description: '+/- buttons for quantity',
      preview: <QuantityPreview />,
      schema: {
        type: 'QuantitySelector',
        name: 'quantity',
        value: 1,
        min: 1,
        max: 10,
        label: 'Quantity',
        onChangeAction: {
          type: 'update_quantity',
          data: {}
        }
      }
    },
    {
      name: 'StockIndicator',
      category: 'ecommerce',
      description: 'Show stock availability',
      preview: <StockPreview />,
      schema: {
        type: 'StockIndicator',
        inStock: true,
        stockCount: 23,
        showCount: true,
        lowStockThreshold: 5,
        statusText: {
          inStock: 'In Stock',
          lowStock: 'Only {count} left',
          outOfStock: 'Out of Stock'
        }
      }
    },
    {
      name: 'ColorSwatches',
      category: 'ecommerce',
      description: 'Product color selection',
      preview: <ColorSwatchesPreview />,
      schema: {
        type: 'ColorSwatches',
        name: 'color',
        label: 'Color',
        colors: [
          { name: 'Midnight Black', hex: '#1a1a1a', value: 'black', available: true },
          { name: 'Pearl White', hex: '#ffffff', value: 'white', available: true },
          { name: 'Navy Blue', hex: '#1e3a5f', value: 'navy', available: true },
          { name: 'Rose Gold', hex: '#b76e79', value: 'rose_gold', available: false }
        ],
        selected: 'black',
        showLabels: true,
        onSelectAction: {
          type: 'select_color',
          data: {}
        }
      }
    },
    {
      name: 'SizeSelector',
      category: 'ecommerce',
      description: 'Product size selection',
      preview: <SizeSelectorPreview />,
      schema: {
        type: 'SizeSelector',
        name: 'size',
        label: 'Size',
        sizes: [
          { label: 'XS', value: 'xs', available: true },
          { label: 'S', value: 's', available: true },
          { label: 'M', value: 'm', available: true },
          { label: 'L', value: 'l', available: true },
          { label: 'XL', value: 'xl', available: false },
          { label: 'XXL', value: 'xxl', available: false }
        ],
        selected: 'm',
        showAvailability: true,
        onSelectAction: {
          type: 'select_size',
          data: {}
        }
      }
    },
    {
      name: 'CouponInput',
      category: 'ecommerce',
      description: 'Promo code input',
      preview: <CouponPreview />,
      schema: {
        type: 'CouponInput',
        placeholder: 'Enter promo code',
        buttonText: 'Apply',
        appliedCode: null,
        discount: null,
        onApplyAction: {
          type: 'apply_coupon',
          data: {}
        },
        onRemoveAction: {
          type: 'remove_coupon',
          data: {}
        }
      }
    },
    {
      name: 'DeliveryEstimate',
      category: 'ecommerce',
      description: 'Estimated delivery dates',
      preview: <DeliveryPreview />,
      schema: {
        type: 'DeliveryEstimate',
        minDays: 3,
        maxDays: 5,
        startDate: '2026-03-18',
        endDate: '2026-03-20',
        carrier: 'FedEx',
        shippingMethod: 'Standard Shipping',
        cost: 0,
        icon: '🚚'
      }
    },
    
    // Auth
    {
      name: 'Login',
      category: 'auth',
      description: 'Login form with email/password',
      preview: <LoginPreview />,
      schema: {
        type: 'Login',
        title: 'Sign In',
        subtitle: 'Welcome back',
        emailPlaceholder: 'Email address',
        passwordPlaceholder: 'Password',
        showRememberMe: true,
        showForgotPassword: true,
        submitButtonText: 'Sign In',
        socialLogins: ['google', 'apple', 'github'],
        onLoginAction: {
          type: 'login',
          data: {}
        }
      }
    },
    {
      name: 'Register',
      category: 'auth',
      description: 'Registration form',
      preview: <RegisterPreview />,
      schema: {
        type: 'Register',
        title: 'Create Account',
        subtitle: 'Get started for free',
        fields: [
          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: true },
          { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', required: true }
        ],
        submitButtonText: 'Create Account',
        showTerms: true,
        onRegisterAction: {
          type: 'register',
          data: {}
        }
      }
    },
    {
      name: 'VerifyOTP',
      category: 'auth',
      description: 'OTP verification code input',
      preview: <OTPPreview />,
      schema: {
        type: 'VerifyOTP',
        title: 'Enter verification code',
        subtitle: 'We sent a 6-digit code to +1 (555) 123-4567',
        length: 6,
        resendAfter: 60,
        onVerifyAction: {
          type: 'verify_otp',
          data: {}
        },
        onResendAction: {
          type: 'resend_otp',
          data: {}
        }
      }
    },
    {
      name: 'ContactForm',
      category: 'auth',
      description: 'Contact/support form',
      preview: <ContactPreview />,
      schema: {
        type: 'ContactForm',
        title: 'Contact Us',
        subtitle: 'We\'d love to hear from you',
        fields: [
          { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
          { name: 'subject', label: 'Subject', type: 'select', options: ['General', 'Support', 'Sales'], required: true },
          { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message...', required: true }
        ],
        submitButtonText: 'Send Message',
        onSubmitAction: {
          type: 'submit_contact',
          data: {}
        }
      }
    },
    
    // Layout
    {
      name: 'Card',
      category: 'layout',
      description: 'Container with padding and border',
      preview: <CardPreview />,
      schema: {
        type: 'Card',
        title: 'Card Title',
        subtitle: 'Optional subtitle',
        padding: 20,
        shadow: true,
        border: true,
        children: [
          { type: 'Text', content: 'Card content goes here' }
        ]
      }
    },
    {
      name: 'Row',
      category: 'layout',
      description: 'Horizontal layout',
      preview: <RowPreview />,
      schema: {
        type: 'Row',
        gap: 12,
        align: 'center',
        justify: 'space-between',
        wrap: true,
        children: [
          { type: 'Text', content: 'Item 1' },
          { type: 'Text', content: 'Item 2' }
        ]
      }
    },
    {
      name: 'Col',
      category: 'layout',
      description: 'Vertical layout',
      preview: <ColPreview />,
      schema: {
        type: 'Col',
        gap: 8,
        align: 'stretch',
        children: [
          { type: 'Text', content: 'Row 1' },
          { type: 'Text', content: 'Row 2' }
        ]
      }
    },
    {
      name: 'Grid',
      category: 'layout',
      description: 'CSS Grid layout',
      preview: <GridPreview />,
      schema: {
        type: 'Grid',
        columns: 3,
        gap: 16,
        children: [
          { type: 'Card', title: 'Cell 1' },
          { type: 'Card', title: 'Cell 2' },
          { type: 'Card', title: 'Cell 3' }
        ]
      }
    },
    {
      name: 'Box',
      category: 'layout',
      description: 'Flexible container',
      preview: <BoxPreview />,
      schema: {
        type: 'Box',
        padding: 16,
        margin: 8,
        background: '#f7f7f8',
        borderRadius: 8,
        children: [
          { type: 'Text', content: 'Box content' }
        ]
      }
    },
    
    // Feedback
    {
      name: 'Confirmation',
      category: 'feedback',
      description: 'Success confirmation message',
      preview: <ConfirmationPreview />,
      schema: {
        type: 'Confirmation',
        icon: 'success',
        iconColor: '#10a37f',
        title: 'Success!',
        message: 'Your changes have been saved successfully.',
        actionButton: {
          label: 'Continue',
          action: { type: 'navigate', data: { path: '/' } }
        }
      }
    },
    {
      name: 'Alert',
      category: 'feedback',
      description: 'Alert message with icon',
      preview: <AlertPreview />,
      schema: {
        type: 'Alert',
        severity: 'info',
        title: 'Heads up!',
        message: 'This is an important information message for the user.',
        dismissible: true,
        onDismissAction: {
          type: 'dismiss_alert',
          data: {}
        }
      }
    },
    {
      name: 'Progress',
      category: 'feedback',
      description: 'Progress bar',
      preview: <ProgressPreview />,
      schema: {
        type: 'Progress',
        value: 75,
        max: 100,
        showLabel: true,
        label: 'Uploading...',
        color: '#10a37f',
        striped: false,
        animated: true
      }
    },
    {
      name: 'CircularProgress',
      category: 'feedback',
      description: 'Circular progress indicator',
      preview: <CircularProgressPreview />,
      schema: {
        type: 'CircularProgress',
        value: 75,
        max: 100,
        size: 48,
        strokeWidth: 4,
        showValue: true,
        color: '#10a37f'
      }
    },
    {
      name: 'Spinner',
      category: 'feedback',
      description: 'Loading spinner',
      preview: <SpinnerPreview />,
      schema: {
        type: 'Spinner',
        size: 24,
        color: '#10a37f',
        label: 'Loading...'
      }
    },
    {
      name: 'NotificationBadge',
      category: 'feedback',
      description: 'Badge with count',
      preview: <NotificationBadgePreview />,
      schema: {
        type: 'NotificationBadge',
        count: 5,
        max: 99,
        color: '#ef4444',
        showZero: false,
        dot: false
      }
    },
    
    // Support
    {
      name: 'FAQ',
      category: 'support',
      description: 'FAQ accordion',
      preview: <FAQPreview />,
      schema: {
        type: 'FAQ',
        title: 'Frequently Asked Questions',
        expandFirst: false,
        items: [
          {
            id: 'faq_1',
            question: 'How do I track my order?',
            answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can also check your order status in your account under "Order History".',
            category: 'Shipping'
          },
          {
            id: 'faq_2',
            question: 'What is your return policy?',
            answer: 'We accept returns within 30 days of purchase. Items must be unused and in original packaging. Contact our support team to initiate a return.',
            category: 'Returns'
          },
          {
            id: 'faq_3',
            question: 'Do you ship internationally?',
            answer: 'Yes! We ship to over 100 countries. Shipping costs and delivery times vary by location. Check our shipping page for details.',
            category: 'Shipping'
          }
        ]
      }
    },
    {
      name: 'Timeline',
      category: 'support',
      description: 'Vertical timeline',
      preview: <TimelinePreview />,
      schema: {
        type: 'Timeline',
        orientation: 'vertical',
        items: [
          {
            id: 'step_1',
            title: 'Order Placed',
            description: 'Your order has been confirmed',
            timestamp: '2026-03-15T10:00:00Z',
            status: 'completed',
            icon: 'check'
          },
          {
            id: 'step_2',
            title: 'Processing',
            description: 'Order is being prepared',
            timestamp: '2026-03-15T14:00:00Z',
            status: 'completed',
            icon: 'check'
          },
          {
            id: 'step_3',
            title: 'Shipped',
            description: 'Package on the way',
            timestamp: '2026-03-16T08:00:00Z',
            status: 'current',
            icon: 'truck'
          },
          {
            id: 'step_4',
            title: 'Delivered',
            description: 'Expected Mar 20',
            timestamp: null,
            status: 'pending',
            icon: 'package'
          }
        ]
      }
    },
    {
      name: 'Stats',
      category: 'support',
      description: 'Statistics display',
      preview: <StatsPreview />,
      schema: {
        type: 'Stats',
        title: 'Revenue',
        value: '$12,345',
        change: '+12.5%',
        changeType: 'increase',
        period: 'vs last month',
        icon: '💰',
        sparkline: [10, 15, 13, 17, 20, 18, 22],
        size: 'medium'
      }
    },
    
    // Advanced
    {
      name: 'Chart',
      category: 'advanced',
      description: 'Charts (bar, line, pie, donut)',
      preview: <ChartPreview />,
      schema: {
        type: 'Chart',
        chartType: 'bar',
        title: 'Monthly Sales',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Sales',
              data: [1200, 1900, 1500, 2200, 2800],
              backgroundColor: '#10a37f'
            }
          ]
        },
        options: {
          responsive: true,
          showLegend: true
        }
      }
    },
    {
      name: 'Map',
      category: 'advanced',
      description: 'Interactive map',
      preview: <MapPreview />,
      schema: {
        type: 'Map',
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
        markers: [
          {
            id: 'marker_1',
            position: { lat: 37.7749, lng: -122.4194 },
            title: 'San Francisco',
            description: 'Store location',
            icon: '📍'
          },
          {
            id: 'marker_2',
            position: { lat: 37.7849, lng: -122.4094 },
            title: 'Pickup Point',
            description: 'Available 24/7',
            icon: '🏪'
          }
        ],
        onMarkerClickAction: {
          type: 'marker_click',
          data: {}
        }
      }
    },
    {
      name: 'Calendar',
      category: 'advanced',
      description: 'Calendar with events',
      preview: <CalendarPreview />,
      schema: {
        type: 'Calendar',
        view: 'month',
        defaultDate: '2026-03-15',
        events: [
          {
            id: 'event_1',
            title: 'Team Meeting',
            start: '2026-03-16T10:00:00Z',
            end: '2026-03-16T11:00:00Z',
            color: '#10a37f'
          },
          {
            id: 'event_2',
            title: 'Product Launch',
            start: '2026-03-18T09:00:00Z',
            end: '2026-03-18T17:00:00Z',
            color: '#6366f1'
          }
        ],
        onDateSelectAction: {
          type: 'date_select',
          data: {}
        },
        onEventClickAction: {
          type: 'event_click',
          data: {}
        }
      }
    },
    {
      name: 'Kanban',
      category: 'advanced',
      description: 'Kanban board',
      preview: <KanbanPreview />,
      schema: {
        type: 'Kanban',
        columns: [
          {
            id: 'todo',
            title: 'To Do',
            color: '#6b7280',
            cards: [
              {
                id: 'card_1',
                title: 'Design homepage',
                description: 'Create mockups for new landing page',
                labels: ['design'],
                assignee: 'john'
              }
            ]
          },
          {
            id: 'in_progress',
            title: 'In Progress',
            color: '#10a37f',
            cards: [
              {
                id: 'card_2',
                title: 'API integration',
                description: 'Connect to payment gateway',
                labels: ['backend'],
                assignee: 'sarah'
              }
            ]
          },
          {
            id: 'done',
            title: 'Done',
            color: '#22c55e',
            cards: []
          }
        ],
        onCardMoveAction: {
          type: 'move_card',
          data: {}
        }
      }
    },
    {
      name: 'SignaturePad',
      category: 'advanced',
      description: 'Signature capture',
      preview: <SignaturePreview />,
      schema: {
        type: 'SignaturePad',
        name: 'signature',
        label: 'Sign here',
        placeholder: 'Draw your signature',
        width: 400,
        height: 200,
        penColor: '#202123',
        backgroundColor: '#ffffff',
        clearButtonText: 'Clear',
        saveButtonText: 'Save',
        onSaveAction: {
          type: 'save_signature',
          data: {}
        }
      }
    },
    {
      name: 'QRCode',
      category: 'advanced',
      description: 'QR code generator',
      preview: <QRCodePreview />,
      schema: {
        type: 'QRCode',
        value: 'https://flowkit.dev',
        size: 200,
        level: 'M',
        bgColor: '#ffffff',
        fgColor: '#202123',
        includeMargin: true,
        label: 'Scan me'
      }
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, maxWidth: 240 }}>
      <div style={{ background: 'white', borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
        <div style={{ height: 50, background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)' }}></div>
        <div style={{ padding: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600 }}>Product 1</div>
          <div style={{ fontSize: 9, color: '#10a37f', fontWeight: 600 }}>$99</div>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
        <div style={{ height: 50, background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)' }}></div>
        <div style={{ padding: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600 }}>Product 2</div>
          <div style={{ fontSize: 9, color: '#10a37f', fontWeight: 600 }}>$149</div>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
        <div style={{ height: 50, background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)' }}></div>
        <div style={{ padding: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600 }}>Product 3</div>
          <div style={{ fontSize: 9, color: '#10a37f', fontWeight: 600 }}>$79</div>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
        <div style={{ height: 50, background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)' }}></div>
        <div style={{ padding: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600 }}>Product 4</div>
          <div style={{ fontSize: 9, color: '#10a37f', fontWeight: 600 }}>$199</div>
        </div>
      </div>
    </div>
  )
}

function OrderSummaryPreview() {
  return (
    <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e5e5e5', overflow: 'hidden', minWidth: 200 }}>
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #e5e5e5', fontWeight: 600, fontSize: 12 }}>
        🛒 Cart (2 items)
      </div>
      <div style={{ padding: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ width: 32, height: 32, background: '#f3f4f6', borderRadius: 4 }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 500 }}>Headphones</div>
            <div style={{ fontSize: 9, color: '#6b7280' }}>Qty: 1</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 600 }}>$299</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
          <div style={{ width: 32, height: 32, background: '#f3f4f6', borderRadius: 4 }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 500 }}>Charger</div>
            <div style={{ fontSize: 9, color: '#6b7280' }}>Qty: 2</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 600 }}>$100</div>
        </div>
      </div>
      <div style={{ padding: '8px 12px', background: '#f7f7f8', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
          <span>Subtotal:</span>
          <span>$399</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 600, marginTop: 4 }}>
          <span>Total:</span>
          <span style={{ color: '#10a37f' }}>$391.97</span>
        </div>
      </div>
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
