/**
 * FlowKit - Widget Validator
 * 
 * Validates widgets before rendering (security, correctness).
 * Prevents malicious or malformed widgets from breaking your app.
 */

import type { Widget, WidgetAction } from '../types'

// ============================================
// Types
// ============================================

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  sanitized?: Widget
}

export interface ValidationError {
  path: string
  message: string
  type: 'required' | 'type' | 'format' | 'security' | 'unknown'
}

export interface ValidationWarning {
  path: string
  message: string
}

export interface ValidationOptions {
  /** Allow unknown widget types */
  allowUnknown?: boolean
  /** Allow unknown properties */
  allowUnknownProperties?: boolean
  /** Validate URLs (check for malicious patterns) */
  validateUrls?: boolean
  /** Allowed URL schemes */
  allowedUrlSchemes?: string[]
  /** Maximum nesting depth */
  maxDepth?: number
  /** Maximum widget count */
  maxWidgets?: number
  /** Sanitize instead of reject */
  sanitize?: boolean
  /** Strip dangerous HTML from text */
  stripHtml?: boolean
  /** Maximum string length */
  maxStringLength?: number
}

// ============================================
// Widget Type Registry
// ============================================

const VALID_WIDGET_TYPES = new Set([
  // Layout
  'Card', 'Row', 'Col', 'Box', 'Grid', 'Spacer', 'Divider',
  // Typography
  'Text', 'Title', 'Caption', 'Label', 'Markdown',
  // Interactive
  'Button', 'Badge', 'Chip', 'Toggle', 'Checkbox', 'Radio',
  'Select', 'DatePicker', 'TimePicker', 'Slider', 'Rating', 'Upload',
  'Input', 'Textarea',
  // Form
  'Form', 'Field', 'FieldGroup',
  // Media
  'Image', 'Icon', 'Avatar', 'Video', 'Audio', 'Chart', 'Map', 'QRCode',
  'FilePreview', 'Code', 'AudioPlayer',
  // Lists
  'ListView', 'ListViewItem', 'Table',
  // Navigation
  'Breadcrumb', 'Stepper', 'Pagination',
  // Feedback
  'Progress', 'CircularProgress', 'Spinner', 'Skeleton', 'Alert', 'Toast',
  'Confirmation', 'Success', 'Error', 'NotificationBadge',
  // Auth
  'Login', 'VerifyOTP', 'Register', 'ForgotPassword', 'ResetPassword',
  // Address
  'AddressForm', 'AddressList',
  // E-Commerce
  'ProductCard', 'ProductGrid', 'ProductDetail', 'OrderSummary',
  'OrderTracking', 'OrderHistory', 'Checkout', 'PaymentMethod',
  'Invoice', 'InvoiceList', 'QuantitySelector', 'ColorSwatches',
  'SizeSelector', 'StockIndicator', 'DeliveryEstimate', 'CouponInput',
  // Category
  'CategoryList', 'CategoryTree', 'Subcategory',
  // Support
  'ContactForm', 'FAQ', 'Terms', 'Privacy',
  // Search
  'Search', 'SearchResults',
  // Notification
  'Notification', 'NotificationList',
  // Advanced
  'Calendar', 'Timeline', 'Kanban', 'Stats', 'Comments',
  'SocialShare', 'Comparison', 'Countdown', 'ColorPicker',
  'SignaturePad', 'RichTextEditor', 'CommandPalette', 'AvatarGroup',
  'PresenceIndicator', 'TypingIndicator', 'EmojiPicker',
])

const REQUIRED_PROPERTIES: Record<string, string[]> = {
  Text: ['value'],
  Title: ['value'],
  Button: ['label'],
  Image: ['src'],
  ProductCard: ['productId', 'image', 'title', 'price'],
  OrderSummary: ['items', 'subtotal', 'total'],
  OrderTracking: ['orderId', 'status', 'timeline'],
  FAQ: ['items'],
  Login: ['fields'],
  Input: ['name'],
  Textarea: ['name'],
  Select: ['name', 'options'],
  Chart: ['chartType', 'data'],
  Stats: ['value'],
}

const PROPERTY_TYPES: Record<string, Record<string, string>> = {
  '*': {
    children: 'array',
  },
  Text: { value: 'string' },
  Title: { value: 'string' },
  Button: { label: 'string', disabled: 'boolean' },
  Image: { src: 'string', width: 'number', height: 'number' },
  ProductCard: { price: 'number', rating: 'number', reviews: 'number' },
  OrderSummary: { subtotal: 'number', total: 'number' },
}

// ============================================
// Validator Class
// ============================================

export class WidgetValidator {
  private options: ValidationOptions
  
  constructor(options: ValidationOptions = {}) {
    this.options = {
      allowUnknown: false,
      allowUnknownProperties: true,
      validateUrls: true,
      allowedUrlSchemes: ['http', 'https', 'data', 'mailto', 'tel'],
      maxDepth: 10,
      maxWidgets: 100,
      sanitize: true,
      stripHtml: true,
      maxStringLength: 10000,
      ...options
    }
  }
  
  /**
   * Validate a single widget
   */
  validate(widget: any, path: string = 'root'): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []
    
    // Check if widget is an object
    if (!widget || typeof widget !== 'object') {
      errors.push({
        path,
        message: 'Widget must be an object',
        type: 'type'
      })
      return { valid: false, errors, warnings }
    }
    
    // Check type property
    if (!widget.type || typeof widget.type !== 'string') {
      errors.push({
        path: `${path}.type`,
        message: 'Widget must have a "type" property',
        type: 'required'
      })
      return { valid: false, errors, warnings }
    }
    
    // Check if type is valid
    if (!VALID_WIDGET_TYPES.has(widget.type) && !this.options.allowUnknown) {
      errors.push({
        path: `${path}.type`,
        message: `Unknown widget type: ${widget.type}`,
        type: 'unknown'
      })
      return { valid: false, errors, warnings }
    }
    
    // Check required properties
    const required = REQUIRED_PROPERTIES[widget.type] || []
    for (const prop of required) {
      if (widget[prop] === undefined || widget[prop] === null) {
        errors.push({
          path: `${path}.${prop}`,
          message: `Property "${prop}" is required for ${widget.type}`,
          type: 'required'
        })
      }
    }
    
    // Check property types
    const propTypes = PROPERTY_TYPES[widget.type] || {}
    const globalPropTypes = PROPERTY_TYPES['*'] || {}
    
    for (const [prop, value] of Object.entries(widget)) {
      if (prop === 'type' || prop === 'children') continue
      
      const expectedType = propTypes[prop] || globalPropTypes[prop]
      if (expectedType && typeof value !== expectedType) {
        errors.push({
          path: `${path}.${prop}`,
          message: `Property "${prop}" must be ${expectedType}, got ${typeof value}`,
          type: 'type'
        })
      }
    }
    
    // Validate URLs
    if (this.options.validateUrls) {
      this.validateUrls(widget, path, errors)
    }
    
    // Validate string lengths
    this.validateStringLenths(widget, path, errors)
    
    // Sanitize HTML in text
    let sanitized = { ...widget }
    if (this.options.stripHtml) {
      sanitized = this.sanitizeHtml(sanitized)
    }
    
    // Validate children recursively
    if (widget.children && Array.isArray(widget.children)) {
      const childResults = this.validateArray(widget.children, `${path}.children`)
      errors.push(...childResults.errors)
      warnings.push(...childResults.warnings)
      
      if (childResults.sanitized) {
        sanitized.children = childResults.sanitized
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      sanitized: this.options.sanitize ? sanitized : undefined
    }
  }
  
  /**
   * Validate an array of widgets
   */
  validateArray(widgets: any[], path: string = 'root'): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []
    const sanitized: any[] = []
    
    if (!Array.isArray(widgets)) {
      errors.push({
        path,
        message: 'Expected array of widgets',
        type: 'type'
      })
      return { valid: false, errors, warnings }
    }
    
    // Check max widgets
    if (widgets.length > (this.options.maxWidgets ?? 100)) {
      warnings.push({
        path,
        message: `Too many widgets (${widgets.length}), max is ${this.options.maxWidgets}`
      })
    }
    
    for (let i = 0; i < widgets.length; i++) {
      const result = this.validate(widgets[i], `${path}[${i}]`)
      errors.push(...result.errors)
      warnings.push(...result.warnings)
      
      if (result.sanitized) {
        sanitized.push(result.sanitized)
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      sanitized
    }
  }
  
  /**
   * Validate URLs for security
   */
  private validateUrls(widget: any, path: string, errors: ValidationError[]): void {
    const urlProperties = ['src', 'url', 'href', 'image', 'poster', 'thumbnail']
    
    for (const prop of urlProperties) {
      if (widget[prop] && typeof widget[prop] === 'string') {
        const url = widget[prop]
        
        try {
          const parsed = new URL(url)
          if (!this.options.allowedUrlSchemes?.includes(parsed.protocol.replace(':', ''))) {
            errors.push({
              path: `${path}.${prop}`,
              message: `URL scheme "${parsed.protocol}" not allowed`,
              type: 'security'
            })
          }
        } catch (e) {
          // Relative URL or invalid - relative is OK
          if (url.startsWith('data:')) {
            // Check data URL
            const scheme = url.split(':')[0]
            if (!this.options.allowedUrlSchemes?.includes(scheme)) {
              errors.push({
                path: `${path}.${prop}`,
                message: `Data URL type "${scheme}" not allowed`,
                type: 'security'
              })
            }
          }
        }
        
        // Check for javascript: (always dangerous)
        if (url.toLowerCase().startsWith('javascript:')) {
          errors.push({
            path: `${path}.${prop}`,
            message: 'javascript: URLs are not allowed',
            type: 'security'
          })
        }
      }
    }
  }
  
  /**
   * Validate string lengths
   */
  private validateStringLenths(widget: any, path: string, errors: ValidationError[]): void {
    const maxLength = this.options.maxStringLength ?? 10000
    
    for (const [key, value] of Object.entries(widget)) {
      if (typeof value === 'string' && value.length > maxLength) {
        errors.push({
          path: `${path}.${key}`,
          message: `String exceeds maximum length (${value.length} > ${maxLength})`,
          type: 'format'
        })
      }
    }
  }
  
  /**
   * Sanitize HTML in widget
   */
  private sanitizeHtml(widget: any): any {
    const sanitized = { ...widget }
    
    const textProps = ['value', 'text', 'label', 'title', 'message', 'description', 'placeholder']
    
    for (const prop of textProps) {
      if (sanitized[prop] && typeof sanitized[prop] === 'string') {
        // Remove script tags
        sanitized[prop] = sanitized[prop].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove event handlers
        sanitized[prop] = sanitized[prop].replace(/\s*on\w+="[^"]*"/gi, '')
        sanitized[prop] = sanitized[prop].replace(/\s*on\w+='[^']*'/gi, '')
      }
    }
    
    return sanitized
  }
}

// ============================================
// Convenience Functions
// ============================================

let defaultValidator: WidgetValidator | null = null

/**
 * Validate a widget (uses default validator)
 */
export function validateWidget(
  widget: any,
  options?: ValidationOptions
): ValidationResult {
  if (!defaultValidator || options) {
    defaultValidator = new WidgetValidator(options)
  }
  return defaultValidator.validate(widget)
}

/**
 * Validate an array of widgets
 */
export function validateWidgets(
  widgets: any[],
  options?: ValidationOptions
): ValidationResult {
  const validator = new WidgetValidator(options)
  return validator.validateArray(widgets)
}

/**
 * Check if widget is valid (quick check)
 */
export function isValidWidget(widget: any): boolean {
  return validateWidget(widget).valid
}

/**
 * Sanitize a widget
 */
export function sanitizeWidget(widget: any): Widget | null {
  const result = validateWidget(widget, { sanitize: true })
  return result.valid ? result.sanitized ?? widget : null
}

export default {
  WidgetValidator,
  validateWidget,
  validateWidgets,
  isValidWidget,
  sanitizeWidget,
}
