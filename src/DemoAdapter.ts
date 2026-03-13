/**
 * FlowKit - Demo Adapter
 * 
 * A demo adapter that shows all widgets without requiring a backend.
 */

import type { FlowKitAdapter, StreamEvent, ConversationContext, WidgetAction } from './types'

// Sample data
const products = [
  { id: '1', name: 'Premium Headphones', price: 299, originalPrice: 399, rating: 4.8, reviews: 1247, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', badge: 'SALE' },
  { id: '2', name: 'Wireless Keyboard', price: 149, rating: 4.5, reviews: 892, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
  { id: '3', name: 'Smart Watch', price: 499, rating: 4.9, reviews: 2341, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', badge: 'NEW' },
  { id: '4', name: 'Laptop Stand', price: 79, rating: 4.3, reviews: 567, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
]

const categories = [
  { id: '1', name: 'Electronics', icon: '📱', count: 156 },
  { id: '2', name: 'Clothing', icon: '👕', count: 324 },
  { id: '3', name: 'Home & Garden', icon: '🏠', count: 89 },
  { id: '4', name: 'Sports', icon: '⚽', count: 67 },
  { id: '5', name: 'Books', icon: '📚', count: 234 },
  { id: '6', name: 'Beauty', icon: '💄', count: 145 },
]

const addresses = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    street: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    name: 'John Doe',
    phone: '+1 (555) 987-6543',
    street: '456 Office Park',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'United States',
    isDefault: false,
  },
]

const faqs = [
  { id: '1', question: 'How do I track my order?', answer: 'You can track your order by clicking the "Track Order" button in your order confirmation email, or by visiting the Orders section in your account.', category: 'orders' },
  { id: '2', question: 'What is your return policy?', answer: 'We offer a 30-day return policy for all unused items in their original packaging. Simply initiate a return from your account and we\'ll provide a prepaid shipping label.', category: 'returns' },
  { id: '3', question: 'How do I change my shipping address?', answer: 'You can update your shipping address in the Addresses section of your account. For pending orders, please contact support immediately.', category: 'shipping' },
  { id: '4', question: 'Do you offer international shipping?', answer: 'Yes! We ship to over 100 countries worldwide. International shipping rates and delivery times vary by location.', category: 'shipping' },
]

export class DemoAdapter implements FlowKitAdapter {
  async *sendMessage(message: string, context?: ConversationContext): AsyncGenerator<StreamEvent> {
    const lowerMessage = message.toLowerCase()

    // Simulate typing delay
    yield { type: 'status', status: 'typing' }
    await delay(500)

    // Products
    if (lowerMessage.includes('product') || lowerMessage.includes('show') || lowerMessage.includes('browse')) {
      yield { type: 'text', text: 'Here are our featured products:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'ProductGrid',
          title: 'Featured Products',
          columns: 2,
          products: products.map(p => ({
            type: 'ProductCard',
            productId: p.id,
            image: p.image,
            title: p.name,
            price: p.price,
            originalPrice: p.originalPrice,
            currency: '$',
            rating: p.rating,
            reviews: p.reviews,
            badge: p.badge,
            inStock: true,
            onClickAction: { type: 'view_product', data: { id: p.id } },
            onAddToCartAction: { type: 'add_to_cart', data: { productId: p.id } },
          })),
        },
      }
      return
    }

    // Categories
    if (lowerMessage.includes('categor') || lowerMessage.includes('department')) {
      yield { type: 'text', text: 'Browse by category:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'CategoryList',
          title: 'Categories',
          layout: 'grid',
          categories: categories.map(c => ({
            id: c.id,
            name: c.name,
            icon: c.icon,
            count: c.count,
          })),
          onSelectAction: { type: 'select_category' },
        },
      }
      return
    }

    // Cart
    if (lowerMessage.includes('cart') || lowerMessage.includes('basket')) {
      yield { type: 'text', text: 'Here\'s your cart:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'OrderSummary',
          title: 'Shopping Cart',
          items: [
            { name: 'Premium Headphones', quantity: 1, price: 299, image: products[0].image },
            { name: 'Wireless Keyboard', quantity: 2, price: 149, image: products[1].image },
          ],
          subtotal: 597,
          shipping: 15,
          tax: 47.76,
          discount: 50,
          total: 609.76,
          currency: '$',
          onApplyPromoAction: { type: 'apply_promo' },
        },
      }
      return
    }

    // Checkout
    if (lowerMessage.includes('checkout') || lowerMessage.includes('pay')) {
      yield { type: 'text', text: 'Let\'s complete your order:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'Checkout',
          steps: [
            { id: 'shipping', label: 'Shipping' },
            { id: 'payment', label: 'Payment' },
            { id: 'review', label: 'Review' },
          ],
          currentStep: 'shipping',
          shippingAddress: {
            type: 'AddressList',
            title: 'Shipping Address',
            addresses: addresses,
            onSelectAction: { type: 'select_address' },
            onAddAction: { type: 'add_address' },
          },
          orderSummary: {
            type: 'OrderSummary',
            items: [
              { name: 'Premium Headphones', quantity: 1, price: 299 },
            ],
            subtotal: 299,
            shipping: 0,
            total: 299,
            currency: '$',
          },
          onNextAction: { type: 'checkout_next' },
        },
      }
      return
    }

    // Track order
    if (lowerMessage.includes('track') || lowerMessage.includes('order') || lowerMessage.includes('delivery')) {
      yield { type: 'text', text: 'Here\'s your order status:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'OrderTracking',
          orderId: 'ORD-2024-12345',
          status: 'shipped',
          estimatedDelivery: 'March 20, 2024',
          timeline: [
            { status: 'Order Placed', timestamp: 'Mar 10, 2024 • 2:30 PM', description: 'Your order has been confirmed', completed: true, current: false },
            { status: 'Processing', timestamp: 'Mar 11, 2024 • 9:00 AM', description: 'Order is being prepared', completed: true, current: false },
            { status: 'Shipped', timestamp: 'Mar 12, 2024 • 3:45 PM', description: 'Package picked up by carrier', location: 'New York, NY', completed: true, current: true },
            { status: 'Out for Delivery', timestamp: '', completed: false, current: false },
            { status: 'Delivered', timestamp: '', completed: false, current: false },
          ],
          onContactAction: { type: 'contact_support' },
          onTrackAction: { type: 'track_map' },
        },
      }
      return
    }

    // Addresses
    if (lowerMessage.includes('address')) {
      yield { type: 'text', text: 'Here are your saved addresses:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'AddressList',
          title: 'Your Addresses',
          addresses: addresses,
          onSelectAction: { type: 'select_address' },
          onEditAction: { type: 'edit_address' },
          onDeleteAction: { type: 'delete_address' },
          onAddAction: { type: 'add_address' },
        },
      }
      return
    }

    // Login
    if (lowerMessage.includes('login') || lowerMessage.includes('sign in') || lowerMessage.includes('signin')) {
      yield { type: 'text', text: 'Please sign in to continue:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'Login',
          title: 'Welcome Back',
          subtitle: 'Sign in to your account',
          fields: [
            { name: 'email', type: 'email', placeholder: 'Email address', required: true },
            { name: 'password', type: 'password', placeholder: 'Password', required: true },
          ],
          submitLabel: 'Sign In',
          forgotPasswordAction: { type: 'forgot_password' },
          signupAction: { type: 'signup' },
          socialLogins: [
            { provider: 'google', label: 'Google', onClickAction: { type: 'social_login', data: { provider: 'google' } } },
            { provider: 'apple', label: 'Apple', onClickAction: { type: 'social_login', data: { provider: 'apple' } } },
          ],
          onSubmitAction: { type: 'login' },
        },
      }
      return
    }

    // Register
    if (lowerMessage.includes('register') || lowerMessage.includes('signup') || lowerMessage.includes('sign up')) {
      yield { type: 'text', text: 'Create your account:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'Register',
          title: 'Create Account',
          fields: [
            { name: 'name', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
            { name: 'email', type: 'email', label: 'Email', placeholder: 'john@example.com', required: true },
            { name: 'password', type: 'password', label: 'Password', placeholder: '••••••••', required: true },
            { name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: '••••••••', required: true },
          ],
          submitLabel: 'Create Account',
          loginAction: { type: 'login' },
          onSubmitAction: { type: 'register' },
        },
      }
      return
    }

    // OTP Verification
    if (lowerMessage.includes('otp') || lowerMessage.includes('verify') || lowerMessage.includes('code')) {
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'VerifyOTP',
          title: 'Verify Your Email',
          subtitle: 'We sent a 6-digit code to john@example.com',
          length: 6,
          resendAction: { type: 'resend_otp' },
          verifyAction: { type: 'verify_otp' },
        },
      }
      return
    }

    // Invoice
    if (lowerMessage.includes('invoice') || lowerMessage.includes('receipt')) {
      yield { type: 'text', text: 'Here\'s your invoice:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'Invoice',
          invoiceNumber: 'INV-2024-001234',
          date: 'March 15, 2024',
          dueDate: 'April 15, 2024',
          status: 'pending',
          from: { name: 'FlowKit Store', email: 'billing@flowkit.dev' },
          to: { name: 'John Doe', email: 'john@example.com' },
          items: [
            { description: 'Premium Headphones', quantity: 1, unitPrice: 299, total: 299 },
            { description: 'Wireless Keyboard', quantity: 2, unitPrice: 149, total: 298 },
          ],
          subtotal: 597,
          tax: 47.76,
          discount: 50,
          total: 594.76,
          currency: '$',
          notes: 'Thank you for your business!',
          payAction: { type: 'pay_invoice' },
          downloadAction: { type: 'download_invoice' },
        },
      }
      return
    }

    // FAQ
    if (lowerMessage.includes('faq') || lowerMessage.includes('help') || lowerMessage.includes('question')) {
      yield { type: 'text', text: 'Here are some frequently asked questions:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'FAQ',
          title: 'Frequently Asked Questions',
          categories: [
            { id: 'orders', label: 'Orders' },
            { id: 'shipping', label: 'Shipping' },
            { id: 'returns', label: 'Returns' },
          ],
          items: faqs,
          searchPlaceholder: 'Search FAQs...',
        },
      }
      return
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      yield { type: 'text', text: 'How can we help you?' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'ContactForm',
          title: 'Contact Us',
          subtitle: 'We\'ll get back to you within 24 hours',
          fields: [
            { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
            { name: 'email', type: 'email', placeholder: 'Your Email', required: true },
            { name: 'subject', type: 'select', placeholder: 'Select a topic', options: [
              { label: 'Order Issue', value: 'order' },
              { label: 'Return/Refund', value: 'return' },
              { label: 'Technical Support', value: 'tech' },
              { label: 'Other', value: 'other' },
            ]},
            { name: 'message', type: 'textarea', placeholder: 'How can we help?', required: true },
          ],
          submitLabel: 'Send Message',
          onSubmitAction: { type: 'submit_contact' },
        },
      }
      return
    }

    // Payment methods
    if (lowerMessage.includes('payment') || lowerMessage.includes('card')) {
      yield { type: 'text', text: 'Select a payment method:' }
      yield { type: 'status', status: 'idle' }
      
      yield {
        type: 'widget',
        widget: {
          type: 'PaymentMethod',
          title: 'Payment Methods',
          methods: [
            { id: 'card1', type: 'card', label: 'Visa •••• 4242', details: 'Expires 12/25', selected: true },
            { id: 'card2', type: 'card', label: 'Mastercard •••• 8888', details: 'Expires 08/26' },
            { id: 'paypal', type: 'wallet', label: 'PayPal', details: 'john@example.com' },
            { id: 'cod', type: 'cod', label: 'Cash on Delivery', details: 'Pay when you receive' },
          ],
          onSelectAction: { type: 'select_payment' },
          onAddAction: { type: 'add_payment' },
        },
      }
      return
    }

    // Default: Show all widgets demo
    yield { type: 'text', text: 'Welcome! I can show you different widgets. Try asking about:' }
    yield { type: 'status', status: 'idle' }
    
    yield {
      type: 'widget',
      widget: {
        type: 'ListView',
        gap: 4,
        children: [
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'products' } },
            children: [{ type: 'Text', value: '🛍️ Products - Browse our catalog' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'categories' } },
            children: [{ type: 'Text', value: '📂 Categories - Shop by department' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'cart' } },
            children: [{ type: 'Text', value: '🛒 Cart - View your cart' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'checkout' } },
            children: [{ type: 'Text', value: '💳 Checkout - Complete purchase' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'track' } },
            children: [{ type: 'Text', value: '📦 Track Order - Delivery status' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'login' } },
            children: [{ type: 'Text', value: '🔐 Login - Sign in form' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'otp' } },
            children: [{ type: 'Text', value: '📱 OTP Verification - Code input' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'invoice' } },
            children: [{ type: 'Text', value: '📄 Invoice - Payment receipt' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'faq' } },
            children: [{ type: 'Text', value: '❓ FAQ - Common questions' }],
          },
          {
            type: 'ListViewItem',
            onClickAction: { type: 'demo', data: { widget: 'contact' } },
            children: [{ type: 'Text', value: '💬 Contact - Support form' }],
          },
        ],
      },
    }
  }

  async *handleAction(action: WidgetAction): AsyncGenerator<StreamEvent> {
    yield { type: 'status', status: 'typing' }
    await delay(300)

    if (action.type === 'add_to_cart') {
      yield {
        type: 'widget',
        widget: {
          type: 'Confirmation',
          icon: 'success',
          title: 'Added to Cart!',
          message: 'Item has been added to your shopping cart.',
          details: [
            { label: 'Product', value: 'Premium Headphones' },
            { label: 'Price', value: '$299' },
          ],
          primaryAction: { label: 'View Cart', onClickAction: { type: 'view_cart' } },
          secondaryAction: { label: 'Continue Shopping', onClickAction: { type: 'continue' } },
        },
      }
      return
    }

    if (action.type === 'login') {
      yield {
        type: 'widget',
        widget: {
          type: 'Success',
          title: 'Welcome back!',
          message: 'You have successfully signed in.',
          action: { label: 'Continue', onClickAction: { type: 'home' } },
        },
      }
      return
    }

    if (action.type === 'verify_otp') {
      yield {
        type: 'widget',
        widget: {
          type: 'Success',
          title: 'Verified!',
          message: 'Your email has been verified successfully.',
          action: { label: 'Continue', onClickAction: { type: 'home' } },
        },
      }
      return
    }

    if (action.type === 'submit_contact') {
      yield {
        type: 'widget',
        widget: {
          type: 'Success',
          title: 'Message Sent!',
          message: 'We\'ll get back to you within 24 hours.',
          action: { label: 'Done', onClickAction: { type: 'home' } },
        },
      }
      return
    }

    if (action.type === 'demo') {
      const widget = action.data?.widget
      if (widget) {
        // Re-send message with the widget name
        yield* this.sendMessage(`show me ${widget}`)
        return
      }
    }

    // Default response
    yield {
      type: 'text',
      text: `Action received: ${action.type}`,
    }
  }
}

// Helper
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default DemoAdapter
