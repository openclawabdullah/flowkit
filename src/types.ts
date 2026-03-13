/**
 * FlowKit - Widget Schema Types
 * 
 * A complete, open-source widget system for chat interfaces.
 * Inspired by ChatKit but 100% independent and customizable.
 */

// ============================================
// Core Types
// ============================================

export interface WidgetAction {
  type: string
  data?: Record<string, any>
  widgetId?: string
}

export interface BaseWidget {
  type: string
  children?: Widget[]
  key?: string
}

// ============================================
// Layout Components
// ============================================

export interface CardWidget extends BaseWidget {
  type: 'Card'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: number
  background?: string
  border?: { size: number; color: string }
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  onClickAction?: WidgetAction
  status?: { text: string; icon: string; color?: string }
  asForm?: boolean
  confirm?: { label: string; action: WidgetAction }
  cancel?: { label: string; action: WidgetAction }
  header?: Widget
  footer?: Widget
}

export interface RowWidget extends BaseWidget {
  type: 'Row'
  gap?: number | string
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse'
}

export interface ColWidget extends BaseWidget {
  type: 'Col'
  gap?: number | string
  align?: 'start' | 'center' | 'end' | 'stretch'
  flex?: number | string
}

export interface BoxWidget extends BaseWidget {
  type: 'Box'
  width?: number | string
  height?: number | string
  padding?: number | string
  margin?: number | string
  background?: string
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  border?: { size: number; color: string; style?: 'solid' | 'dashed' | 'dotted' }
  direction?: 'row' | 'column'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  align?: 'start' | 'center' | 'end'
  wrap?: 'wrap' | 'nowrap'
  flex?: number | string
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
}

export interface GridWidget extends BaseWidget {
  type: 'Grid'
  columns?: number | string
  gap?: number | string
  justifyItems?: 'start' | 'center' | 'end' | 'stretch'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
}

// ============================================
// Typography Components
// ============================================

export interface TextWidget extends BaseWidget {
  type: 'Text'
  value: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  lineThrough?: boolean
  underline?: boolean
  italic?: boolean
  truncate?: boolean | number
  editable?: {
    name: string
    placeholder?: string
    required?: boolean
    type?: 'text' | 'email' | 'tel' | 'number' | 'password'
    multiline?: boolean
    rows?: number
    maxLength?: number
  }
}

export interface TitleWidget extends BaseWidget {
  type: 'Title'
  value: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: string
  textAlign?: 'left' | 'center' | 'right'
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export interface CaptionWidget extends BaseWidget {
  type: 'Caption'
  value: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: string
  textAlign?: 'left' | 'center' | 'right'
}

export interface MarkdownWidget extends BaseWidget {
  type: 'Markdown'
  value: string
  size?: 'sm' | 'md' | 'lg'
}

// ============================================
// Interactive Components
// ============================================

export interface ButtonWidget extends BaseWidget {
  type: 'Button'
  label: string
  style?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger'
  variant?: 'solid' | 'soft' | 'outline' | 'ghost'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  block?: boolean
  disabled?: boolean
  loading?: boolean
  iconStart?: string
  iconEnd?: string
  iconOnly?: boolean
  onClickAction?: WidgetAction
}

export interface BadgeWidget extends BaseWidget {
  type: 'Badge'
  label: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark'
  variant?: 'solid' | 'soft' | 'outline'
  pill?: boolean
  dot?: boolean
}

export interface ChipWidget extends BaseWidget {
  type: 'Chip'
  label: string
  selected?: boolean
  icon?: string
  avatar?: string
  onClickAction?: WidgetAction
  onDeleteAction?: WidgetAction
}

export interface ToggleWidget extends BaseWidget {
  type: 'Toggle'
  name: string
  checked?: boolean
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  onChangeAction?: WidgetAction
}

export interface CheckboxWidget extends BaseWidget {
  type: 'Checkbox'
  name: string
  checked?: boolean
  disabled?: boolean
  label?: string
  indeterminate?: boolean
  onChangeAction?: WidgetAction
}

export interface RadioWidget extends BaseWidget {
  type: 'Radio'
  name: string
  value: string
  checked?: boolean
  disabled?: boolean
  label?: string
  onChangeAction?: WidgetAction
}

export interface SelectWidget extends BaseWidget {
  type: 'Select'
  name: string
  placeholder?: string
  options: Array<{ label: string; value: string; disabled?: boolean }>
  value?: string
  variant?: 'outline' | 'solid' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  searchable?: boolean
  multiple?: boolean
  onChangeAction?: WidgetAction
}

export interface DatePickerWidget extends BaseWidget {
  type: 'DatePicker'
  name: string
  placeholder?: string
  value?: string
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  min?: string
  max?: string
  format?: string
  onChangeAction?: WidgetAction
}

export interface TimePickerWidget extends BaseWidget {
  type: 'TimePicker'
  name: string
  value?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  format?: '12h' | '24h'
  onChangeAction?: WidgetAction
}

export interface SliderWidget extends BaseWidget {
  type: 'Slider'
  name: string
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showValue?: boolean
  onChangeAction?: WidgetAction
}

export interface RatingWidget extends BaseWidget {
  type: 'Rating'
  name: string
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  allowHalf?: boolean
  onChangeAction?: WidgetAction
}

export interface UploadWidget extends BaseWidget {
  type: 'Upload'
  name: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  maxSize?: number
  files?: Array<{ name: string; size: number; type: string; url?: string }>
  onUploadAction?: WidgetAction
  onRemoveAction?: WidgetAction
}

// ============================================
// Form Components
// ============================================

export interface FormWidget extends BaseWidget {
  type: 'Form'
  name?: string
  method?: 'GET' | 'POST'
  onSubmitAction?: WidgetAction
  submitLabel?: string
  resetLabel?: string
  loading?: boolean
}

export interface FieldWidget extends BaseWidget {
  type: 'Field'
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

export interface FieldGroupWidget extends BaseWidget {
  type: 'FieldGroup'
  label?: string
  error?: string
  direction?: 'row' | 'col'
}

// ============================================
// Media Components
// ============================================

export interface ImageWidget extends BaseWidget {
  type: 'Image'
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  fallback?: string
  lazy?: boolean
}

export interface IconWidget extends BaseWidget {
  type: 'Icon'
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  color?: string
  spin?: boolean
}

export interface AvatarWidget extends BaseWidget {
  type: 'Avatar'
  src?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shape?: 'circle' | 'square'
}

export interface VideoWidget extends BaseWidget {
  type: 'Video'
  src: string
  poster?: string
  width?: number | string
  height?: number | string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
}

export interface AudioWidget extends BaseWidget {
  type: 'Audio'
  src: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
}

// ============================================
// Layout Helpers
// ============================================

export interface SpacerWidget extends BaseWidget {
  type: 'Spacer'
  minSize?: number
  size?: number | string
}

export interface DividerWidget extends BaseWidget {
  type: 'Divider'
  spacing?: number
  flush?: boolean
  vertical?: boolean
  color?: string
  style?: 'solid' | 'dashed' | 'dotted'
}

export interface CollapseWidget extends BaseWidget {
  type: 'Collapse'
  title: string
  open?: boolean
  icon?: string
  onChangeAction?: WidgetAction
}

export interface TabsWidget extends BaseWidget {
  type: 'Tabs'
  tabs: Array<{ id: string; label: string; icon?: string }>
  activeTab?: string
  onChangeAction?: WidgetAction
}

export interface AccordionWidget extends BaseWidget {
  type: 'Accordion'
  items: Array<{
    id: string
    title: string
    icon?: string
    open?: boolean
  }>
  allowMultiple?: boolean
  onChangeAction?: WidgetAction
}

// ============================================
// List Components
// ============================================

export interface ListViewWidget extends BaseWidget {
  type: 'ListView'
  limit?: number
  gap?: number
  divider?: boolean
  loading?: boolean
  emptyText?: string
  onLoadMoreAction?: WidgetAction
}

export interface ListViewItemWidget extends BaseWidget {
  type: 'ListViewItem'
  gap?: number
  padding?: number
  background?: string
  border?: { size: number; color: string }
  onClickAction?: WidgetAction
  selected?: boolean
  disabled?: boolean
}

export interface TableWidget extends BaseWidget {
  type: 'Table'
  columns: Array<{ key: string; label: string; width?: number | string; align?: 'left' | 'center' | 'right' }>
  rows: Array<Record<string, any>>
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// ============================================
// Navigation Components
// ============================================

export interface BreadcrumbWidget extends BaseWidget {
  type: 'Breadcrumb'
  items: Array<{ label: string; onClickAction?: WidgetAction }>
  separator?: string
}

export interface StepperWidget extends BaseWidget {
  type: 'Stepper'
  steps: Array<{ label: string; description?: string; icon?: string }>
  activeStep?: number
  completed?: number[]
  orientation?: 'horizontal' | 'vertical'
  onChangeAction?: WidgetAction
}

export interface PaginationWidget extends BaseWidget {
  type: 'Pagination'
  current?: number
  total?: number
  pageSize?: number
  showSizeChanger?: boolean
  onChangeAction?: WidgetAction
}

// ============================================
// Feedback Components
// ============================================

export interface ProgressWidget extends BaseWidget {
  type: 'Progress'
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  showLabel?: boolean
  striped?: boolean
  animated?: boolean
}

export interface SpinnerWidget extends BaseWidget {
  type: 'Spinner'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

export interface SkeletonWidget extends BaseWidget {
  type: 'Skeleton'
  variant?: 'text' | 'circular' | 'rectangular'
  width?: number | string
  height?: number | string
  animation?: 'pulse' | 'wave' | 'none'
}

export interface AlertWidget extends BaseWidget {
  type: 'Alert'
  severity?: 'success' | 'info' | 'warning' | 'error'
  title?: string
  message: string
  icon?: boolean
  closable?: boolean
  onCloseAction?: WidgetAction
}

export interface ToastWidget extends BaseWidget {
  type: 'Toast'
  severity?: 'success' | 'info' | 'warning' | 'error'
  message: string
  duration?: number
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

// ============================================
// Specialized Business Widgets
// ============================================

// Auth Widgets
export interface LoginWidget extends BaseWidget {
  type: 'Login'
  title?: string
  subtitle?: string
  fields: Array<{
    name: string
    type: 'email' | 'password' | 'text'
    placeholder?: string
    required?: boolean
    icon?: string
  }>
  submitLabel?: string
  forgotPasswordAction?: WidgetAction
  signupAction?: WidgetAction
  socialLogins?: Array<{ provider: string; label: string; onClickAction: WidgetAction }>
  onSubmitAction?: WidgetAction
}

export interface VerifyOTPWidget extends BaseWidget {
  type: 'VerifyOTP'
  title?: string
  subtitle?: string
  length?: number
  resendAction?: WidgetAction
  verifyAction?: WidgetAction
  onChangeAction?: WidgetAction
}

export interface RegisterWidget extends BaseWidget {
  type: 'Register'
  title?: string
  fields: Array<{
    name: string
    type: 'text' | 'email' | 'password' | 'tel'
    label?: string
    placeholder?: string
    required?: boolean
  }>
  submitLabel?: string
  loginAction?: WidgetAction
  termsAction?: WidgetAction
  onSubmitAction?: WidgetAction
}

export interface ForgotPasswordWidget extends BaseWidget {
  type: 'ForgotPassword'
  title?: string
  subtitle?: string
  submitLabel?: string
  backToLoginAction?: WidgetAction
  onSubmitAction?: WidgetAction
}

export interface ResetPasswordWidget extends BaseWidget {
  type: 'ResetPassword'
  title?: string
  subtitle?: string
  submitLabel?: string
  onSubmitAction?: WidgetAction
}

// Address Widgets
export interface AddressFormWidget extends BaseWidget {
  type: 'AddressForm'
  title?: string
  fields?: {
    fullName?: boolean
    phone?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    country?: boolean
    isDefault?: boolean
  }
  submitLabel?: string
  cancelAction?: WidgetAction
  onSubmitAction?: WidgetAction
}

export interface AddressListWidget extends BaseWidget {
  type: 'AddressList'
  title?: string
  addresses: Array<{
    id: string
    name: string
    phone?: string
    street: string
    city: string
    state?: string
    zip?: string
    country?: string
    isDefault?: boolean
  }>
  onSelectAction?: WidgetAction
  onEditAction?: WidgetAction
  onDeleteAction?: WidgetAction
  onAddAction?: WidgetAction
}

// Invoice Widgets
export interface InvoiceWidget extends BaseWidget {
  type: 'Invoice'
  invoiceNumber: string
  date: string
  dueDate?: string
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
  from: { name: string; address?: string; email?: string }
  to: { name: string; address?: string; email?: string }
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  subtotal: number
  tax?: number
  discount?: number
  total: number
  currency?: string
  notes?: string
  payAction?: WidgetAction
  downloadAction?: WidgetAction
}

export interface InvoiceListWidget extends BaseWidget {
  type: 'InvoiceList'
  invoices: Array<{
    id: string
    number: string
    date: string
    amount: number
    status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
  }>
  onViewAction?: WidgetAction
  onPayAction?: WidgetAction
  onDownloadAction?: WidgetAction
}

// Checkout Widgets
export interface CheckoutWidget extends BaseWidget {
  type: 'Checkout'
  steps?: Array<{ id: string; label: string }>
  currentStep?: string
  shippingAddress?: Widget
  billingAddress?: Widget
  paymentMethod?: Widget
  orderSummary?: Widget
  onNextAction?: WidgetAction
  onBackAction?: WidgetAction
  onSubmitAction?: WidgetAction
}

export interface PaymentMethodWidget extends BaseWidget {
  type: 'PaymentMethod'
  title?: string
  methods: Array<{
    id: string
    type: 'card' | 'bank' | 'wallet' | 'cod'
    label: string
    icon?: string
    details?: string
    selected?: boolean
  }>
  onSelectAction?: WidgetAction
  onAddAction?: WidgetAction
}

// Order Widgets
export interface OrderSummaryWidget extends BaseWidget {
  type: 'OrderSummary'
  title?: string
  items: Array<{
    name: string
    quantity: number
    price: number
    image?: string
    options?: Record<string, string>
  }>
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  total: number
  currency?: string
  promoCode?: string
  onApplyPromoAction?: WidgetAction
}

export interface OrderTrackingWidget extends BaseWidget {
  type: 'OrderTracking'
  orderId: string
  status: 'processing' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled'
  estimatedDelivery?: string
  timeline: Array<{
    status: string
    timestamp: string
    description?: string
    location?: string
    completed: boolean
    current: boolean
  }>
  onContactAction?: WidgetAction
  onTrackAction?: WidgetAction
}

export interface OrderHistoryWidget extends BaseWidget {
  type: 'OrderHistory'
  orders: Array<{
    id: string
    date: string
    status: string
    total: number
    items: number
  }>
  onViewAction?: WidgetAction
  onReorderAction?: WidgetAction
}

// Support Widgets
export interface ContactFormWidget extends BaseWidget {
  type: 'ContactForm'
  title?: string
  subtitle?: string
  fields?: Array<{
    name: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
    label?: string
    placeholder?: string
    required?: boolean
    options?: Array<{ label: string; value: string }>
  }>
  submitLabel?: string
  onSubmitAction?: WidgetAction
}

export interface FAQWidget extends BaseWidget {
  type: 'FAQ'
  title?: string
  categories?: Array<{ id: string; label: string }>
  activeCategory?: string
  items: Array<{
    id: string
    question: string
    answer: string
    category?: string
    open?: boolean
  }>
  searchPlaceholder?: string
  onSearchAction?: WidgetAction
  onToggleAction?: WidgetAction
  onCategoryChangeAction?: WidgetAction
}

export interface TermsWidget extends BaseWidget {
  type: 'Terms'
  title?: string
  version?: string
  lastUpdated?: string
  sections: Array<{
    title: string
    content: string
  }>
  onAcceptAction?: WidgetAction
  onDeclineAction?: WidgetAction
}

export interface PrivacyWidget extends BaseWidget {
  type: 'Privacy'
  title?: string
  version?: string
  lastUpdated?: string
  sections: Array<{
    title: string
    content: string
  }>
  onAcceptAction?: WidgetAction
}

// Category Widgets
export interface CategoryListWidget extends BaseWidget {
  type: 'CategoryList'
  title?: string
  layout?: 'grid' | 'list' | 'carousel'
  categories: Array<{
    id: string
    name: string
    image?: string
    icon?: string
    count?: number
    description?: string
  }>
  onSelectAction?: WidgetAction
}

export interface CategoryTreeWidget extends BaseWidget {
  type: 'CategoryTree'
  title?: string
  categories: Array<{
    id: string
    name: string
    icon?: string
    children?: Array<{
      id: string
      name: string
      count?: number
    }>
  }>
  activeCategory?: string
  activeSubcategory?: string
  onSelectAction?: WidgetAction
}

export interface SubcategoryWidget extends BaseWidget {
  type: 'Subcategory'
  parentId: string
  title?: string
  layout?: 'grid' | 'list'
  subcategories: Array<{
    id: string
    name: string
    image?: string
    count?: number
  }>
  onSelectAction?: WidgetAction
  onBackAction?: WidgetAction
}

// Confirmation Widgets
export interface ConfirmationWidget extends BaseWidget {
  type: 'Confirmation'
  icon?: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  details?: Array<{ label: string; value: string }>
  primaryAction?: { label: string; onClickAction: WidgetAction }
  secondaryAction?: { label: string; onClickAction: WidgetAction }
}

export interface SuccessWidget extends BaseWidget {
  type: 'Success'
  title?: string
  message?: string
  icon?: string
  action?: { label: string; onClickAction: WidgetAction }
}

export interface ErrorWidget extends BaseWidget {
  type: 'Error'
  title?: string
  message?: string
  code?: string
  retryAction?: WidgetAction
  supportAction?: WidgetAction
}

// Product Widgets
export interface ProductCardWidget extends BaseWidget {
  type: 'ProductCard'
  productId: string
  image: string
  title: string
  subtitle?: string
  price: number
  originalPrice?: number
  currency?: string
  rating?: number
  reviews?: number
  badge?: string
  inStock?: boolean
  onAddToCartAction?: WidgetAction
  onWishlistAction?: WidgetAction
  onClickAction?: WidgetAction
}

export interface ProductGridWidget extends BaseWidget {
  type: 'ProductGrid'
  title?: string
  columns?: 2 | 3 | 4
  products: Array<ProductCardWidget>
  loading?: boolean
  onLoadMoreAction?: WidgetAction
}

export interface ProductDetailWidget extends BaseWidget {
  type: 'ProductDetail'
  images: Array<{ src: string; alt?: string }>
  title: string
  description?: string
  price: number
  originalPrice?: number
  currency?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  variants?: Array<{ name: string; options: string[] }>
  selectedVariant?: Record<string, string>
  quantity?: number
  features?: string[]
  specifications?: Array<{ label: string; value: string }>
  onVariantChangeAction?: WidgetAction
  onQuantityChangeAction?: WidgetAction
  onAddToCartAction?: WidgetAction
  onBuyNowAction?: WidgetAction
}

// Search Widgets
export interface SearchWidget extends BaseWidget {
  type: 'Search'
  placeholder?: string
  value?: string
  suggestions?: Array<{ text: string; onClickAction?: WidgetAction }>
  recentSearches?: string[]
  onSearchAction?: WidgetAction
  onClearAction?: WidgetAction
}

export interface SearchResultsWidget extends BaseWidget {
  type: 'SearchResults'
  query: string
  results: Array<{
    type: 'product' | 'category' | 'page'
    title: string
    description?: string
    image?: string
    onClickAction?: WidgetAction
  }>
  totalResults?: number
  onLoadMoreAction?: WidgetAction
}

// Notification Widgets
export interface NotificationWidget extends BaseWidget {
  type: 'Notification'
  title?: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  timestamp?: string
  read?: boolean
  onDismissAction?: WidgetAction
  onClickAction?: WidgetAction
}

export interface NotificationListWidget extends BaseWidget {
  type: 'NotificationList'
  title?: string
  notifications: Array<NotificationWidget>
  onMarkAllReadAction?: WidgetAction
  onClearAllAction?: WidgetAction
}

// ============================================
// Union Type
// ============================================

export type Widget = 
  // Layout
  | CardWidget
  | RowWidget
  | ColWidget
  | BoxWidget
  | GridWidget
  // Typography
  | TextWidget
  | TitleWidget
  | CaptionWidget
  | MarkdownWidget
  // Interactive
  | ButtonWidget
  | BadgeWidget
  | ChipWidget
  | ToggleWidget
  | CheckboxWidget
  | RadioWidget
  | SelectWidget
  | DatePickerWidget
  | TimePickerWidget
  | SliderWidget
  | RatingWidget
  | UploadWidget
  // Form
  | FormWidget
  | FieldWidget
  | FieldGroupWidget
  // Media
  | ImageWidget
  | IconWidget
  | AvatarWidget
  | VideoWidget
  | AudioWidget
  // Layout Helpers
  | SpacerWidget
  | DividerWidget
  | CollapseWidget
  | TabsWidget
  | AccordionWidget
  // List
  | ListViewWidget
  | ListViewItemWidget
  | TableWidget
  // Navigation
  | BreadcrumbWidget
  | StepperWidget
  | PaginationWidget
  // Feedback
  | ProgressWidget
  | SpinnerWidget
  | SkeletonWidget
  | AlertWidget
  | ToastWidget
  // Auth
  | LoginWidget
  | VerifyOTPWidget
  | RegisterWidget
  | ForgotPasswordWidget
  | ResetPasswordWidget
  // Address
  | AddressFormWidget
  | AddressListWidget
  // Invoice
  | InvoiceWidget
  | InvoiceListWidget
  // Checkout
  | CheckoutWidget
  | PaymentMethodWidget
  // Order
  | OrderSummaryWidget
  | OrderTrackingWidget
  | OrderHistoryWidget
  // Support
  | ContactFormWidget
  | FAQWidget
  | TermsWidget
  | PrivacyWidget
  // Category
  | CategoryListWidget
  | CategoryTreeWidget
  | SubcategoryWidget
  // Confirmation
  | ConfirmationWidget
  | SuccessWidget
  | ErrorWidget
  // Product
  | ProductCardWidget
  | ProductGridWidget
  | ProductDetailWidget
  // Search
  | SearchWidget
  | SearchResultsWidget
  // Notification
  | NotificationWidget
  | NotificationListWidget

// ============================================
// Streaming & Events
// ============================================

export interface WidgetStreamEvent {
  type: 'widget'
  widget: Widget
}

export interface TextStreamEvent {
  type: 'text'
  text: string
  done?: boolean
}

export interface StatusStreamEvent {
  type: 'status'
  status: 'typing' | 'thinking' | 'idle' | 'error'
}

export type StreamEvent = WidgetStreamEvent | TextStreamEvent | StatusStreamEvent

// ============================================
// Conversation Types
// ============================================

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string | Widget[]
  timestamp: number
  metadata?: Record<string, any>
}

export interface ConversationContext {
  conversationId?: string
  messages?: Message[]
  metadata?: Record<string, any>
  userId?: string
  sessionId?: string
}

// ============================================
// Adapter Interface
// ============================================

export interface FlowKitAdapter {
  sendMessage(
    message: string,
    context?: ConversationContext
  ): AsyncGenerator<StreamEvent>
  
  handleAction?(
    action: WidgetAction
  ): AsyncGenerator<StreamEvent>
  
  cancel?(): Promise<void>
}

// ============================================
// Theme Types
// ============================================

export interface ThemeColors {
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
  info: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
}

export interface Theme {
  colors: ThemeColors
  fontFamily?: string
  borderRadius?: {
    sm: string
    md: string
    lg: string
    full: string
  }
  shadows?: {
    sm: string
    md: string
    lg: string
  }
}

export const defaultTheme: Theme = {
  colors: {
    primary: '#10a37f',      // OpenAI green
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: '#ffffff',
    surface: '#f7f7f8',
    text: '#202123',
    textSecondary: '#6b7280',
    border: '#e5e5e5',
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
}
