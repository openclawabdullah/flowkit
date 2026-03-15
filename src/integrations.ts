/**
 * FlowKit - Integration Helpers
 * 
 * All the utilities you need to integrate FlowKit with any backend.
 */

// LLM Adapters
export {
  OpenAIAdapter,
  type OpenAIAdapterConfig,
  AnthropicAdapter,
  type AnthropicAdapterConfig,
  HTTPAdapter,
  type HTTPAdapterConfig,
  MockAdapter,
  type MockAdapterConfig,
  type LLMAdapterConfig,
} from '../adapters/llm-adapters'

// Schema Generator
export {
  generateWidgetSchema,
  generateSystemPrompt,
  getWidgetDefinition,
  getAvailableWidgets,
  type GenerateSchemaOptions,
} from '../utils/schema-generator'

// Streaming Handler
export {
  StreamingHandler,
  streamSSE,
  streamFetch,
  type StreamingHandlerConfig,
  type SSEOptions,
} from '../utils/streaming-handler'

// Widget Validator
export {
  WidgetValidator,
  validateWidget,
  validateWidgets,
  isValidWidget,
  sanitizeWidget,
  type ValidationResult,
  type ValidationError,
  type ValidationWarning,
  type ValidationOptions,
} from '../utils/widget-validator'

// Widget Builder (Fluent API)
export {
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
  // Builders
  CardBuilder,
  RowBuilder,
  ColBuilder,
  TextBuilder,
  TitleBuilder,
  ButtonBuilder,
  ProductCardBuilder,
  OrderSummaryBuilder,
  LoginBuilder,
  FAQBuilder,
  WidgetBuilder,
} from '../utils/widget-builder'

// Context Provider
export {
  FlowKitContext,
  FlowKitProvider,
  useFlowKit,
  useUser,
  useCart,
  useCartActions,
  useData,
  useTheme,
  flowKitStore,
  type FlowKitContextValue,
  type User,
  type Cart,
  type CartItem,
  type Theme,
  type FlowKitProviderProps,
} from '../context'

// JSON Utilities (already exported from main, but include here for completeness)
export {
  unescapeLLMJson,
  parseLLMJson,
  parseWidgetsFromLLM,
  stringifyWidgetsForLLM,
} from '../json-utils'
