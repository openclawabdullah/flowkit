/**
 * FlowKit - Context Provider
 * 
 * Share state across widgets. Cart, user, theme - all accessible.
 */

import React from 'react'

// ============================================
// Types
// ============================================

export interface FlowKitContextValue {
  /** User data */
  user?: User
  /** Cart data */
  cart?: Cart
  /** Theme configuration */
  theme?: Theme
  /** Custom data */
  data?: Record<string, any>
  /** Update user */
  setUser?: (user: User | undefined) => void
  /** Update cart */
  setCart?: (cart: Cart) => void
  /** Update custom data */
  setData?: (key: string, value: any) => void
  /** Get custom data */
  getData?: (key: string) => any
  /** Clear all data */
  clear?: () => void
}

export interface User {
  id?: string
  name?: string
  email?: string
  avatar?: string
  role?: string
  [key: string]: any
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  total: number
  currency?: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  options?: Record<string, string>
}

export interface Theme {
  colors?: {
    primary?: string
    secondary?: string
    success?: string
    warning?: string
    error?: string
    info?: string
  }
  fontFamily?: string
  borderRadius?: string | number
}

// ============================================
// React Context
// ============================================

export const FlowKitContext = React.createContext<FlowKitContextValue>({})

// ============================================
// Provider Component
// ============================================

export interface FlowKitProviderProps {
  children: React.ReactNode
  /** Initial user */
  initialUser?: User
  /** Initial cart */
  initialCart?: Cart
  /** Initial theme */
  initialTheme?: Theme
  /** Initial custom data */
  initialData?: Record<string, any>
  /** User change callback */
  onUserChange?: (user: User | undefined) => void
  /** Cart change callback */
  onCartChange?: (cart: Cart) => void
}

export function FlowKitProvider({
  children,
  initialUser,
  initialCart,
  initialTheme,
  initialData,
  onUserChange,
  onCartChange,
}: FlowKitProviderProps) {
  const [user, setUserState] = React.useState<User | undefined>(initialUser)
  const [cart, setCartState] = React.useState<Cart>(initialCart ?? { items: [], subtotal: 0, total: 0 })
  const [theme] = React.useState<Theme | undefined>(initialTheme)
  const [data, setDataState] = React.useState<Record<string, any>>(initialData ?? {})
  
  const setUser = React.useCallback((newUser: User | undefined) => {
    setUserState(newUser)
    onUserChange?.(newUser)
  }, [onUserChange])
  
  const setCart = React.useCallback((newCart: Cart) => {
    setCartState(newCart)
    onCartChange?.(newCart)
  }, [onCartChange])
  
  const setData = React.useCallback((key: string, value: any) => {
    setDataState(prev => ({ ...prev, [key]: value }))
  }, [])
  
  const getData = React.useCallback((key: string) => {
    return data[key]
  }, [data])
  
  const clear = React.useCallback(() => {
    setUserState(undefined)
    setCartState({ items: [], subtotal: 0, total: 0 })
    setDataState({})
  }, [])
  
  const value: FlowKitContextValue = {
    user,
    cart,
    theme,
    data,
    setUser,
    setCart,
    setData,
    getData,
    clear,
  }
  
  return (
    <FlowKitContext.Provider value={value}>
      {children}
    </FlowKitContext.Provider>
  )
}

// ============================================
// Hooks
// ============================================

/**
 * Use the full FlowKit context
 */
export function useFlowKit(): FlowKitContextValue {
  return React.useContext(FlowKitContext)
}

/**
 * Access user data
 */
export function useUser(): [User | undefined, (user: User | undefined) => void] {
  const { user, setUser } = useFlowKit()
  return [user, setUser ?? (() => {})]
}

/**
 * Access cart data
 */
export function useCart(): [Cart, (cart: Cart) => void] {
  const { cart, setCart } = useFlowKit()
  return [cart ?? { items: [], subtotal: 0, total: 0 }, setCart ?? (() => {})]
}

/**
 * Cart operations
 */
export function useCartActions() {
  const [cart, setCart] = useCart()
  
  const addItem = React.useCallback((item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${Date.now()}`
    const newItems = [...cart.items, { ...item, id }]
    
    const subtotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const total = subtotal + (cart.shipping ?? 0) + (cart.tax ?? 0) - (cart.discount ?? 0)
    
    setCart({ ...cart, items: newItems, subtotal, total })
  }, [cart, setCart])
  
  const removeItem = React.useCallback((itemId: string) => {
    const newItems = cart.items.filter(i => i.id !== itemId)
    
    const subtotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const total = subtotal + (cart.shipping ?? 0) + (cart.tax ?? 0) - (cart.discount ?? 0)
    
    setCart({ ...cart, items: newItems, subtotal, total })
  }, [cart, setCart])
  
  const updateQuantity = React.useCallback((itemId: string, quantity: number) => {
    const newItems = cart.items.map(i => 
      i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
    )
    
    const subtotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const total = subtotal + (cart.shipping ?? 0) + (cart.tax ?? 0) - (cart.discount ?? 0)
    
    setCart({ ...cart, items: newItems, subtotal, total })
  }, [cart, setCart])
  
  const clearCart = React.useCallback(() => {
    setCart({ ...cart, items: [], subtotal: 0, total: 0 })
  }, [cart, setCart])
  
  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)
  
  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
  }
}

/**
 * Access custom data
 */
export function useData<T = any>(key: string, defaultValue?: T): [T, (value: T) => void] {
  const { data, setData, getData } = useFlowKit()
  
  const value = (getData?.(key) ?? defaultValue) as T
  
  const setValue = React.useCallback((newValue: T) => {
    setData?.(key, newValue)
  }, [key, setData])
  
  return [value, setValue]
}

/**
 * Access theme
 */
export function useTheme(): Theme | undefined {
  const { theme } = useFlowKit()
  return theme
}

// ============================================
// Non-React Context (for use outside React)
// ============================================

class FlowKitStore {
  private user: User | undefined
  private cart: Cart = { items: [], subtotal: 0, total: 0 }
  private data: Record<string, any> = {}
  private listeners: Set<() => void> = new Set()
  
  getUser(): User | undefined {
    return this.user
  }
  
  setUser(user: User | undefined): void {
    this.user = user
    this.notify()
  }
  
  getCart(): Cart {
    return this.cart
  }
  
  setCart(cart: Cart): void {
    this.cart = cart
    this.notify()
  }
  
  getData(key: string): any {
    return this.data[key]
  }
  
  setData(key: string, value: any): void {
    this.data[key] = value
    this.notify()
  }
  
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
  
  private notify(): void {
    this.listeners.forEach(listener => listener())
  }
  
  clear(): void {
    this.user = undefined
    this.cart = { items: [], subtotal: 0, total: 0 }
    this.data = {}
    this.notify()
  }
}

// Global store instance
export const flowKitStore = new FlowKitStore()

export default {
  FlowKitContext,
  FlowKitProvider,
  useFlowKit,
  useUser,
  useCart,
  useCartActions,
  useData,
  useTheme,
  flowKitStore,
}
