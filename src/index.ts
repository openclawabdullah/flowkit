/**
 * FlowKit - Open Source Widget System for Chat Interfaces
 * 
 * A beautiful, open-source widget system for chat interfaces.
 * Like ChatKit, but yours.
 * 
 * @packageDocumentation
 */

// Main Components
export { Chat, type ChatProps } from './Chat'
export { WidgetRenderer } from './WidgetRenderer'

// Adapters
export { DemoAdapter } from './DemoAdapter'

// Types
export type {
  // Core
  Widget,
  WidgetAction,
  StreamEvent,
  Message,
  ConversationContext,
  FlowKitAdapter,
  
  // Layout
  CardWidget,
  RowWidget,
  ColWidget,
  BoxWidget,
  GridWidget,
  SpacerWidget,
  DividerWidget,
  
  // Typography
  TextWidget,
  TitleWidget,
  CaptionWidget,
  MarkdownWidget,
  LabelWidget,
  
  // Interactive
  ButtonWidget,
  BadgeWidget,
  ChipWidget,
  ToggleWidget,
  CheckboxWidget,
  RadioWidget,
  SelectWidget,
  DatePickerWidget,
  TimePickerWidget,
  SliderWidget,
  RatingWidget,
  UploadWidget,
  InputWidget,
  TextareaWidget,
  
  // Form
  FormWidget,
  FieldWidget,
  FieldGroupWidget,
  
  // Media
  ImageWidget,
  IconWidget,
  AvatarWidget,
  VideoWidget,
  AudioWidget,
  ChartWidget,
  MapWidget,
  QRCodeWidget,
  FilePreviewWidget,
  CodeWidget,
  AudioPlayerWidget,
  VideoPlayerWidget,
  
  // Lists
  ListViewWidget,
  ListViewItemWidget,
  TableWidget,
  
  // Navigation
  BreadcrumbWidget,
  StepperWidget,
  PaginationWidget,
  
  // Feedback
  ProgressWidget,
  CircularProgressWidget,
  SpinnerWidget,
  SkeletonWidget,
  AlertWidget,
  ToastWidget,
  ConfirmationWidget,
  SuccessWidget,
  ErrorWidget,
  NotificationBadgeWidget,
  
  // Auth
  LoginWidget,
  VerifyOTPWidget,
  RegisterWidget,
  ForgotPasswordWidget,
  ResetPasswordWidget,
  
  // Address
  AddressFormWidget,
  AddressListWidget,
  
  // E-Commerce
  ProductCardWidget,
  ProductGridWidget,
  ProductDetailWidget,
  OrderSummaryWidget,
  OrderTrackingWidget,
  OrderHistoryWidget,
  CheckoutWidget,
  PaymentMethodWidget,
  InvoiceWidget,
  InvoiceListWidget,
  QuantitySelectorWidget,
  ColorSwatchesWidget,
  SizeSelectorWidget,
  StockIndicatorWidget,
  DeliveryEstimateWidget,
  CouponInputWidget,
  
  // Category
  CategoryListWidget,
  CategoryTreeWidget,
  SubcategoryWidget,
  
  // Support
  ContactFormWidget,
  FAQWidget,
  TermsWidget,
  PrivacyWidget,
  
  // Search
  SearchWidget,
  SearchResultsWidget,
  
  // Notification
  NotificationWidget,
  NotificationListWidget,
  
  // Advanced
  CalendarWidget,
  TimelineWidget,
  KanbanWidget,
  StatsWidget,
  CommentsWidget,
  SocialShareWidget,
  ComparisonWidget,
  CountdownWidget,
  ColorPickerWidget,
  SignaturePadWidget,
  RichTextEditorWidget,
  CommandPaletteWidget,
  AvatarGroupWidget,
  PresenceIndicatorWidget,
  TypingIndicatorWidget,
  EmojiPickerWidget,
  
  // Theme
  Theme,
  ThemeColors,
  defaultTheme,
} from './types'

// Default export
export { default } from './Chat'

// Chat Components
export { Chat } from './Chat'
export { TailwindChat } from './TailwindChat'

// JSON Utilities for LLM integration
export {
  unescapeLLMJson,
  parseLLMJson,
  parseWidgetsFromLLM,
  stringifyWidgetsForLLM,
} from './json-utils'

// Integration Helpers (Adapters, Schema Generator, Streaming, Validator, Builder, Context)
export * from './integrations'
