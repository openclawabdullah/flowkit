import React from 'react'
import { Chat, DemoAdapter } from './index'

const adapter = new DemoAdapter()

const suggestions = [
  'Show products',
  'Categories',
  'View cart',
  'Checkout',
  'Track order',
  'Login',
  'OTP verification',
  'Invoice',
  'FAQ',
  'Contact support',
]

function App() {
  return (
    <Chat
      adapter={adapter}
      placeholder="Try: 'show products' or 'login'..."
      suggestions={suggestions}
    />
  )
}

export default App
