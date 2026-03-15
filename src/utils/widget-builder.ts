/**
 * FlowKit - Widget Builder
 * 
 * Fluent API for building widgets programmatically.
 * Type-safe, chainable, easy to use.
 */

import type { Widget, WidgetAction } from '../types'

// ============================================
// Widget Builder Class
// ============================================

class WidgetBuilder<W extends Widget = Widget> {
  protected widget: Partial<W> = {}
  
  constructor(type: W['type']) {
    this.widget.type = type as any
  }
  
  /**
   * Set a property
   */
  set<K extends keyof W>(key: K, value: W[K]): this {
    (this.widget as any)[key] = value
    return this
  }
  
  /**
   * Set multiple properties
   */
  setProps(props: Partial<W>): this {
    Object.assign(this.widget, props)
    return this
  }
  
  /**
   * Add child widget
   */
  child(child: Widget | WidgetBuilder): this {
    if (!this.widget.children) {
      this.widget.children = []
    }
    this.widget.children.push(isBuilder(child) ? child.build() : child)
    return this
  }
  
  /**
   * Add multiple child widgets
   */
  children(...children: (Widget | WidgetBuilder)[]): this {
    if (!this.widget.children) {
      this.widget.children = []
    }
    this.widget.children.push(...children.map(c => isBuilder(c) ? c.build() : c))
    return this
  }
  
  /**
   * Set onClickAction
   */
  action(type: string, data?: any): this {
    this.widget.onClickAction = { type, data }
    return this
  }
  
  /**
   * Add key
   */
  key(key: string): this {
    this.widget.key = key
    return this
  }
  
  /**
   * Build the widget
   */
  build(): W {
    return { ...this.widget } as W
  }
  
  /**
   * Convert to JSON
   */
  toJSON(): string {
    return JSON.stringify(this.widget)
  }
}

// ============================================
// Type Guards
// ============================================

function isBuilder(obj: any): obj is WidgetBuilder {
  return obj && typeof obj.build === 'function'
}

// ============================================
// Specific Widget Builders
// ============================================

export class CardBuilder extends WidgetBuilder<import('../types').CardWidget> {
  constructor() {
    super('Card')
  }
  
  padding(value: number): this {
    return this.set('padding', value)
  }
  
  background(color: string): this {
    return this.set('background', color)
  }
  
  radius(value: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'): this {
    return this.set('radius', value)
  }
  
  shadow(value: 'none' | 'sm' | 'md' | 'lg' | 'xl'): this {
    return this.set('shadow', value)
  }
  
  border(size: number, color: string): this {
    return this.set('border', { size, color })
  }
}

export class RowBuilder extends WidgetBuilder<import('../types').RowWidget> {
  constructor() {
    super('Row')
  }
  
  gap(value: number): this {
    return this.set('gap', value)
  }
  
  justify(value: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'): this {
    return this.set('justify', value)
  }
  
  align(value: 'start' | 'center' | 'end' | 'stretch' | 'baseline'): this {
    return this.set('align', value)
  }
  
  wrap(): this {
    return this.set('wrap', true)
  }
}

export class ColBuilder extends WidgetBuilder<import('../types').ColWidget> {
  constructor() {
    super('Col')
  }
  
  gap(value: number): this {
    return this.set('gap', value)
  }
  
  align(value: 'start' | 'center' | 'end' | 'stretch'): this {
    return this.set('align', value)
  }
}

export class TextBuilder extends WidgetBuilder<import('../types').TextWidget> {
  constructor(value: string) {
    super('Text')
    this.widget.value = value
  }
  
  size(value: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'): this {
    return this.set('size', value)
  }
  
  weight(value: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'): this {
    return this.set('weight', value)
  }
  
  color(value: string): this {
    return this.set('color', value)
  }
  
  italic(): this {
    return this.set('italic', true)
  }
  
  underline(): this {
    return this.set('underline', true)
  }
  
  strikeThrough(): this {
    return this.set('lineThrough', true)
  }
  
  align(value: 'left' | 'center' | 'right' | 'justify'): this {
    return this.set('textAlign', value)
  }
}

export class TitleBuilder extends WidgetBuilder<import('../types').TitleWidget> {
  constructor(value: string) {
    super('Title')
    this.widget.value = value
  }
  
  size(value: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'): this {
    return this.set('size', value)
  }
  
  level(value: 1 | 2 | 3 | 4 | 5 | 6): this {
    return this.set('level', value)
  }
  
  color(value: string): this {
    return this.set('color', value)
  }
}

export class ButtonBuilder extends WidgetBuilder<import('../types').ButtonWidget> {
  constructor(label: string) {
    super('Button')
    this.widget.label = label
  }
  
  style(value: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger'): this {
    return this.set('style', value)
  }
  
  variant(value: 'solid' | 'soft' | 'outline' | 'ghost'): this {
    return this.set('variant', value)
  }
  
  color(value: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'): this {
    return this.set('color', value)
  }
  
  size(value: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): this {
    return this.set('size', value)
  }
  
  block(): this {
    return this.set('block', true)
  }
  
  disabled(): this {
    return this.set('disabled', true)
  }
  
  loading(): this {
    return this.set('loading', true)
  }
  
  iconStart(icon: string): this {
    return this.set('iconStart', icon)
  }
  
  iconEnd(icon: string): this {
    return this.set('iconEnd', icon)
  }
  
  onClick(type: string, data?: any): this {
    return this.set('onClickAction', { type, data })
  }
}

export class ProductCardBuilder extends WidgetBuilder<import('../types').ProductCardWidget> {
  constructor(productId: string) {
    super('ProductCard')
    this.widget.productId = productId
  }
  
  title(value: string): this {
    return this.set('title', value)
  }
  
  subtitle(value: string): this {
    return this.set('subtitle', value)
  }
  
  image(url: string): this {
    return this.set('image', url)
  }
  
  price(value: number): this {
    return this.set('price', value)
  }
  
  originalPrice(value: number): this {
    return this.set('originalPrice', value)
  }
  
  currency(value: string): this {
    return this.set('currency', value)
  }
  
  rating(value: number): this {
    return this.set('rating', value)
  }
  
  reviews(value: number): this {
    return this.set('reviews', value)
  }
  
  badge(value: string): this {
    return this.set('badge', value)
  }
  
  inStock(value: boolean): this {
    return this.set('inStock', value)
  }
  
  addToCart(productId?: string): this {
    return this.set('onAddToCartAction', { type: 'add_to_cart', data: { productId: productId ?? this.widget.productId } })
  }
  
  onClick(productId?: string): this {
    return this.set('onClickAction', { type: 'view_product', data: { productId: productId ?? this.widget.productId } })
  }
}

export class OrderSummaryBuilder extends WidgetBuilder<import('../types').OrderSummaryWidget> {
  constructor() {
    super('OrderSummary')
    this.widget.items = []
  }
  
  title(value: string): this {
    return this.set('title', value)
  }
  
  addItem(item: { name: string; quantity: number; price: number; image?: string }): this {
    this.widget.items!.push(item)
    return this
  }
  
  subtotal(value: number): this {
    return this.set('subtotal', value)
  }
  
  shipping(value: number): this {
    return this.set('shipping', value)
  }
  
  freeShipping(): this {
    return this.set('shipping', 0)
  }
  
  tax(value: number): this {
    return this.set('tax', value)
  }
  
  discount(value: number): this {
    return this.set('discount', value)
  }
  
  total(value: number): this {
    return this.set('total', value)
  }
  
  currency(value: string): this {
    return this.set('currency', value)
  }
}

export class LoginBuilder extends WidgetBuilder<import('../types').LoginWidget> {
  constructor() {
    super('Login')
    this.widget.fields = []
  }
  
  title(value: string): this {
    return this.set('title', value)
  }
  
  subtitle(value: string): this {
    return this.set('subtitle', value)
  }
  
  addField(field: { name: string; type: 'email' | 'password' | 'text'; placeholder?: string; required?: boolean }): this {
    this.widget.fields!.push(field)
    return this
  }
  
  email(placeholder: string = 'Email'): this {
    return this.addField({ name: 'email', type: 'email', placeholder, required: true })
  }
  
  password(placeholder: string = 'Password'): this {
    return this.addField({ name: 'password', type: 'password', placeholder, required: true })
  }
  
  submitLabel(value: string): this {
    return this.set('submitLabel', value)
  }
  
  onSubmit(): this {
    return this.set('onSubmitAction', { type: 'login' })
  }
}

export class FAQBuilder extends WidgetBuilder<import('../types').FAQWidget> {
  constructor() {
    super('FAQ')
    this.widget.items = []
  }
  
  title(value: string): this {
    return this.set('title', value)
  }
  
  addItem(item: { id: string; question: string; answer: string; category?: string }): this {
    this.widget.items!.push(item)
    return this
  }
  
  question(id: string, question: string, answer: string, category?: string): this {
    return this.addItem({ id, question, answer, category })
  }
}

// ============================================
// Factory Functions (Fluent API)
// ============================================

/**
 * Create a widget builder
 */
export function widget<W extends Widget>(type: W['type']): WidgetBuilder<W> {
  return new WidgetBuilder(type)
}

// Layout
export const card = () => new CardBuilder()
export const row = () => new RowBuilder()
export const col = () => new ColBuilder()
export const box = () => widget('Box')
export const spacer = () => widget('Spacer')
export const divider = () => widget('Divider')

// Typography
export const text = (value: string) => new TextBuilder(value)
export const title = (value: string) => new TitleBuilder(value)
export const caption = (value: string) => widget('Caption').set('value', value)
export const label = (value: string) => widget('Label').set('value', value)
export const markdown = (value: string) => widget('Markdown').set('value', value)

// Interactive
export const button = (label: string) => new ButtonBuilder(label)
export const badge = (label: string) => widget('Badge').set('label', label)
export const chip = (label: string) => widget('Chip').set('label', label)
export const toggle = (name: string) => widget('Toggle').set('name', name)
export const checkbox = (name: string) => widget('Checkbox').set('name', name)
export const radio = (name: string) => widget('Radio').set('name', name)
export const select = (name: string) => widget('Select').set('name', name)
export const input = (name: string) => widget('Input').set('name', name)
export const textarea = (name: string) => widget('Textarea').set('name', name)
export const datepicker = (name: string) => widget('DatePicker').set('name', name)
export const slider = (name: string) => widget('Slider').set('name', name)
export const rating = (name: string) => widget('Rating').set('name', name)
export const upload = (name: string) => widget('Upload').set('name', name)

// E-Commerce
export const productCard = (productId: string) => new ProductCardBuilder(productId)
export const productGrid = () => widget('ProductGrid')
export const orderSummary = () => new OrderSummaryBuilder()
export const checkout = () => widget('Checkout')
export const paymentMethod = () => widget('PaymentMethod')
export const couponInput = () => widget('CouponInput')
export const quantitySelector = (name: string) => widget('QuantitySelector').set('name', name)
export const stockIndicator = (stock: number) => widget('StockIndicator').set('stock', stock)
export const deliveryEstimate = () => widget('DeliveryEstimate')

// Auth
export const login = () => new LoginBuilder()
export const verifyOTP = () => widget('VerifyOTP')
export const register = () => widget('Register')

// Support
export const faq = () => new FAQBuilder()
export const contactForm = () => widget('ContactForm')
export const terms = () => widget('Terms')

// Feedback
export const alert = () => widget('Alert')
export const toast = () => widget('Toast')
export const confirmation = () => widget('Confirmation')
export const success = () => widget('Success')
export const error = () => widget('Error')
export const progress = () => widget('Progress')
export const spinner = () => widget('Spinner')
export const circularProgress = () => widget('CircularProgress')

// Advanced
export const calendar = () => widget('Calendar')
export const timeline = () => widget('Timeline')
export const kanban = () => widget('Kanban')
export const stats = () => widget('Stats')
export const comments = () => widget('Comments')
export const countdown = () => widget('Countdown')
export const chart = () => widget('Chart')
export const map = () => widget('Map')
export const qrcode = (value: string) => widget('QRCode').set('value', value)
export const signaturePad = (name: string) => widget('SignaturePad').set('name', name)
export const colorPicker = (name: string) => widget('ColorPicker').set('name', name)

// ============================================
// Quick Build Helper
// ============================================

/**
 * Quick build a widget from type and props
 */
export function build(type: Widget['type'], props: Partial<Widget> = {}): Widget {
  return { type, ...props } as Widget
}

/**
 * Build multiple widgets
 */
export function buildAll(...builders: (WidgetBuilder | Widget)[]): Widget[] {
  return builders.map(b => isBuilder(b) ? b.build() : b)
}

export default {
  widget,
  // Layout
  card, row, col, box, spacer, divider,
  // Typography
  text, title, caption, label, markdown,
  // Interactive
  button, badge, chip, toggle, checkbox, radio, select, input, textarea,
  datepicker, slider, rating, upload,
  // E-Commerce
  productCard, productGrid, orderSummary, checkout, paymentMethod,
  couponInput, quantitySelector, stockIndicator, deliveryEstimate,
  // Auth
  login, verifyOTP, register,
  // Support
  faq, contactForm, terms,
  // Feedback
  alert, toast, confirmation, success, error, progress, spinner, circularProgress,
  // Advanced
  calendar, timeline, kanban, stats, comments, countdown, chart, map,
  qrcode, signaturePad, colorPicker,
  // Helpers
  build, buildAll,
}
