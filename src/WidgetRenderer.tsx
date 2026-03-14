/**
 * FlowKit - Widget Renderer
 * 
 * Renders all 25+ widget types with OpenAI-inspired styling.
 */

import React from 'react'
import type { Widget, WidgetAction } from './types'

// ============================================
// Styles (OpenAI-inspired)
// ============================================

const styles = {
  // Colors
  colors: {
    primary: '#10a37f',
    primaryHover: '#0d8a6a',
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
    borderDark: '#d1d5db',
  },
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  // Border radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
}

// ============================================
// Context
// ============================================

interface WidgetContextValue {
  onAction: (action: WidgetAction) => void
  theme: typeof styles
}

const WidgetContext = React.createContext<WidgetContextValue>({
  onAction: () => {},
  theme: styles,
})

// ============================================
// Size Utilities
// ============================================

const sizeMap = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
}

const weightMap = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

// ============================================
// Widget Renderer
// ============================================

interface WidgetRendererProps {
  widget: Widget
  onAction?: (action: WidgetAction) => void
}

export function WidgetRenderer({ widget, onAction }: WidgetRendererProps) {
  const handleAction = (action: WidgetAction) => {
    onAction?.(action)
  }

  return (
    <WidgetContext.Provider value={{ onAction: handleAction, theme: styles }}>
      <RenderWidget widget={widget} />
    </WidgetContext.Provider>
  )
}

function RenderWidget({ widget }: { widget: Widget }) {
  if (!widget || !widget.type) return null

  switch (widget.type) {
    // Layout
    case 'Card':
      return <CardWidget widget={widget} />
    case 'Row':
      return <RowWidget widget={widget} />
    case 'Col':
      return <ColWidget widget={widget} />
    case 'Box':
      return <BoxWidget widget={widget} />
    case 'Grid':
      return <GridWidget widget={widget} />
    case 'Spacer':
      return <SpacerWidget widget={widget} />
    case 'Divider':
      return <DividerWidget widget={widget} />

    // Typography
    case 'Text':
      return <TextWidget widget={widget} />
    case 'Title':
      return <TitleWidget widget={widget} />
    case 'Caption':
      return <CaptionWidget widget={widget} />
    case 'Markdown':
      return <MarkdownWidget widget={widget} />

    // Interactive
    case 'Button':
      return <ButtonWidget widget={widget} />
    case 'Badge':
      return <BadgeWidget widget={widget} />
    case 'Chip':
      return <ChipWidget widget={widget} />
    case 'Toggle':
      return <ToggleWidget widget={widget} />
    case 'Checkbox':
      return <CheckboxWidget widget={widget} />
    case 'Radio':
      return <RadioWidget widget={widget} />
    case 'Select':
      return <SelectWidget widget={widget} />
    case 'DatePicker':
      return <DatePickerWidget widget={widget} />
    case 'Rating':
      return <RatingWidget widget={widget} />
    case 'Upload':
      return <UploadWidget widget={widget} />
    case 'Input':
      return <InputWidget_ widget={widget} />
    case 'Textarea':
      return <TextareaWidget_ widget={widget} />
    case 'Label':
      return <LabelWidget_ widget={widget} />
    case 'Chart':
      return <ChartWidget_ widget={widget} />
    case 'Map':
      return <MapWidget_ widget={widget} />
    case 'QRCode':
      return <QRCodeWidget_ widget={widget} />
    case 'FilePreview':
      return <FilePreviewWidget_ widget={widget} />
    case 'Code':
      return <CodeWidget_ widget={widget} />

    // Advanced
    case 'Calendar':
      return <CalendarWidget_ widget={widget} />
    case 'Timeline':
      return <TimelineWidget_ widget={widget} />
    case 'Kanban':
      return <KanbanWidget_ widget={widget} />
    case 'Stats':
      return <StatsWidget_ widget={widget} />
    case 'Comments':
      return <CommentsWidget_ widget={widget} />
    case 'SocialShare':
      return <SocialShareWidget_ widget={widget} />
    case 'Comparison':
      return <ComparisonWidget_ widget={widget} />
    case 'Countdown':
      return <CountdownWidget_ widget={widget} />

    // Media
    case 'Image':
      return <ImageWidget widget={widget} />
    case 'Icon':
      return <IconWidget widget={widget} />
    case 'Avatar':
      return <AvatarWidget widget={widget} />

    // Lists
    case 'ListView':
      return <ListViewWidget widget={widget} />
    case 'ListViewItem':
      return <ListViewItemWidget widget={widget} />
    case 'Table':
      return <TableWidget widget={widget} />

    // Feedback
    case 'Progress':
      return <ProgressWidget widget={widget} />
    case 'Spinner':
      return <SpinnerWidget widget={widget} />
    case 'Alert':
      return <AlertWidget widget={widget} />
    case 'Confirmation':
      return <ConfirmationWidget widget={widget} />
    case 'Success':
      return <SuccessWidget widget={widget} />
    case 'Error':
      return <ErrorWidget widget={widget} />

    // Navigation
    case 'Search':
      return <SearchWidget widget={widget} />
    case 'Breadcrumb':
      return <BreadcrumbWidget widget={widget} />
    case 'Stepper':
      return <StepperWidget widget={widget} />

    // Auth
    case 'Login':
      return <LoginWidget widget={widget} />
    case 'VerifyOTP':
      return <VerifyOTPWidget widget={widget} />
    case 'Register':
      return <RegisterWidget widget={widget} />

    // Address
    case 'AddressForm':
      return <AddressFormWidget widget={widget} />
    case 'AddressList':
      return <AddressListWidget widget={widget} />

    // E-Commerce
    case 'ProductCard':
      return <ProductCardWidget widget={widget} />
    case 'ProductGrid':
      return <ProductGridWidget widget={widget} />
    case 'OrderSummary':
      return <OrderSummaryWidget widget={widget} />
    case 'OrderTracking':
      return <OrderTrackingWidget widget={widget} />
    case 'Checkout':
      return <CheckoutWidget widget={widget} />
    case 'PaymentMethod':
      return <PaymentMethodWidget widget={widget} />
    case 'Invoice':
      return <InvoiceWidget widget={widget} />

    // Category
    case 'CategoryList':
      return <CategoryListWidget widget={widget} />
    case 'CategoryTree':
      return <CategoryTreeWidget widget={widget} />

    // Support
    case 'ContactForm':
      return <ContactFormWidget widget={widget} />
    case 'FAQ':
      return <FAQWidget widget={widget} />
    case 'Terms':
      return <TermsWidget widget={widget} />

    // Form
    case 'Form':
      return <FormWidget widget={widget} />
    case 'Field':
      return <FieldWidget widget={widget} />

    default:
      return <div style={{ color: styles.colors.error }}>Unknown widget: {widget.type}</div>
  }
}

// ============================================
// Layout Widgets
// ============================================

function CardWidget({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)
  const sizeMap: Record<string, string> = {
    sm: '200px',
    md: '300px',
    lg: '400px',
    xl: '500px',
    full: '100%',
  }

  return (
    <div
      style={{
        width: widget.size ? sizeMap[widget.size] : '100%',
        padding: widget.padding ?? 16,
        background: widget.background ?? theme.colors.background,
        border: widget.border ? `${widget.border.size}px solid ${widget.border.color}` : `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        boxShadow: widget.shadow ? theme.shadows[widget.shadow] : theme.shadows.sm,
        cursor: widget.onClickAction ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
      }}
      onClick={() => widget.onClickAction && React.useContext(WidgetContext).onAction(widget.onClickAction)}
    >
      {widget.header && <RenderWidget widget={widget.header} />}
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
      {widget.footer && <RenderWidget widget={widget.footer} />}
    </div>
  )
}

function RowWidget({ widget }: { widget: any }) {
  const justifyMap: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: widget.gap ?? 8,
        justifyContent: widget.justify ? justifyMap[widget.justify] : 'flex-start',
        alignItems: widget.align ?? 'center',
        flexWrap: widget.wrap === true ? 'wrap' : widget.wrap ?? 'nowrap',
      }}
    >
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
    </div>
  )
}

function ColWidget({ widget }: { widget: any }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: widget.gap ?? 8,
        alignItems: widget.align ?? 'stretch',
        flex: widget.flex,
      }}
    >
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
    </div>
  )
}

function BoxWidget({ widget }: { widget: any }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: widget.direction ?? 'column',
        width: widget.width,
        height: widget.height,
        padding: widget.padding,
        margin: widget.margin,
        background: widget.background,
        borderRadius: widget.radius ? styles.radius[widget.radius] : undefined,
        border: widget.border ? `${widget.border.size}px solid ${widget.border.color}` : undefined,
        justifyContent: widget.justify,
        alignItems: widget.align,
        flexWrap: widget.wrap,
        flex: widget.flex,
        gap: 8,
      }}
    >
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
    </div>
  )
}

function GridWidget({ widget }: { widget: any }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: typeof widget.columns === 'number' 
          ? `repeat(${widget.columns}, 1fr)` 
          : widget.columns,
        gap: widget.gap ?? 8,
      }}
    >
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
    </div>
  )
}

function SpacerWidget({ widget }: { widget: any }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: widget.minSize ?? widget.size ?? 8,
        minWidth: widget.minSize ?? widget.size ?? 8,
      }}
    />
  )
}

function DividerWidget({ widget }: { widget: any }) {
  return (
    <div
      style={{
        width: widget.vertical ? '1px' : '100%',
        height: widget.vertical ? '100%' : '1px',
        backgroundColor: widget.color ?? styles.colors.border,
        margin: widget.spacing ? `${widget.spacing}px 0` : '8px 0',
        borderStyle: widget.style ?? 'solid',
      }}
    />
  )
}

// ============================================
// Typography Widgets
// ============================================

function TextWidget({ widget }: { widget: any }) {
  return (
    <p
      style={{
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.md,
        fontWeight: widget.weight ? weightMap[widget.weight] : 400,
        color: widget.color ?? styles.colors.text,
        textAlign: widget.textAlign,
        textDecoration: widget.lineThrough ? 'line-through' : widget.underline ? 'underline' : undefined,
        fontStyle: widget.italic ? 'italic' : undefined,
        margin: 0,
        lineHeight: 1.5,
      }}
    >
      {widget.value}
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
    </p>
  )
}

function TitleWidget({ widget }: { widget: any }) {
  const Tag = (`h${widget.level ?? 2}`) as keyof JSX.IntrinsicElements
  return (
    <Tag
      style={{
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.xl,
        fontWeight: widget.weight ? weightMap[widget.weight] : 600,
        color: widget.color ?? styles.colors.text,
        textAlign: widget.textAlign,
        margin: 0,
        marginBottom: 8,
      }}
    >
      {widget.value}
    </Tag>
  )
}

function CaptionWidget({ widget }: { widget: any }) {
  return (
    <span
      style={{
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.xs,
        color: widget.color ?? styles.colors.textSecondary,
        textAlign: widget.textAlign,
      }}
    >
      {widget.value}
    </span>
  )
}

function MarkdownWidget({ widget }: { widget: any }) {
  // Simple markdown rendering (basic implementation)
  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:#f3f4f6;padding:2px 4px;border-radius:4px;font-size:0.875em;">$1</code>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div
      style={{ fontSize: widget.size ? sizeMap[widget.size] : sizeMap.md, lineHeight: 1.6 }}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(widget.value) }}
    />
  )
}

// ============================================
// Interactive Widgets
// ============================================

function ButtonWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  
  const colorStyles: Record<string, any> = {
    primary: {
      solid: { background: theme.colors.primary, color: '#fff' },
      outline: { background: 'transparent', color: theme.colors.primary, border: `2px solid ${theme.colors.primary}` },
      ghost: { background: 'transparent', color: theme.colors.primary },
    },
    secondary: {
      solid: { background: theme.colors.secondary, color: '#fff' },
      outline: { background: 'transparent', color: theme.colors.secondary, border: `2px solid ${theme.colors.secondary}` },
      ghost: { background: 'transparent', color: theme.colors.secondary },
    },
    danger: {
      solid: { background: theme.colors.error, color: '#fff' },
      outline: { background: 'transparent', color: theme.colors.error, border: `2px solid ${theme.colors.error}` },
      ghost: { background: 'transparent', color: theme.colors.error },
    },
  }

  const color = widget.color ?? 'primary'
  const variant = widget.variant ?? 'solid'
  const style = colorStyles[color]?.[variant] ?? colorStyles.primary.solid

  return (
    <button
      onClick={() => widget.onClickAction && onAction(widget.onClickAction)}
      disabled={widget.disabled || widget.loading}
      style={{
        padding: widget.size === 'sm' ? '6px 12px' : widget.size === 'lg' ? '12px 24px' : '8px 16px',
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.sm,
        fontWeight: 500,
        borderRadius: theme.radius.md,
        border: style.border ?? 'none',
        background: style.background,
        color: style.color,
        cursor: widget.disabled ? 'not-allowed' : 'pointer',
        width: widget.block ? '100%' : 'auto',
        opacity: widget.disabled ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        transition: 'all 0.2s',
      }}
    >
      {widget.iconStart && <span>{widget.iconStart}</span>}
      {widget.loading ? '...' : widget.label}
      {widget.iconEnd && <span>{widget.iconEnd}</span>}
    </button>
  )
}

function BadgeWidget({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)
  
  const colorStyles: Record<string, any> = {
    primary: { bg: '#ecfdf5', color: theme.colors.primary },
    secondary: { bg: '#f3f4f6', color: theme.colors.secondary },
    success: { bg: '#dcfce7', color: theme.colors.success },
    warning: { bg: '#fef3c7', color: theme.colors.warning },
    danger: { bg: '#fee2e2', color: theme.colors.error },
    info: { bg: '#dbeafe', color: theme.colors.info },
  }

  const style = colorStyles[widget.color ?? 'primary']

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: widget.dot ? '4px' : '4px 10px',
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.xs,
        fontWeight: 500,
        borderRadius: widget.pill ? theme.radius.full : theme.radius.sm,
        background: style.bg,
        color: style.color,
        gap: 4,
      }}
    >
      {widget.dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: style.color }} />}
      {widget.label}
    </span>
  )
}

function ChipWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  
  return (
    <div
      onClick={() => widget.onClickAction && onAction(widget.onClickAction)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: theme.radius.full,
        background: widget.selected ? theme.colors.primary : theme.colors.surface,
        color: widget.selected ? '#fff' : theme.colors.text,
        cursor: 'pointer',
        fontSize: sizeMap.sm,
        fontWeight: 500,
        border: `1px solid ${widget.selected ? theme.colors.primary : theme.colors.border}`,
        transition: 'all 0.2s',
      }}
    >
      {widget.avatar && <img src={widget.avatar} alt="" style={{ width: 20, height: 20, borderRadius: '50%' }} />}
      {widget.icon && <span>{widget.icon}</span>}
      {widget.label}
      {widget.onDeleteAction && (
        <span
          onClick={(e) => { e.stopPropagation(); onAction(widget.onDeleteAction) }}
          style={{ marginLeft: 4, cursor: 'pointer', opacity: 0.6 }}
        >
          ×
        </span>
      )}
    </div>
  )
}

function ToggleWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [checked, setChecked] = React.useState(widget.checked ?? false)

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <div
        onClick={() => {
          if (!widget.disabled) {
            setChecked(!checked)
            widget.onChangeAction && onAction({ ...widget.onChangeAction, data: { checked: !checked } })
          }
        }}
        style={{
          width: widget.size === 'sm' ? 36 : widget.size === 'lg' ? 56 : 44,
          height: widget.size === 'sm' ? 20 : widget.size === 'lg' ? 28 : 24,
          borderRadius: theme.radius.full,
          background: checked ? theme.colors.primary : theme.colors.border,
          padding: 2,
          transition: 'background 0.2s',
          opacity: widget.disabled ? 0.6 : 1,
        }}
      >
        <div
          style={{
            width: widget.size === 'sm' ? 16 : widget.size === 'lg' ? 24 : 20,
            height: widget.size === 'sm' ? 16 : widget.size === 'lg' ? 24 : 20,
            borderRadius: '50%',
            background: '#fff',
            transform: checked ? 'translateX(100%)' : 'translateX(0)',
            transition: 'transform 0.2s',
          }}
        />
      </div>
      {widget.label && <span>{widget.label}</span>}
    </label>
  )
}

function CheckboxWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [checked, setChecked] = React.useState(widget.checked ?? false)

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked)
          widget.onChangeAction && onAction({ ...widget.onChangeAction, data: { checked: e.target.checked } })
        }}
        disabled={widget.disabled}
        style={{
          width: 18,
          height: 18,
          accentColor: theme.colors.primary,
        }}
      />
      {widget.label && <span>{widget.label}</span>}
    </label>
  )
}

function RadioWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <input
        type="radio"
        name={widget.name}
        value={widget.value}
        checked={widget.checked}
        onChange={() => widget.onChangeAction && onAction(widget.onChangeAction)}
        disabled={widget.disabled}
        style={{
          width: 18,
          height: 18,
          accentColor: theme.colors.primary,
        }}
      />
      {widget.label && <span>{widget.label}</span>}
    </label>
  )
}

function SelectWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [value, setValue] = React.useState(widget.value ?? '')

  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        widget.onChangeAction && onAction({ ...widget.onChangeAction, data: { value: e.target.value } })
      }}
      disabled={widget.disabled}
      style={{
        padding: widget.size === 'sm' ? '6px 12px' : widget.size === 'lg' ? '12px 16px' : '8px 12px',
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.sm,
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.background,
        width: widget.block ? '100%' : 'auto',
        cursor: 'pointer',
      }}
    >
      {widget.placeholder && <option value="">{widget.placeholder}</option>}
      {widget.options?.map((opt: any, i: number) => (
        <option key={i} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

function DatePickerWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <input
      type="date"
      value={widget.value ?? ''}
      onChange={(e) => widget.onChangeAction && onAction({ ...widget.onChangeAction, data: { value: e.target.value } })}
      disabled={widget.disabled}
      min={widget.min}
      max={widget.max}
      style={{
        padding: widget.size === 'sm' ? '6px 12px' : widget.size === 'lg' ? '12px 16px' : '8px 12px',
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.sm,
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.background,
        width: widget.block ? '100%' : 'auto',
      }}
    />
  )
}

function RatingWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [value, setValue] = React.useState(widget.value ?? 0)
  const max = widget.max ?? 5

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          onClick={() => {
            if (!widget.readonly) {
              const newValue = widget.allowHalf ? (value === i + 0.5 ? i + 1 : i + 0.5) : i + 1
              setValue(newValue)
              widget.onChangeAction && onAction({ ...widget.onChangeAction, data: { value: newValue } })
            }
          }}
          style={{
            cursor: widget.readonly ? 'default' : 'pointer',
            fontSize: widget.size ? sizeMap[widget.size] : '1.5rem',
            color: i < Math.floor(value) ? '#fbbf24' : theme.colors.border,
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function UploadWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={widget.accept}
        multiple={widget.multiple}
        onChange={(e) => {
          const files = Array.from(e.target.files || [])
          widget.onUploadAction && onAction({ ...widget.onUploadAction, data: { files } })
        }}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={widget.disabled}
        style={{
          padding: '12px 24px',
          border: `2px dashed ${theme.colors.border}`,
          borderRadius: theme.radius.md,
          background: theme.colors.surface,
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Click to upload or drag and drop
      </button>
      {widget.files && widget.files.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {widget.files.map((file: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
              <span>{file.name}</span>
              <span style={{ color: theme.colors.textSecondary, fontSize: sizeMap.xs }}>
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// Input Widgets
// ============================================

function InputWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [value, setValue] = React.useState(widget.value ?? '')
  const [focused, setFocused] = React.useState(false)

  const inputType = widget.type_ ?? 'text'
  const size = widget.size ?? 'md'
  const paddingMap: Record<string, string> = {
    sm: '6px 10px',
    md: '8px 12px',
    lg: '12px 16px',
  }

  return (
    <div style={{ width: widget.block ? '100%' : 'auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: paddingMap[size],
          borderRadius: widget.variant === 'flushed' ? 0 : theme.radius.md,
          border: widget.variant === 'filled' 
            ? 'none'
            : widget.variant === 'flushed'
            ? 'none'
            : widget.variant === 'unstyled'
            ? 'none'
            : `1px solid ${widget.error ? theme.colors.error : focused ? theme.colors.primary : theme.colors.border}`,
          borderBottom: widget.variant === 'flushed' 
            ? `1px solid ${widget.error ? theme.colors.error : focused ? theme.colors.primary : theme.colors.border}`
            : undefined,
          background: widget.variant === 'filled' ? theme.colors.surface : 'transparent',
          transition: 'border-color 0.2s',
        }}
      >
        {widget.leftIcon && <span style={{ color: theme.colors.textSecondary }}>{widget.leftIcon}</span>}
        {widget.leftElement}
        <input
          type={inputType}
          name={widget.name}
          value={value}
          placeholder={widget.placeholder}
          disabled={widget.disabled}
          readOnly={widget.readonly}
          required={widget.required}
          maxLength={widget.maxLength}
          minLength={widget.minLength}
          pattern={widget.pattern}
          onChange={(e) => {
            setValue(e.target.value)
            widget.onChangeAction && onAction({ ...widget.onChangeAction, data: { value: e.target.value } })
          }}
          onFocus={() => {
            setFocused(true)
            widget.onFocusAction && onAction(widget.onFocusAction)
          }}
          onBlur={() => {
            setFocused(false)
            widget.onBlurAction && onAction({ ...widget.onBlurAction, data: { value } })
          }}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: sizeMap[size],
            width: '100%',
          }}
        />
        {widget.rightElement}
        {widget.rightIcon && <span style={{ color: theme.colors.textSecondary }}>{widget.rightIcon}</span>}
      </div>
      {widget.error && (
        <div style={{ color: theme.colors.error, fontSize: sizeMap.xs, marginTop: 4 }}>{widget.error}</div>
      )}
      {widget.helperText && !widget.error && (
        <div style={{ color: theme.colors.textSecondary, fontSize: sizeMap.xs, marginTop: 4 }}>{widget.helperText}</div>
      )}
    </div>
  )
}

function TextareaWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [value, setValue] = React.useState(widget.value ?? '')

  const resizeMap: Record<string, string> = {
    none: 'none',
    vertical: 'vertical',
    horizontal: 'horizontal',
    both: 'both',
  }

  return (
    <div style={{ width: widget.block ? '100%' : 'auto' }}>
      <textarea
        name={widget.name}
        value={value}
        placeholder={widget.placeholder}
        rows={widget.rows ?? 3}
        cols={widget.cols}
        maxLength={widget.maxLength}
        minLength={widget.minLength}
        disabled={widget.disabled}
        readOnly={widget.readonly}
        required={widget.required}
        onChange={(e) => {
          setValue(e.target.value)
          widget.onChangeAction && onAction({ ...widget.onChangeAction, data: { value: e.target.value } })
        }}
        onBlur={() => widget.onBlurAction && onAction({ ...widget.onBlurAction, data: { value } })}
        onFocus={() => widget.onFocusAction && onAction(widget.onFocusAction)}
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.border}`,
          fontSize: sizeMap.sm,
          resize: widget.resize ? resizeMap[widget.resize] : 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
          lineHeight: 1.5,
        }}
      />
      {widget.error && (
        <div style={{ color: theme.colors.error, fontSize: sizeMap.xs, marginTop: 4 }}>{widget.error}</div>
      )}
      {widget.helperText && !widget.error && (
        <div style={{ color: theme.colors.textSecondary, fontSize: sizeMap.xs, marginTop: 4 }}>{widget.helperText}</div>
      )}
    </div>
  )
}

function LabelWidget_({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)
  
  const sizeMap_: Record<string, string> = {
    sm: sizeMap.sm,
    md: sizeMap.md,
    lg: sizeMap.lg,
  }
  
  const weightMap_: Record<string, number> = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }

  return (
    <label
      htmlFor={widget.htmlFor}
      style={{
        display: 'block',
        fontSize: sizeMap_[widget.size ?? 'md'],
        fontWeight: weightMap_[widget.weight ?? 'medium'],
        color: widget.color ?? theme.colors.text,
        marginBottom: 4,
      }}
    >
      {widget.value}
      {widget.required && <span style={{ color: theme.colors.error, marginLeft: 2 }}>*</span>}
    </label>
  )
}

function ChartWidget_({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)
  
  const defaultColors = [
    '#10a37f', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', 
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ]
  
  const colors = widget.colors ?? defaultColors
  const { data, chartType, options } = widget
  
  // Simple SVG-based chart rendering
  const width = typeof options?.width === 'number' ? options.width : 400
  const height = typeof options?.height === 'number' ? options.height : 300
  
  // Calculate max value for scaling
  const maxValue = Math.max(...data.datasets.flatMap((d: any) => d.data))
  const minValue = chartType === 'bar' || chartType === 'line' || chartType === 'area' 
    ? 0 
    : 0

  // Render based on chart type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart data={data} colors={colors} width={width} height={height} options={options} theme={theme} />
      case 'line':
        return <LineChart data={data} colors={colors} width={width} height={height} options={options} theme={theme} />
      case 'pie':
        return <PieChart data={data} colors={colors} width={width} height={height} options={options} theme={theme} />
      case 'donut':
        return <DonutChart data={data} colors={colors} width={width} height={height} options={options} theme={theme} />
      case 'area':
        return <AreaChart data={data} colors={colors} width={width} height={height} options={options} theme={theme} />
      default:
        return <BarChart data={data} colors={colors} width={width} height={height} options={options} theme={theme} />
    }
  }

  return (
    <div style={{ padding: 16 }}>
      {widget.title && (
        <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 4 }}>{widget.title}</div>
      )}
      {widget.subtitle && (
        <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary, marginBottom: 12 }}>{widget.subtitle}</div>
      )}
      <div style={{ width: '100%', maxWidth: width, margin: '0 auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
          {renderChart()}
        </svg>
      </div>
      {options?.showLegend !== false && data.datasets.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 12 }}>
          {data.datasets.map((dataset: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: colors[i % colors.length] }} />
              <span style={{ fontSize: sizeMap.sm }}>{dataset.label ?? `Series ${i + 1}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Simple chart components
function BarChart({ data, colors, width, height, options, theme }: any) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const barCount = data.labels.length
  const barWidth = chartWidth / barCount * 0.7
  const barGap = chartWidth / barCount * 0.3
  const maxValue = Math.max(...data.datasets.flatMap((d: any) => d.data)) * 1.1

  return (
    <g>
      {/* Grid lines */}
      {options?.showGrid !== false && (
        <>
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <line
              key={i}
              x1={padding.left}
              y1={padding.top + chartHeight * (1 - pct)}
              x2={width - padding.right}
              y2={padding.top + chartHeight * (1 - pct)}
              stroke={theme.colors.border}
              strokeDasharray="2,2"
            />
          ))}
        </>
      )}
      {/* Bars */}
      {data.datasets[0].data.map((value: number, i: number) => {
        const barHeight = (value / maxValue) * chartHeight
        const x = padding.left + i * (chartWidth / barCount) + barGap / 2
        const y = padding.top + chartHeight - barHeight
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={colors[i % colors.length]}
              rx={4}
            />
            {/* X-axis label */}
            <text
              x={x + barWidth / 2}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fontSize={12}
              fill={theme.colors.textSecondary}
            >
              {data.labels[i]}
            </text>
          </g>
        )
      })}
      {/* Y-axis labels */}
      {options?.showYAxis !== false && (
        <>
          {[0, 0.5, 1].map((pct, i) => (
            <text
              key={i}
              x={padding.left - 10}
              y={padding.top + chartHeight * (1 - pct) + 4}
              textAnchor="end"
              fontSize={11}
              fill={theme.colors.textSecondary}
            >
              {Math.round(maxValue * pct)}
            </text>
          ))}
        </>
      )}
    </g>
  )
}

function LineChart({ data, colors, width, height, options, theme }: any) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const maxValue = Math.max(...data.datasets.flatMap((d: any) => d.data)) * 1.1
  const pointCount = data.labels.length

  return (
    <g>
      {/* Grid lines */}
      {options?.showGrid !== false && (
        <>
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <line
              key={i}
              x1={padding.left}
              y1={padding.top + chartHeight * (1 - pct)}
              x2={width - padding.right}
              y2={padding.top + chartHeight * (1 - pct)}
              stroke={theme.colors.border}
              strokeDasharray="2,2"
            />
          ))}
        </>
      )}
      {/* Lines */}
      {data.datasets.map((dataset: any, datasetIndex: number) => {
        const points = dataset.data.map((value: number, i: number) => {
          const x = padding.left + (i / (pointCount - 1)) * chartWidth
          const y = padding.top + chartHeight - (value / maxValue) * chartHeight
          return { x, y }
        })
        
        const pathD = points.map((p: any, i: number) => 
          (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`
        ).join(' ')

        return (
          <g key={datasetIndex}>
            <path
              d={pathD}
              fill="none"
              stroke={colors[datasetIndex % colors.length]}
              strokeWidth={2}
            />
            {/* Points */}
            {points.map((p: any, i: number) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={colors[datasetIndex % colors.length]}
              />
            ))}
          </g>
        )
      })}
      {/* X-axis labels */}
      {data.labels.map((label: string, i: number) => {
        const x = padding.left + (i / (pointCount - 1)) * chartWidth
        return (
          <text
            key={i}
            x={x}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            fontSize={12}
            fill={theme.colors.textSecondary}
          >
            {label}
          </text>
        )
      })}
    </g>
  )
}

function PieChart({ data, colors, width, height, options, theme }: any) {
  const cx = width / 2
  const cy = height / 2
  const radius = Math.min(width, height) / 2 - 20
  const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)
  
  let currentAngle = -Math.PI / 2

  return (
    <g>
      {data.datasets[0].data.map((value: number, i: number) => {
        const angle = (value / total) * 2 * Math.PI
        const x1 = cx + Math.cos(currentAngle) * radius
        const y1 = cy + Math.sin(currentAngle) * radius
        const x2 = cx + Math.cos(currentAngle + angle) * radius
        const y2 = cy + Math.sin(currentAngle + angle) * radius
        const largeArc = angle > Math.PI ? 1 : 0
        
        const pathD = [
          `M ${cx} ${cy}`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
          'Z'
        ].join(' ')
        
        currentAngle += angle
        
        return (
          <g key={i}>
            <path
              d={pathD}
              fill={colors[i % colors.length]}
              stroke={theme.colors.background}
              strokeWidth={2}
            />
            {/* Label */}
            <text
              x={cx + Math.cos(currentAngle - angle / 2) * radius * 0.6}
              y={cy + Math.sin(currentAngle - angle / 2) * radius * 0.6}
              textAnchor="middle"
              fontSize={12}
              fill="#fff"
              fontWeight={600}
            >
              {Math.round((value / total) * 100)}%
            </text>
          </g>
        )
      })}
      {/* Legend */}
      {data.labels.map((label: string, i: number) => {
        const legendY = 20 + i * 18
        return (
          <g key={i}>
            <rect
              x={width - 100}
              y={legendY}
              width={12}
              height={12}
              fill={colors[i % colors.length]}
              rx={2}
            />
            <text
              x={width - 82}
              y={legendY + 10}
              fontSize={11}
              fill={theme.colors.text}
            >
              {label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function DonutChart({ data, colors, width, height, options, theme }: any) {
  const cx = width / 2
  const cy = height / 2
  const outerRadius = Math.min(width, height) / 2 - 20
  const innerRadius = outerRadius * 0.6
  const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)
  
  let currentAngle = -Math.PI / 2

  return (
    <g>
      {data.datasets[0].data.map((value: number, i: number) => {
        const angle = (value / total) * 2 * Math.PI
        const x1Outer = cx + Math.cos(currentAngle) * outerRadius
        const y1Outer = cy + Math.sin(currentAngle) * outerRadius
        const x2Outer = cx + Math.cos(currentAngle + angle) * outerRadius
        const y2Outer = cy + Math.sin(currentAngle + angle) * outerRadius
        const x1Inner = cx + Math.cos(currentAngle + angle) * innerRadius
        const y1Inner = cy + Math.sin(currentAngle + angle) * innerRadius
        const x2Inner = cx + Math.cos(currentAngle) * innerRadius
        const y2Inner = cy + Math.sin(currentAngle) * innerRadius
        const largeArc = angle > Math.PI ? 1 : 0
        
        const pathD = [
          `M ${x1Outer} ${y1Outer}`,
          `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
          `L ${x1Inner} ${y1Inner}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
          'Z'
        ].join(' ')
        
        currentAngle += angle
        
        return (
          <path
            key={i}
            d={pathD}
            fill={colors[i % colors.length]}
            stroke={theme.colors.background}
            strokeWidth={2}
          />
        )
      })}
      {/* Center text */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fontSize={24}
        fontWeight={600}
        fill={theme.colors.text}
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fontSize={12}
        fill={theme.colors.textSecondary}
      >
        Total
      </text>
      {/* Legend */}
      {data.labels.map((label: string, i: number) => {
        const legendY = 20 + i * 18
        return (
          <g key={i}>
            <rect
              x={width - 100}
              y={legendY}
              width={12}
              height={12}
              fill={colors[i % colors.length]}
              rx={2}
            />
            <text
              x={width - 82}
              y={legendY + 10}
              fontSize={11}
              fill={theme.colors.text}
            >
              {label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function AreaChart({ data, colors, width, height, options, theme }: any) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const maxValue = Math.max(...data.datasets.flatMap((d: any) => d.data)) * 1.1
  const pointCount = data.labels.length

  return (
    <g>
      {/* Grid lines */}
      {options?.showGrid !== false && (
        <>
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <line
              key={i}
              x1={padding.left}
              y1={padding.top + chartHeight * (1 - pct)}
              x2={width - padding.right}
              y2={padding.top + chartHeight * (1 - pct)}
              stroke={theme.colors.border}
              strokeDasharray="2,2"
            />
          ))}
        </>
      )}
      {/* Areas */}
      {data.datasets.map((dataset: any, datasetIndex: number) => {
        const points = dataset.data.map((value: number, i: number) => {
          const x = padding.left + (i / (pointCount - 1)) * chartWidth
          const y = padding.top + chartHeight - (value / maxValue) * chartHeight
          return { x, y }
        })
        
        const pathD = points.map((p: any, i: number) => 
          (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`
        ).join(' ')
        
        const areaD = pathD + 
          ` L ${points[points.length - 1].x},${padding.top + chartHeight}` +
          ` L ${padding.left},${padding.top + chartHeight} Z`

        return (
          <g key={datasetIndex}>
            <defs>
              <linearGradient id={`areaGradient-${datasetIndex}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[datasetIndex % colors.length]} stopOpacity={0.4} />
                <stop offset="100%" stopColor={colors[datasetIndex % colors.length]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <path
              d={areaD}
              fill={`url(#areaGradient-${datasetIndex})`}
            />
            <path
              d={pathD}
              fill="none"
              stroke={colors[datasetIndex % colors.length]}
              strokeWidth={2}
            />
          </g>
        )
      })}
      {/* X-axis labels */}
      {data.labels.map((label: string, i: number) => {
        const x = padding.left + (i / (pointCount - 1)) * chartWidth
        return (
          <text
            key={i}
            x={x}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            fontSize={12}
            fill={theme.colors.textSecondary}
          >
            {label}
          </text>
        )
      })}
    </g>
  )
}

// ============================================
// New Widgets
// ============================================

function MapWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const center = widget.center ?? { lat: 40.7128, lng: -74.0060 }
  const zoom = widget.zoom ?? 12
  const height = widget.height ?? 300
  
  // Simple static map using OpenStreetMap tiles
  const tileUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.01}%2C${center.lat - 0.01}%2C${center.lng + 0.01}%2C${center.lat + 0.01}&layer=mapnik&marker=${center.lat}%2C${center.lng}`
  
  return (
    <div style={{ borderRadius: theme.radius.lg, overflow: 'hidden', position: 'relative' }}>
      <iframe
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        src={tileUrl}
      />
      {widget.markers && widget.markers.length > 0 && (
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: 'rgba(255,255,255,0.9)', 
          padding: 8,
          maxHeight: 100,
          overflow: 'auto'
        }}>
          {widget.markers.map((marker: any, i: number) => (
            <div 
              key={i}
              onClick={() => marker.onClickAction && onAction(marker.onClickAction)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                padding: '4px 8px',
                cursor: marker.onClickAction ? 'pointer' : 'default',
                borderRadius: theme.radius.sm,
              }}
            >
              <span style={{ color: marker.color ?? theme.colors.primary }}>📍</span>
              <span style={{ fontSize: sizeMap.sm }}>{marker.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function QRCodeWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const size = widget.size ?? 150
  
  // Generate QR code using Google Charts API (free, no key needed)
  const qrUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encodeURIComponent(widget.value)}&choe=UTF-8`
  
  return (
    <div style={{ textAlign: 'center' }}>
      <img 
        src={qrUrl} 
        alt="QR Code" 
        width={size} 
        height={size}
        onClick={() => widget.onClickAction && onAction(widget.onClickAction)}
        style={{ 
          cursor: widget.onClickAction ? 'pointer' : 'default',
          background: widget.bgColor ?? '#fff',
          padding: 10,
          borderRadius: theme.radius.md,
        }}
      />
      {widget.label && (
        <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary, marginTop: 8 }}>
          {widget.label}
        </div>
      )}
    </div>
  )
}

function FilePreviewWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const { file } = widget
  
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }
  
  const getIcon = (type: string) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎬'
    if (type.startsWith('audio/')) return '🎵'
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('sheet') || type.includes('excel')) return '📊'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    return '📎'
  }
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      padding: 12,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.radius.md,
      background: theme.colors.surface,
    }}>
      {file.thumbnail ? (
        <img src={file.thumbnail} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: theme.radius.sm }} />
      ) : (
        <div style={{ 
          width: 48, 
          height: 48, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: theme.colors.background,
          borderRadius: theme.radius.sm,
          fontSize: '1.5rem',
        }}>
          {getIcon(file.type)}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file.name}
        </div>
        <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>
          {formatSize(file.size)}
        </div>
      </div>
      {widget.showActions !== false && (
        <div style={{ display: 'flex', gap: 4 }}>
          {widget.onPreviewAction && (
            <button
              onClick={() => onAction(widget.onPreviewAction)}
              style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              👁️
            </button>
          )}
          {widget.onDownloadAction && (
            <button
              onClick={() => onAction(widget.onDownloadAction)}
              style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ⬇️
            </button>
          )}
          {widget.onDeleteAction && (
            <button
              onClick={() => onAction(widget.onDeleteAction)}
              style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.error }}
            >
              🗑️
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function CodeWidget_({ widget }: { widget: any }) {
  const [copied, setCopied] = React.useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(widget.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const lines = widget.code.split('\n')
  
  return (
    <div style={{ 
      background: widget.theme === 'dark' ? '#1e1e1e' : '#f6f8fa', 
      borderRadius: styles.radius.md,
      overflow: 'hidden',
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      fontSize: sizeMap.sm,
    }}>
      {widget.filename && (
        <div style={{ 
          padding: '8px 12px', 
          borderBottom: `1px solid ${widget.theme === 'dark' ? '#333' : '#e1e4e8'}`,
          color: widget.theme === 'dark' ? '#8b949e' : '#6a737d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{widget.filename}</span>
          {widget.copyable !== false && (
            <button 
              onClick={handleCopy}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: 'inherit',
                fontSize: sizeMap.xs,
              }}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          )}
        </div>
      )}
      <div style={{ 
        padding: 12, 
        overflow: 'auto', 
        maxHeight: widget.maxHeight,
        color: widget.theme === 'dark' ? '#c9d1d9' : '#24292f',
      }}>
        <code style={{ whiteSpace: 'pre' }}>
          {widget.showLineNumbers !== false ? (
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                {lines.map((line: string, i: number) => {
                  const isHighlighted = widget.highlightLines?.includes(i + 1)
                  return (
                    <tr key={i} style={{ background: isHighlighted ? (widget.theme === 'dark' ? '#264f78' : '#fff8c5') : 'transparent' }}>
                      <td style={{ 
                        width: 40, 
                        color: widget.theme === 'dark' ? '#6e7681' : '#8b949e', 
                        textAlign: 'right', 
                        paddingRight: 12,
                        userSelect: 'none',
                      }}>
                        {i + 1}
                      </td>
                      <td style={{ whiteSpace: 'pre' }}>{line || ' '}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            widget.code
          )}
        </code>
      </div>
    </div>
  )
}

function CalendarWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [view, setView] = React.useState(widget.view ?? 'month')
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const events = widget.events ?? []
  
  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter((e: any) => e.start.startsWith(dateStr))
  }
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  
  return (
    <div style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.lg, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: `1px solid ${theme.colors.border}`,
      }}>
        {widget.showNav !== false && (
          <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: sizeMap.lg }}>←</button>
        )}
        <div style={{ fontWeight: 600 }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
        {widget.showNav !== false && (
          <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: sizeMap.lg }}>→</button>
        )}
      </div>
      
      {/* Day names */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `1px solid ${theme.colors.border}` }}>
        {dayNames.map((day, i) => (
          <div 
            key={day} 
            style={{ 
              padding: '8px 4px', 
              textAlign: 'center', 
              fontSize: sizeMap.xs, 
              fontWeight: 600,
              color: theme.colors.textSecondary,
              background: theme.colors.surface,
            }}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Days */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} style={{ height: 80, borderRight: `1px solid ${theme.colors.border}`, borderBottom: `1px solid ${theme.colors.border}` }} />
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const dayEvents = getEventsForDay(day)
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
          
          return (
            <div 
              key={day}
              onClick={() => widget.onDateSelectAction && onAction({ ...widget.onDateSelectAction, data: { date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}` } })}
              style={{ 
                height: 80, 
                padding: 4, 
                borderRight: `1px solid ${theme.colors.border}`, 
                borderBottom: `1px solid ${theme.colors.border}`,
                cursor: widget.onDateSelectAction ? 'pointer' : 'default',
                background: isToday ? '#ecfdf5' : 'transparent',
              }}
            >
              <div style={{ 
                width: 24, 
                height: 24, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '50%',
                background: isToday ? theme.colors.primary : 'transparent',
                color: isToday ? '#fff' : theme.colors.text,
                fontWeight: isToday ? 600 : 400,
                fontSize: sizeMap.sm,
              }}>
                {day}
              </div>
              <div style={{ marginTop: 2 }}>
                {dayEvents.slice(0, 2).map((event: any, j: number) => (
                  <div 
                    key={j}
                    onClick={(e) => {
                      e.stopPropagation()
                      widget.onEventClickAction && onAction({ ...widget.onEventClickAction, data: { eventId: event.id } })
                    }}
                    style={{ 
                      fontSize: 10, 
                      padding: '1px 4px', 
                      borderRadius: 2, 
                      marginBottom: 1,
                      background: event.color ?? theme.colors.primary,
                      color: '#fff',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div style={{ fontSize: 10, color: theme.colors.textSecondary }}>
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TimelineWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const isVertical = widget.orientation !== 'horizontal'
  
  return (
    <div style={{ 
      display: isVertical ? 'block' : 'flex',
      gap: isVertical ? 0 : 24,
      position: 'relative',
    }}>
      {widget.showLine !== false && (
        <div style={isVertical ? {
          position: 'absolute',
          left: 15,
          top: 24,
          bottom: 24,
          width: 2,
          background: widget.lineColor ?? theme.colors.border,
        } : {
          position: 'absolute',
          left: 40,
          right: 40,
          top: 15,
          height: 2,
          background: widget.lineColor ?? theme.colors.border,
        }} />
      )}
      
      {widget.items.map((item: any, i: number) => (
        <div 
          key={item.id ?? i}
          style={isVertical ? {
            display: 'flex',
            gap: 16,
            marginBottom: i < widget.items.length - 1 ? 24 : 0,
            position: 'relative',
          } : {
            flex: 1,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Icon/Dot */}
          <div style={isVertical ? {
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: item.completed ? theme.colors.success : item.current ? theme.colors.primary : theme.colors.surface,
            border: `2px solid ${item.completed ? theme.colors.success : item.current ? theme.colors.primary : theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: item.completed || item.current ? '#fff' : theme.colors.text,
            fontSize: sizeMap.sm,
            zIndex: 1,
          } : {
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: item.completed ? theme.colors.success : item.current ? theme.colors.primary : theme.colors.surface,
            border: `2px solid ${item.completed ? theme.colors.success : item.current ? theme.colors.primary : theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            color: item.completed || item.current ? '#fff' : theme.colors.text,
            fontSize: sizeMap.sm,
            zIndex: 1,
          }}>
            {item.icon ?? (item.completed ? '✓' : i + 1)}
          </div>
          
          {/* Content */}
          <div style={isVertical ? { flex: 1 } : { marginTop: 12 }}>
            <div style={{ fontWeight: 500 }}>{item.title}</div>
            {item.timestamp && (
              <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginTop: 2 }}>
                {item.timestamp}
              </div>
            )}
            {item.description && (
              <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary, marginTop: 4 }}>
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function KanbanWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  
  return (
    <div style={{ display: 'flex', gap: 16, overflow: 'auto', paddingBottom: 8 }}>
      {widget.columns.map((column: any) => (
        <div 
          key={column.id}
          style={{ 
            width: 280, 
            minWidth: 280,
            flexShrink: 0,
            background: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: 12,
          }}
        >
          {/* Column Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                background: column.color ?? theme.colors.primary,
              }} />
              <span style={{ fontWeight: 600 }}>{column.title}</span>
              <span style={{ 
                fontSize: sizeMap.xs, 
                color: theme.colors.textSecondary,
                background: theme.colors.background,
                padding: '2px 6px',
                borderRadius: theme.radius.full,
              }}>
                {column.cards.length}
              </span>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.textSecondary }}>
              +
            </button>
          </div>
          
          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {column.cards.map((card: any) => (
              <div
                key={card.id}
                onClick={() => widget.onCardClickAction && onAction({ ...widget.onCardClickAction, data: { cardId: card.id, columnId: column.id } })}
                style={{
                  background: theme.colors.background,
                  borderRadius: theme.radius.md,
                  padding: 12,
                  cursor: widget.onCardClickAction ? 'pointer' : 'default',
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {card.label && (
                  <div style={{ 
                    fontSize: sizeMap.xs, 
                    color: card.labelColor ?? theme.colors.primary,
                    marginBottom: 4,
                  }}>
                    {card.label}
                  </div>
                )}
                <div style={{ fontWeight: 500 }}>{card.title}</div>
                {card.description && (
                  <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary, marginTop: 4 }}>
                    {card.description}
                  </div>
                )}
                {card.tags && card.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                    {card.tags.map((tag: string, j: number) => (
                      <span 
                        key={j}
                        style={{ 
                          fontSize: sizeMap.xs, 
                          padding: '2px 6px', 
                          background: theme.colors.surface, 
                          borderRadius: theme.radius.sm,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  {card.avatar && (
                    <img src={card.avatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                  )}
                  {card.dueDate && (
                    <span style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>
                      📅 {card.dueDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Add Card Button */}
          {widget.onAddCardAction && (
            <button
              onClick={() => onAction({ ...widget.onAddCardAction, data: { columnId: column.id } })}
              style={{
                width: '100%',
                padding: 8,
                marginTop: 8,
                background: 'transparent',
                border: `1px dashed ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                color: theme.colors.textSecondary,
                fontSize: sizeMap.sm,
              }}
            >
              + Add card
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function StatsWidget_({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)
  
  const sizeStyles: Record<string, any> = {
    sm: { padding: 12, valueSize: sizeMap.xl, titleSize: sizeMap.xs },
    md: { padding: 16, valueSize: sizeMap['2xl'], titleSize: sizeMap.sm },
    lg: { padding: 20, valueSize: sizeMap['3xl'], titleSize: sizeMap.md },
  }
  
  const style = sizeStyles[widget.size ?? 'md']
  
  return (
    <div style={{ 
      padding: style.padding,
      background: theme.colors.background,
      borderRadius: theme.radius.lg,
      border: `1px solid ${theme.colors.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          {widget.title && (
            <div style={{ fontSize: style.titleSize, color: theme.colors.textSecondary, marginBottom: 4 }}>
              {widget.title}
            </div>
          )}
          <div style={{ fontSize: style.valueSize, fontWeight: 700, color: widget.color ?? theme.colors.text }}>
            {widget.prefix}{widget.value}{widget.suffix}
          </div>
          {widget.change && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 4, 
              marginTop: 4,
              fontSize: sizeMap.sm,
            }}>
              <span style={{ color: widget.change.type === 'increase' ? theme.colors.success : theme.colors.error }}>
                {widget.change.type === 'increase' ? '↑' : '↓'} {Math.abs(widget.change.value)}%
              </span>
              {widget.change.period && (
                <span style={{ color: theme.colors.textSecondary }}>{widget.change.period}</span>
              )}
            </div>
          )}
        </div>
        {widget.icon && (
          <div style={{ 
            fontSize: sizeMap.xl, 
            padding: 8, 
            background: theme.colors.surface, 
            borderRadius: theme.radius.md,
          }}>
            {widget.icon}
          </div>
        )}
      </div>
      {widget.sparkline && widget.sparkline.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <Sparkline data={widget.sparkline} color={widget.color ?? theme.colors.primary} height={40} />
        </div>
      )}
    </div>
  )
}

function Sparkline({ data, color, height }: { data: number[]; color: string; height: number }) {
  const width = 100
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CommentsWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [newComment, setNewComment] = React.useState('')
  
  return (
    <div>
      {/* Comment Input */}
      <div style={{ marginBottom: 16 }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={widget.placeholder ?? 'Add a comment...'}
          rows={2}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: theme.radius.md,
            border: `1px solid ${theme.colors.border}`,
            fontSize: sizeMap.sm,
            resize: 'none',
          }}
        />
        {newComment && (
          <button
            onClick={() => {
              widget.onSubmitAction && onAction({ ...widget.onSubmitAction, data: { content: newComment } })
              setNewComment('')
            }}
            style={{
              marginTop: 8,
              padding: '6px 16px',
              borderRadius: theme.radius.md,
              border: 'none',
              background: theme.colors.primary,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Post
          </button>
        )}
      </div>
      
      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {widget.comments.map((comment: any) => (
          <div key={comment.id} style={{ display: 'flex', gap: 12 }}>
            {comment.author.avatar ? (
              <img src={comment.author.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
            ) : (
              <div style={{ 
                width: 36, 
                height: 36, 
                borderRadius: '50%', 
                background: theme.colors.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
              }}>
                {comment.author.name.charAt(0)}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 500 }}>{comment.author.name}</span>
                <span style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>{comment.timestamp}</span>
              </div>
              <div style={{ marginTop: 4 }}>{comment.content}</div>
              {widget.allowLikes && (
                <button style={{ 
                  marginTop: 4, 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: sizeMap.xs,
                  color: theme.colors.textSecondary,
                }}>
                  ❤️ {comment.likes ?? 0}
                </button>
              )}
              {comment.replies && comment.replies.length > 0 && (
                <div style={{ marginTop: 8, marginLeft: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {comment.replies.map((reply: any) => (
                    <div key={reply.id} style={{ display: 'flex', gap: 8 }}>
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        background: theme.colors.surface,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: sizeMap.xs,
                      }}>
                        {reply.author.name.charAt(0)}
                      </div>
                      <div>
                        <span style={{ fontWeight: 500, fontSize: sizeMap.sm }}>{reply.author.name}</span>
                        <span style={{ marginLeft: 8, fontSize: sizeMap.sm }}>{reply.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SocialShareWidget_({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)
  const [copied, setCopied] = React.useState(false)
  
  const platforms: Record<string, any> = {
    twitter: { icon: '𝕏', color: '#000', getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    facebook: { icon: 'f', color: '#1877f2', getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    linkedin: { icon: 'in', color: '#0a66c2', getUrl: (url: string, title: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
    whatsapp: { icon: '💬', color: '#25d366', getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}` },
    telegram: { icon: '✈️', color: '#0088cc', getUrl: (url: string, title: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    email: { icon: '✉️', color: '#666', getUrl: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(widget.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const activePlatforms = widget.platforms ?? ['twitter', 'facebook', 'linkedin', 'whatsapp', 'email']
  
  if (widget.style === 'dropdown') {
    return (
      <div style={{ position: 'relative' }}>
        <button style={{ 
          padding: '8px 16px', 
          borderRadius: theme.radius.md, 
          border: `1px solid ${theme.colors.border}`,
          background: theme.colors.background,
          cursor: 'pointer',
        }}>
          Share ▼
        </button>
      </div>
    )
  }
  
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {activePlatforms.map((platform: string) => {
        const p = platforms[platform]
        if (!p) return null
        
        return (
          <a
            key={platform}
            href={p.getUrl(widget.url, widget.title ?? '')}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: widget.size === 'sm' ? 28 : widget.size === 'lg' ? 44 : 36,
              height: widget.size === 'sm' ? 28 : widget.size === 'lg' ? 44 : 36,
              borderRadius: theme.radius.md,
              background: p.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontSize: widget.size === 'sm' ? sizeMap.sm : sizeMap.md,
              fontWeight: 600,
            }}
          >
            {p.icon}
          </a>
        )
      })}
      {activePlatforms.includes('copy') && (
        <button
          onClick={handleCopy}
          style={{
            width: widget.size === 'sm' ? 28 : widget.size === 'lg' ? 44 : 36,
            height: widget.size === 'sm' ? 28 : widget.size === 'lg' ? 44 : 36,
            borderRadius: theme.radius.md,
            border: `1px solid ${theme.colors.border}`,
            background: copied ? theme.colors.success : theme.colors.background,
            color: copied ? '#fff' : theme.colors.text,
            cursor: 'pointer',
          }}
        >
          {copied ? '✓' : '📋'}
        </button>
      )}
    </div>
  )
}

function ComparisonWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  
  return (
    <div style={{ overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: sizeMap.sm }}>
        <thead>
          <tr>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: `2px solid ${theme.colors.border}` }}>
              Feature
            </th>
            {widget.items.map((item: any) => (
              <th 
                key={item.id}
                style={{ 
                  padding: 12, 
                  textAlign: 'center', 
                  borderBottom: `2px solid ${theme.colors.border}`,
                  background: item.recommended ? '#ecfdf5' : 'transparent',
                  position: 'relative',
                }}
              >
                {item.recommended && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    background: theme.colors.primary, 
                    color: '#fff',
                    fontSize: sizeMap.xs,
                    padding: '2px 0',
                  }}>
                    Recommended
                  </div>
                )}
                {item.image && (
                  <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: theme.radius.md }} />
                )}
                <div style={{ fontWeight: 600, marginTop: 8 }}>{item.title}</div>
                {item.badge && (
                  <BadgeWidget widget={{ type: 'Badge', label: item.badge, color: 'primary', size: 'xs' }} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {widget.features.map((feature: any, i: number) => (
            <tr key={i} style={{ background: i % 2 === 1 ? theme.colors.surface : 'transparent' }}>
              <td style={{ padding: 12, fontWeight: 500 }}>{feature.label}</td>
              {widget.items.map((item: any) => {
                const value = item.features[feature.key]
                return (
                  <td key={item.id} style={{ padding: 12, textAlign: 'center' }}>
                    {typeof value === 'boolean' ? (
                      <span style={{ color: value ? theme.colors.success : theme.colors.error, fontSize: sizeMap.lg }}>
                        {value ? '✓' : '✕'}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
          {widget.onSelectAction && (
            <tr>
              <td style={{ padding: 12 }}></td>
              {widget.items.map((item: any) => (
                <td key={item.id} style={{ padding: 12, textAlign: 'center' }}>
                  <button
                    onClick={() => onAction({ ...widget.onSelectAction, data: { itemId: item.id } })}
                    style={{
                      padding: '8px 16px',
                      borderRadius: theme.radius.md,
                      border: 'none',
                      background: item.recommended ? theme.colors.primary : theme.colors.surface,
                      color: item.recommended ? '#fff' : theme.colors.text,
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    Select
                  </button>
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function CountdownWidget_({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())
  
  function calculateTimeLeft() {
    const difference = new Date(widget.targetDate).getTime() - new Date().getTime()
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    }
  }
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      if (newTimeLeft.expired) {
        clearInterval(timer)
        widget.onCompleteAction && onAction(widget.onCompleteAction)
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [widget.targetDate])
  
  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        fontSize: sizeMap['3xl'], 
        fontWeight: 700,
        background: theme.colors.surface,
        padding: '12px 16px',
        borderRadius: theme.radius.md,
        minWidth: 70,
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginTop: 4 }}>
        {label}
      </div>
    </div>
  )
  
  if (timeLeft.expired) {
    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <div style={{ fontSize: sizeMap.xl, fontWeight: 600, color: theme.colors.success }}>
          ⏰ Time's up!
        </div>
      </div>
    )
  }
  
  return (
    <div style={{ textAlign: 'center' }}>
      {widget.title && (
        <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 16 }}>
          {widget.title}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        {(widget.showDays !== false) && <TimeBlock value={timeLeft.days} label="Days" />}
        {(widget.showHours !== false) && <TimeBlock value={timeLeft.hours} label="Hours" />}
        {(widget.showMinutes !== false) && <TimeBlock value={timeLeft.minutes} label="Minutes" />}
        {(widget.showSeconds !== false) && <TimeBlock value={timeLeft.seconds} label="Seconds" />}
      </div>
    </div>
  )
}

// ============================================
// Media Widgets
// ============================================

function ImageWidget({ widget }: { widget: any }) {
  return (
    <img
      src={widget.src}
      alt={widget.alt ?? ''}
      width={widget.width}
      height={widget.height}
      style={{
        objectFit: widget.fit ?? 'cover',
        borderRadius: widget.radius ? styles.radius[widget.radius] : styles.radius.md,
        maxWidth: '100%',
      }}
    />
  )
}

function IconWidget({ widget }: { widget: any }) {
  // Simple emoji-based icons (can be replaced with icon library)
  const iconMap: Record<string, string> = {
    check: '✓',
    close: '✕',
    plus: '+',
    minus: '−',
    arrow_right: '→',
    arrow_left: '←',
    cart: '🛒',
    user: '👤',
    search: '🔍',
    home: '🏠',
    settings: '⚙️',
    mail: '✉️',
    phone: '📞',
    star: '★',
    heart: '♥',
    warning: '⚠',
    info: 'ℹ',
    error: '✕',
    success: '✓',
  }

  return (
    <span
      style={{
        fontSize: widget.size ? sizeMap[widget.size] : sizeMap.md,
        color: widget.color,
        animation: widget.spin ? 'spin 1s linear infinite' : undefined,
      }}
    >
      {iconMap[widget.name] ?? widget.name}
    </span>
  )
}

function AvatarWidget({ widget }: { widget: any }) {
  const sizePx = widget.size === 'xs' ? 24 : widget.size === 'sm' ? 32 : widget.size === 'lg' ? 48 : widget.size === 'xl' ? 64 : widget.size === '2xl' ? 96 : 40
  
  const initials = widget.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return widget.src ? (
    <img
      src={widget.src}
      alt={widget.name ?? ''}
      width={sizePx}
      height={sizePx}
      style={{
        borderRadius: widget.shape === 'square' ? styles.radius.md : '50%',
        objectFit: 'cover',
      }}
    />
  ) : (
    <div
      style={{
        width: sizePx,
        height: sizePx,
        borderRadius: widget.shape === 'square' ? styles.radius.md : '50%',
        background: styles.colors.primary,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: sizePx * 0.4,
        fontWeight: 600,
      }}
    >
      {initials}
    </div>
  )
}

// ============================================
// List Widgets
// ============================================

function ListViewWidget({ widget }: { widget: any }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: widget.gap ?? 4 }}>
      {widget.children?.map((child: Widget, i: number) => (
        <React.Fragment key={i}>
          <RenderWidget widget={child} />
          {widget.divider && i < widget.children.length - 1 && (
            <div style={{ borderBottom: `1px solid ${styles.colors.border}` }} />
          )}
        </React.Fragment>
      ))}
      {widget.loading && <SpinnerWidget widget={{ type: 'Spinner' }} />}
      {(!widget.children || widget.children.length === 0) && widget.emptyText && (
        <div style={{ textAlign: 'center', color: styles.colors.textSecondary, padding: 16 }}>
          {widget.emptyText}
        </div>
      )}
    </div>
  )
}

function ListViewItemWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <div
      onClick={() => widget.onClickAction && onAction(widget.onClickAction)}
      style={{
        display: 'flex',
        gap: widget.gap ?? 8,
        padding: widget.padding ?? 12,
        background: widget.background ?? (widget.selected ? theme.colors.surface : 'transparent'),
        border: widget.border ? `${widget.border.size}px solid ${widget.border.color}` : undefined,
        cursor: widget.onClickAction ? 'pointer' : 'default',
        opacity: widget.disabled ? 0.6 : 1,
        transition: 'background 0.2s',
      }}
    >
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
    </div>
  )
}

function TableWidget({ widget }: { widget: any }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: sizeMap.sm }}>
        <thead>
          <tr>
            {widget.columns.map((col: any, i: number) => (
              <th
                key={i}
                style={{
                  textAlign: col.align ?? 'left',
                  padding: '12px',
                  borderBottom: `2px solid ${styles.colors.border}`,
                  fontWeight: 600,
                  width: col.width,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {widget.rows.map((row: any, i: number) => (
            <tr
              key={i}
              style={{
                background: widget.striped && i % 2 === 1 ? styles.colors.surface : 'transparent',
              }}
            >
              {widget.columns.map((col: any, j: number) => (
                <td
                  key={j}
                  style={{
                    textAlign: col.align ?? 'left',
                    padding: '12px',
                    borderBottom: widget.bordered ? `1px solid ${styles.colors.border}` : undefined,
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================
// Feedback Widgets
// ============================================

function ProgressWidget({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)
  const value = widget.value ?? 0
  const max = widget.max ?? 100
  const percent = (value / max) * 100

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: widget.size === 'sm' ? 4 : widget.size === 'lg' ? 12 : 8,
          background: theme.colors.surface,
          borderRadius: theme.radius.full,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: widget.color ?? theme.colors.primary,
            transition: 'width 0.3s',
            borderRadius: theme.radius.full,
          }}
        />
      </div>
      {widget.showLabel && (
        <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginTop: 4 }}>
          {Math.round(percent)}%
        </div>
      )}
    </div>
  )
}

function SpinnerWidget({ widget }: { widget: any }) {
  const size = widget.size === 'sm' ? 16 : widget.size === 'lg' ? 32 : widget.size === 'xl' ? 48 : 24
  
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `3px solid ${styles.colors.border}`,
        borderTopColor: widget.color ?? styles.colors.primary,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  )
}

function AlertWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  
  const severityStyles: Record<string, any> = {
    success: { bg: '#dcfce7', color: theme.colors.success, icon: '✓' },
    info: { bg: '#dbeafe', color: theme.colors.info, icon: 'ℹ' },
    warning: { bg: '#fef3c7', color: theme.colors.warning, icon: '⚠' },
    error: { bg: '#fee2e2', color: theme.colors.error, icon: '✕' },
  }

  const style = severityStyles[widget.severity ?? 'info']

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: 16,
        borderRadius: theme.radius.md,
        background: style.bg,
        borderLeft: `4px solid ${style.color}`,
      }}
    >
      {widget.icon !== false && <span style={{ color: style.color, fontSize: sizeMap.lg }}>{style.icon}</span>}
      <div style={{ flex: 1 }}>
        {widget.title && <div style={{ fontWeight: 600, marginBottom: 4 }}>{widget.title}</div>}
        <div style={{ color: theme.colors.text }}>{widget.message}</div>
      </div>
      {widget.closable && (
        <button
          onClick={() => widget.onCloseAction && onAction(widget.onCloseAction)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: sizeMap.lg }}
        >
          ×
        </button>
      )}
    </div>
  )
}

function ConfirmationWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  
  const iconMap: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      {widget.icon && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: widget.icon === 'success' ? '#dcfce7' : widget.icon === 'error' ? '#fee2e2' : '#dbeafe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '2rem',
          }}
        >
          {iconMap[widget.icon]}
        </div>
      )}
      <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 8 }}>{widget.title}</div>
      {widget.message && <div style={{ color: theme.colors.textSecondary, marginBottom: 16 }}>{widget.message}</div>}
      {widget.details && (
        <div style={{ background: theme.colors.surface, padding: 12, borderRadius: theme.radius.md, marginBottom: 16 }}>
          {widget.details.map((detail: any, i: number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ color: theme.colors.textSecondary }}>{detail.label}</span>
              <span style={{ fontWeight: 500 }}>{detail.value}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {widget.secondaryAction && (
          <button
            onClick={() => onAction(widget.secondaryAction.onClickAction)}
            style={{
              padding: '8px 16px',
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {widget.secondaryAction.label}
          </button>
        )}
        {widget.primaryAction && (
          <button
            onClick={() => onAction(widget.primaryAction.onClickAction)}
            style={{
              padding: '8px 16px',
              borderRadius: theme.radius.md,
              border: 'none',
              background: theme.colors.primary,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {widget.primaryAction.label}
          </button>
        )}
      </div>
    </div>
  )
}

function SuccessWidget({ widget }: { widget: any }) {
  return (
    <ConfirmationWidget
      widget={{
        ...widget,
        icon: 'success',
        title: widget.title ?? 'Success!',
      }}
    />
  )
}

function ErrorWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#fee2e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '2rem',
          color: theme.colors.error,
        }}
      >
        ✕
      </div>
      <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 8 }}>
        {widget.title ?? 'Something went wrong'}
      </div>
      {widget.message && <div style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>{widget.message}</div>}
      {widget.code && (
        <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginBottom: 16 }}>
          Error code: {widget.code}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {widget.retryAction && (
          <button
            onClick={() => onAction(widget.retryAction)}
            style={{
              padding: '8px 16px',
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        )}
        {widget.supportAction && (
          <button
            onClick={() => onAction(widget.supportAction)}
            style={{
              padding: '8px 16px',
              borderRadius: theme.radius.md,
              border: 'none',
              background: theme.colors.primary,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Contact Support
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================
// Navigation Widgets
// ============================================

function SearchWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [value, setValue] = React.useState(widget.value ?? '')
  const [focused, setFocused] = React.useState(false)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: theme.radius.full,
          border: `1px solid ${focused ? theme.colors.primary : theme.colors.border}`,
          background: theme.colors.surface,
        }}
      >
        <span style={{ color: theme.colors.textSecondary }}>🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && widget.onSearchAction) {
              onAction({ ...widget.onSearchAction, data: { query: value } })
            }
          }}
          placeholder={widget.placeholder ?? 'Search...'}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: sizeMap.sm,
          }}
        />
        {value && widget.onClearAction && (
          <button
            onClick={() => {
              setValue('')
              onAction(widget.onClearAction)
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.textSecondary }}
          >
            ×
          </button>
        )}
      </div>
      {widget.suggestions && focused && (
        <div
          style={{
            marginTop: 4,
            background: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.md,
            overflow: 'hidden',
          }}
        >
          {widget.suggestions.map((s: any, i: number) => (
            <div
              key={i}
              onClick={() => {
                setValue(s.text)
                s.onClickAction && onAction(s.onClickAction)
              }}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: i < widget.suggestions.length - 1 ? `1px solid ${theme.colors.border}` : undefined,
              }}
            >
              {s.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BreadcrumbWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: sizeMap.sm }}>
      {widget.items.map((item: any, i: number) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: theme.colors.textSecondary }}>{widget.separator ?? '/'}</span>}
          <span
            onClick={() => item.onClickAction && onAction(item.onClickAction)}
            style={{
              cursor: item.onClickAction ? 'pointer' : 'default',
              color: i === widget.items.length - 1 ? theme.colors.text : theme.colors.textSecondary,
            }}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

function StepperWidget({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      {widget.steps.map((step: any, i: number) => (
        <React.Fragment key={i}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background:
                  widget.completed?.includes(i) || i < (widget.activeStep ?? 0)
                    ? theme.colors.primary
                    : i === widget.activeStep
                    ? theme.colors.primary
                    : theme.colors.surface,
                color: i <= (widget.activeStep ?? 0) ? '#fff' : theme.colors.textSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: sizeMap.sm,
                fontWeight: 600,
                border: `2px solid ${i <= (widget.activeStep ?? 0) ? theme.colors.primary : theme.colors.border}`,
              }}
            >
              {widget.completed?.includes(i) ? '✓' : step.icon ?? i + 1}
            </div>
            <span
              style={{
                fontSize: sizeMap.xs,
                color: i === widget.activeStep ? theme.colors.text : theme.colors.textSecondary,
                fontWeight: i === widget.activeStep ? 600 : 400,
              }}
            >
              {step.label}
            </span>
          </div>
          {i < widget.steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                background: i < (widget.activeStep ?? 0) ? theme.colors.primary : theme.colors.border,
                marginTop: 15,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

// ============================================
// Auth Widgets
// ============================================

function LoginWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [formData, setFormData] = React.useState<Record<string, string>>({})

  return (
    <CardWidget widget={{ type: 'Card', padding: 24, children: [
      { type: 'Col', gap: 16, children: [
        ...(widget.title ? [{ type: 'Title', value: widget.title, size: 'lg' as const }] : []),
        ...(widget.subtitle ? [{ type: 'Text', value: widget.subtitle, color: theme.colors.textSecondary }] : []),
        ...widget.fields.map((field: any) => ({
          type: 'input',
          props: field,
        })),
        { type: 'Button', label: widget.submitLabel ?? 'Sign In', style: 'primary', block: true, onClickAction: widget.onSubmitAction },
        ...(widget.forgotPasswordAction ? [{ type: 'Text', value: 'Forgot password?', onClickAction: widget.forgotPasswordAction }] : []),
        ...(widget.socialLogins ? [
          { type: 'Divider', spacing: 16 },
          { type: 'Row', justify: 'center' as const, gap: 8, children: widget.socialLogins.map((s: any) => ({
            type: 'Button',
            label: s.label,
            style: 'outline',
            onClickAction: s.onClickAction,
          } as Widget)) },
        ] : []),
        ...(widget.signupAction ? [
          { type: 'Text', value: "Don't have an account? ", textAlign: 'center' as const, children: [
            { type: 'Text', value: 'Sign up', onClickAction: widget.signupAction, color: theme.colors.primary },
          ] as Widget[] },
        ] : []),
      ] as Widget[] },
    ] as Widget[] }} />
  )
}

function VerifyOTPWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [otp, setOtp] = React.useState<string[]>(Array(widget.length ?? 6).fill(''))
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.every(d => d) && widget.verifyAction) {
      onAction({ ...widget.verifyAction, data: { otp: newOtp.join('') } })
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 8 }}>{widget.title}</div>}
      {widget.subtitle && <div style={{ color: theme.colors.textSecondary, marginBottom: 24 }}>{widget.subtitle}</div>}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            style={{
              width: 48,
              height: 56,
              textAlign: 'center',
              fontSize: sizeMap.xl,
              fontWeight: 600,
              border: `2px solid ${digit ? theme.colors.primary : theme.colors.border}`,
              borderRadius: theme.radius.md,
              outline: 'none',
            }}
          />
        ))}
      </div>
      {widget.resendAction && (
        <button
          onClick={() => onAction(widget.resendAction)}
          style={{ background: 'none', border: 'none', color: theme.colors.primary, cursor: 'pointer', fontSize: sizeMap.sm }}
        >
          Resend code
        </button>
      )}
    </div>
  )
}

function RegisterWidget({ widget }: { widget: any }) {
  // Similar to LoginWidget but with more fields
  return (
    <div style={{ padding: 24 }}>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 8 }}>{widget.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {widget.fields.map((field: any, i: number) => (
          <input
            key={i}
            type={field.type}
            placeholder={field.placeholder ?? field.label}
            required={field.required}
            style={{
              padding: '12px 16px',
              borderRadius: styles.radius.md,
              border: `1px solid ${styles.colors.border}`,
              fontSize: sizeMap.sm,
            }}
          />
        ))}
        <button
          onClick={() => widget.onSubmitAction && React.useContext(WidgetContext).onAction(widget.onSubmitAction)}
          style={{
            padding: '12px',
            borderRadius: styles.radius.md,
            border: 'none',
            background: styles.colors.primary,
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {widget.submitLabel ?? 'Create Account'}
        </button>
        {widget.loginAction && (
          <div style={{ textAlign: 'center', fontSize: sizeMap.sm, color: styles.colors.textSecondary }}>
            Already have an account?{' '}
            <button
              onClick={() => React.useContext(WidgetContext).onAction(widget.loginAction)}
              style={{ background: 'none', border: 'none', color: styles.colors.primary, cursor: 'pointer' }}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Address Widgets
// ============================================

function AddressFormWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const fields = widget.fields ?? {
    fullName: true,
    phone: true,
    street: true,
    city: true,
    state: true,
    zip: true,
    country: true,
    isDefault: true,
  }

  return (
    <div style={{ padding: 16 }}>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 16 }}>{widget.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {fields.fullName && (
          <input
            type="text"
            placeholder="Full Name"
            style={{
              padding: '10px 12px',
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              fontSize: sizeMap.sm,
            }}
          />
        )}
        {fields.phone && (
          <input
            type="tel"
            placeholder="Phone Number"
            style={{
              padding: '10px 12px',
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              fontSize: sizeMap.sm,
            }}
          />
        )}
        {fields.street && (
          <input
            type="text"
            placeholder="Street Address"
            style={{
              padding: '10px 12px',
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              fontSize: sizeMap.sm,
            }}
          />
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          {fields.city && (
            <input
              type="text"
              placeholder="City"
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                fontSize: sizeMap.sm,
              }}
            />
          )}
          {fields.state && (
            <input
              type="text"
              placeholder="State"
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                fontSize: sizeMap.sm,
              }}
            />
          )}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {fields.zip && (
            <input
              type="text"
              placeholder="ZIP Code"
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                fontSize: sizeMap.sm,
              }}
            />
          )}
          {fields.country && (
            <input
              type="text"
              placeholder="Country"
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                fontSize: sizeMap.sm,
              }}
            />
          )}
        </div>
        {fields.isDefault && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" />
            <span style={{ fontSize: sizeMap.sm }}>Set as default address</span>
          </label>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {widget.cancelAction && (
            <button
              onClick={() => onAction(widget.cancelAction)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => widget.onSubmitAction && onAction(widget.onSubmitAction)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: theme.radius.md,
              border: 'none',
              background: theme.colors.primary,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {widget.submitLabel ?? 'Save Address'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AddressListWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <div>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 12 }}>{widget.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {widget.addresses.map((addr: any, i: number) => (
          <div
            key={addr.id}
            onClick={() => widget.onSelectAction && onAction({ ...widget.onSelectAction, data: { id: addr.id } })}
            style={{
              padding: 16,
              border: `1px solid ${addr.isDefault ? theme.colors.primary : theme.colors.border}`,
              borderRadius: theme.radius.md,
              cursor: widget.onSelectAction ? 'pointer' : 'default',
              position: 'relative',
            }}
          >
            {addr.isDefault && (
              <BadgeWidget widget={{ type: 'Badge', label: 'Default', color: 'primary', size: 'xs' }} />
            )}
            <div style={{ fontWeight: 500 }}>{addr.name}</div>
            {addr.phone && <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary }}>{addr.phone}</div>}
            <div style={{ fontSize: sizeMap.sm, marginTop: 4 }}>
              {addr.street}, {addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.zip}
            </div>
            <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary }}>{addr.country}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {widget.onEditAction && (
                <button
                  onClick={(e) => { e.stopPropagation(); onAction({ ...widget.onEditAction, data: { id: addr.id } }) }}
                  style={{ background: 'none', border: 'none', color: theme.colors.primary, cursor: 'pointer', fontSize: sizeMap.sm }}
                >
                  Edit
                </button>
              )}
              {widget.onDeleteAction && (
                <button
                  onClick={(e) => { e.stopPropagation(); onAction({ ...widget.onDeleteAction, data: { id: addr.id } }) }}
                  style={{ background: 'none', border: 'none', color: theme.colors.error, cursor: 'pointer', fontSize: sizeMap.sm }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {widget.onAddAction && (
          <button
            onClick={() => onAction(widget.onAddAction)}
            style={{
              padding: 12,
              border: `2px dashed ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              background: 'transparent',
              cursor: 'pointer',
              color: theme.colors.textSecondary,
            }}
          >
            + Add New Address
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================
// E-Commerce Widgets
// ============================================

function ProductCardWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <div
      onClick={() => widget.onClickAction && onAction(widget.onClickAction)}
      style={{
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        overflow: 'hidden',
        cursor: widget.onClickAction ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={widget.image}
          alt={widget.title}
          style={{ width: '100%', height: 200, objectFit: 'cover' }}
        />
        {widget.badge && (
          <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <BadgeWidget widget={{ type: 'Badge', label: widget.badge, color: 'warning' }} />
          </div>
        )}
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 500, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {widget.title}
        </div>
        {widget.subtitle && (
          <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginBottom: 4 }}>
            {widget.subtitle}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontWeight: 600, color: theme.colors.primary }}>
            {widget.currency ?? '$'}{widget.price}
          </span>
          {widget.originalPrice && (
            <span style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary, textDecoration: 'line-through' }}>
              {widget.currency ?? '$'}{widget.originalPrice}
            </span>
          )}
        </div>
        {widget.rating !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <RatingWidget widget={{ type: 'Rating', value: widget.rating, readonly: true, size: 'sm' }} />
            <span style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>
              ({widget.reviews ?? 0})
            </span>
          </div>
        )}
        {widget.inStock === false && (
          <div style={{ fontSize: sizeMap.sm, color: theme.colors.error }}>Out of Stock</div>
        )}
        {widget.onAddToCartAction && widget.inStock !== false && (
          <button
            onClick={(e) => { e.stopPropagation(); onAction(widget.onAddToCartAction) }}
            style={{
              width: '100%',
              padding: '8px',
              border: 'none',
              borderRadius: theme.radius.md,
              background: theme.colors.primary,
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

function ProductGridWidget({ widget }: { widget: any }) {
  return (
    <div>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 16 }}>{widget.title}</div>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${widget.columns ?? 3}, 1fr)`,
          gap: 16,
        }}
      >
        {widget.products?.map((product: any, i: number) => (
          <ProductCardWidget key={i} widget={product} />
        ))}
      </div>
      {widget.loading && <SpinnerWidget widget={{ type: 'Spinner' }} />}
      {widget.onLoadMoreAction && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <ButtonWidget widget={{ type: 'Button', label: 'Load More', style: 'outline', onClickAction: widget.onLoadMoreAction }} />
        </div>
      )}
    </div>
  )
}

function OrderSummaryWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const currency = widget.currency ?? '$'

  return (
    <div style={{ padding: 16, background: theme.colors.surface, borderRadius: theme.radius.lg }}>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 12 }}>{widget.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {widget.items?.map((item: any, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            {item.image && (
              <img src={item.image} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: theme.radius.sm }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{item.name}</div>
              <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>
                Qty: {item.quantity} • {currency}{item.price}
              </div>
            </div>
            <div style={{ fontWeight: 500 }}>{currency}{item.price * item.quantity}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.colors.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ color: theme.colors.textSecondary }}>Subtotal</span>
          <span>{currency}{widget.subtotal}</span>
        </div>
        {widget.shipping !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ color: theme.colors.textSecondary }}>Shipping</span>
            <span>{widget.shipping === 0 ? 'Free' : `${currency}${widget.shipping}`}</span>
          </div>
        )}
        {widget.tax !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ color: theme.colors.textSecondary }}>Tax</span>
            <span>{currency}{widget.tax}</span>
          </div>
        )}
        {widget.discount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: theme.colors.success }}>
            <span>Discount</span>
            <span>-{currency}{widget.discount}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: `1px solid ${theme.colors.border}`, fontWeight: 600, fontSize: sizeMap.lg }}>
          <span>Total</span>
          <span>{currency}{widget.total}</span>
        </div>
      </div>
      {widget.onApplyPromoAction && (
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <input
            type="text"
            placeholder="Promo code"
            defaultValue={widget.promoCode}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              fontSize: sizeMap.sm,
            }}
          />
          <button
            onClick={() => onAction(widget.onApplyPromoAction)}
            style={{
              padding: '8px 16px',
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  )
}

function OrderTrackingWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  const statusColors: Record<string, string> = {
    processing: theme.colors.info,
    confirmed: theme.colors.info,
    shipped: theme.colors.warning,
    out_for_delivery: theme.colors.warning,
    delivered: theme.colors.success,
    cancelled: theme.colors.error,
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary }}>Order #{widget.orderId}</div>
          <BadgeWidget widget={{ type: 'Badge', label: widget.status.replace('_', ' ').toUpperCase(), color: statusColors[widget.status] ?? 'secondary' }} />
        </div>
        {widget.estimatedDelivery && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>Estimated Delivery</div>
            <div style={{ fontWeight: 500 }}>{widget.estimatedDelivery}</div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {widget.timeline?.map((event: any, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: event.completed ? theme.colors.primary : event.current ? theme.colors.primary : theme.colors.border,
                  border: event.current ? `3px solid ${theme.colors.surface}` : undefined,
                }}
              />
              {i < widget.timeline.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 40,
                    background: event.completed ? theme.colors.primary : theme.colors.border,
                  }}
                />
              )}
            </div>
            <div style={{ paddingBottom: 24 }}>
              <div style={{ fontWeight: event.current ? 600 : 400 }}>{event.status}</div>
              {event.description && (
                <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary }}>{event.description}</div>
              )}
              <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>{event.timestamp}</div>
              {event.location && (
                <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>📍 {event.location}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {widget.onContactAction && (
          <ButtonWidget widget={{ type: 'Button', label: 'Contact Support', style: 'outline', onClickAction: widget.onContactAction }} />
        )}
        {widget.onTrackAction && (
          <ButtonWidget widget={{ type: 'Button', label: 'Track on Map', style: 'primary', onClickAction: widget.onTrackAction }} />
        )}
      </div>
    </div>
  )
}

function CheckoutWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <div>
      {widget.steps && (
        <div style={{ marginBottom: 24 }}>
          <StepperWidget widget={{ type: 'Stepper', steps: widget.steps, activeStep: widget.steps.findIndex((s: any) => s.id === widget.currentStep) }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          {widget.shippingAddress}
          {widget.billingAddress}
          {widget.paymentMethod}
        </div>
        <div style={{ width: 300 }}>
          {widget.orderSummary}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'flex-end' }}>
        {widget.onBackAction && (
          <ButtonWidget widget={{ type: 'Button', label: 'Back', style: 'outline', onClickAction: widget.onBackAction }} />
        )}
        {widget.onNextAction && (
          <ButtonWidget widget={{ type: 'Button', label: 'Continue', style: 'primary', onClickAction: widget.onNextAction }} />
        )}
        {widget.onSubmitAction && (
          <ButtonWidget widget={{ type: 'Button', label: 'Place Order', style: 'primary', onClickAction: widget.onSubmitAction }} />
        )}
      </div>
    </div>
  )
}

function PaymentMethodWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [selected, setSelected] = React.useState(widget.methods?.find((m: any) => m.selected)?.id)

  return (
    <div>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 12 }}>{widget.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {widget.methods?.map((method: any) => (
          <div
            key={method.id}
            onClick={() => {
              setSelected(method.id)
              widget.onSelectAction && onAction({ ...widget.onSelectAction, data: { methodId: method.id } })
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 16,
              border: `2px solid ${selected === method.id ? theme.colors.primary : theme.colors.border}`,
              borderRadius: theme.radius.md,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `2px solid ${selected === method.id ? theme.colors.primary : theme.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selected === method.id && (
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.colors.primary }} />
              )}
            </div>
            {method.icon && <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{method.label}</div>
              {method.details && <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary }}>{method.details}</div>}
            </div>
          </div>
        ))}
        {widget.onAddAction && (
          <button
            onClick={() => onAction(widget.onAddAction)}
            style={{
              padding: 12,
              border: `2px dashed ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              background: 'transparent',
              cursor: 'pointer',
              color: theme.colors.textSecondary,
            }}
          >
            + Add Payment Method
          </button>
        )}
      </div>
    </div>
  )
}

function InvoiceWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const currency = widget.currency ?? '$'

  const statusColors: Record<string, any> = {
    draft: 'secondary',
    pending: 'warning',
    paid: 'success',
    overdue: 'danger',
    cancelled: 'secondary',
  }

  return (
    <div style={{ padding: 24, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.lg }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary }}>Invoice</div>
          <div style={{ fontSize: sizeMap.xl, fontWeight: 600 }}>#{widget.invoiceNumber}</div>
        </div>
        <BadgeWidget widget={{ type: 'Badge', label: widget.status.toUpperCase(), color: statusColors[widget.status] ?? 'secondary' }} />
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginBottom: 4 }}>From</div>
          <div style={{ fontWeight: 500 }}>{widget.from.name}</div>
          {widget.from.email && <div style={{ fontSize: sizeMap.sm }}>{widget.from.email}</div>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginBottom: 4 }}>To</div>
          <div style={{ fontWeight: 500 }}>{widget.to.name}</div>
          {widget.to.email && <div style={{ fontSize: sizeMap.sm }}>{widget.to.email}</div>}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>Date</div>
          <div style={{ fontWeight: 500 }}>{widget.date}</div>
          {widget.dueDate && (
            <>
              <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginTop: 8 }}>Due</div>
              <div style={{ fontWeight: 500 }}>{widget.dueDate}</div>
            </>
          )}
        </div>
      </div>
      <TableWidget
        widget={{
          type: 'Table',
          columns: [
            { key: 'description', label: 'Description' },
            { key: 'quantity', label: 'Qty', align: 'center' },
            { key: 'unitPrice', label: 'Unit Price', align: 'right' },
            { key: 'total', label: 'Total', align: 'right' },
          ],
          rows: widget.items.map((item: any) => ({
            ...item,
            unitPrice: `${currency}${item.unitPrice}`,
            total: `${currency}${item.total}`,
          })),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <div style={{ width: 250 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ color: theme.colors.textSecondary }}>Subtotal</span>
            <span>{currency}{widget.subtotal}</span>
          </div>
          {widget.tax !== undefined && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ color: theme.colors.textSecondary }}>Tax</span>
              <span>{currency}{widget.tax}</span>
            </div>
          )}
          {widget.discount !== undefined && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: theme.colors.success }}>
              <span>Discount</span>
              <span>-{currency}{widget.discount}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${theme.colors.border}`, fontWeight: 600, fontSize: sizeMap.lg }}>
            <span>Total</span>
            <span>{currency}{widget.total}</span>
          </div>
        </div>
      </div>
      {widget.notes && (
        <div style={{ marginTop: 16, padding: 12, background: theme.colors.surface, borderRadius: theme.radius.md }}>
          <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginBottom: 4 }}>Notes</div>
          <div style={{ fontSize: sizeMap.sm }}>{widget.notes}</div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {widget.payAction && widget.status === 'pending' && (
          <ButtonWidget widget={{ type: 'Button', label: 'Pay Now', style: 'primary', onClickAction: widget.payAction }} />
        )}
        {widget.downloadAction && (
          <ButtonWidget widget={{ type: 'Button', label: 'Download PDF', style: 'outline', onClickAction: widget.downloadAction }} />
        )}
      </div>
    </div>
  )
}

// ============================================
// Category Widgets
// ============================================

function CategoryListWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)

  return (
    <div>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 12 }}>{widget.title}</div>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: widget.layout === 'list' ? '1fr' : 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 12,
        }}
      >
        {widget.categories?.map((cat: any) => (
          <div
            key={cat.id}
            onClick={() => widget.onSelectAction && onAction({ ...widget.onSelectAction, data: { id: cat.id } })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 12,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              cursor: widget.onSelectAction ? 'pointer' : 'default',
            }}
          >
            {cat.image && (
              <img src={cat.image} alt={cat.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: theme.radius.sm }} />
            )}
            {cat.icon && <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{cat.name}</div>
              {cat.count !== undefined && (
                <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary }}>{cat.count} items</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CategoryTreeWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set())

  return (
    <div>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 12 }}>{widget.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {widget.categories?.map((cat: any) => (
          <div key={cat.id}>
            <div
              onClick={() => {
                if (cat.children?.length) {
                  setExpanded(prev => {
                    const next = new Set(prev)
                    if (next.has(cat.id)) next.delete(cat.id)
                    else next.add(cat.id)
                    return next
                  })
                }
                widget.onSelectAction && onAction({ ...widget.onSelectAction, data: { id: cat.id } })
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: theme.radius.md,
                background: widget.activeCategory === cat.id ? theme.colors.surface : 'transparent',
                fontWeight: widget.activeCategory === cat.id ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {cat.children?.length && (
                <span style={{ width: 16 }}>{expanded.has(cat.id) ? '▼' : '▶'}</span>
              )}
              {!cat.children?.length && <span style={{ width: 16 }} />}
              {cat.icon && <span>{cat.icon}</span>}
              <span>{cat.name}</span>
            </div>
            {cat.children && expanded.has(cat.id) && (
              <div style={{ marginLeft: 24 }}>
                {cat.children.map((sub: any) => (
                  <div
                    key={sub.id}
                    onClick={() => widget.onSelectAction && onAction({ ...widget.onSelectAction, data: { id: sub.id, parentId: cat.id } })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 12px',
                      borderRadius: theme.radius.md,
                      background: widget.activeSubcategory === sub.id ? theme.colors.surface : 'transparent',
                      fontWeight: widget.activeSubcategory === sub.id ? 500 : 400,
                      cursor: 'pointer',
                      fontSize: sizeMap.sm,
                    }}
                  >
                    <span>{sub.name}</span>
                    {sub.count !== undefined && (
                      <span style={{ color: theme.colors.textSecondary }}>({sub.count})</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Support Widgets
// ============================================

function ContactFormWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [formData, setFormData] = React.useState<Record<string, string>>({})

  return (
    <div style={{ padding: 16 }}>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 4 }}>{widget.title}</div>}
      {widget.subtitle && <div style={{ color: theme.colors.textSecondary, marginBottom: 16 }}>{widget.subtitle}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(widget.fields ?? [
          { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
          { name: 'email', type: 'email', placeholder: 'Your Email', required: true },
          { name: 'subject', type: 'text', placeholder: 'Subject' },
          { name: 'message', type: 'textarea', placeholder: 'Your Message', required: true },
        ]).map((field: any, i: number) => 
          field.type === 'textarea' ? (
            <textarea
              key={i}
              placeholder={field.placeholder ?? field.label}
              required={field.required}
              rows={4}
              style={{
                padding: '10px 12px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                fontSize: sizeMap.sm,
                resize: 'vertical',
              }}
            />
          ) : field.type === 'select' ? (
            <select
              key={i}
              required={field.required}
              style={{
                padding: '10px 12px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                fontSize: sizeMap.sm,
              }}
            >
              <option value="">{field.placeholder ?? 'Select an option'}</option>
              {field.options?.map((opt: any, j: number) => (
                <option key={j} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              key={i}
              type={field.type}
              placeholder={field.placeholder ?? field.label}
              required={field.required}
              style={{
                padding: '10px 12px',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                fontSize: sizeMap.sm,
              }}
            />
          )
        )}
        <button
          onClick={() => widget.onSubmitAction && onAction({ ...widget.onSubmitAction, data: formData })}
          style={{
            padding: '12px',
            borderRadius: theme.radius.md,
            border: 'none',
            background: theme.colors.primary,
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {widget.submitLabel ?? 'Send Message'}
        </button>
      </div>
    </div>
  )
}

function FAQWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    new Set(widget.items?.filter((item: any) => item.open).map((item: any) => item.id) ?? [])
  )
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState(widget.activeCategory)

  const filteredItems = widget.items?.filter((item: any) => {
    const matchesSearch = !searchQuery || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !activeCategory || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {widget.title && <div style={{ fontSize: sizeMap.lg, fontWeight: 600, marginBottom: 12 }}>{widget.title}</div>}
      <div style={{ marginBottom: 16 }}>
        <SearchWidget
          widget={{
            type: 'Search',
            placeholder: widget.searchPlaceholder ?? 'Search FAQs...',
            value: searchQuery,
            onSearchAction: widget.onSearchAction,
          }}
        />
      </div>
      {widget.categories && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <ChipWidget
            widget={{
              type: 'Chip',
              label: 'All',
              selected: !activeCategory,
              onClickAction: { type: 'set_category', data: { category: null } },
            }}
          />
          {widget.categories.map((cat: any) => (
            <ChipWidget
              key={cat.id}
              widget={{
                type: 'Chip',
                label: cat.label,
                selected: activeCategory === cat.id,
                onClickAction: { type: 'set_category', data: { category: cat.id } },
              }}
            />
          ))}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filteredItems?.map((item: any) => (
          <div
            key={item.id}
            style={{
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => {
                setOpenItems(prev => {
                  const next = new Set(prev)
                  if (next.has(item.id)) next.delete(item.id)
                  else next.add(item.id)
                  return next
                })
                widget.onToggleAction && onAction({ ...widget.onToggleAction, data: { id: item.id } })
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                cursor: 'pointer',
                background: openItems.has(item.id) ? theme.colors.surface : 'transparent',
              }}
            >
              <span style={{ fontWeight: 500 }}>{item.question}</span>
              <span>{openItems.has(item.id) ? '−' : '+'}</span>
            </div>
            {openItems.has(item.id) && (
              <div style={{ padding: '0 16px 16px', color: theme.colors.textSecondary }}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
        {filteredItems?.length === 0 && (
          <div style={{ textAlign: 'center', padding: 24, color: theme.colors.textSecondary }}>
            No FAQs found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}

function TermsWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [accepted, setAccepted] = React.useState(false)

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ fontSize: sizeMap.xl, fontWeight: 600, marginBottom: 8 }}>
        {widget.title ?? 'Terms & Conditions'}
      </div>
      {widget.version && (
        <div style={{ fontSize: sizeMap.sm, color: theme.colors.textSecondary, marginBottom: 16 }}>
          Version {widget.version} • Last updated: {widget.lastUpdated}
        </div>
      )}
      <div style={{ maxHeight: 400, overflow: 'auto', padding: 16, background: theme.colors.surface, borderRadius: theme.radius.md, marginBottom: 16 }}>
        {widget.sections?.map((section: any, i: number) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{section.title}</div>
            <div style={{ color: theme.colors.textSecondary, lineHeight: 1.6 }}>{section.content}</div>
          </div>
        ))}
      </div>
      {widget.onAcceptAction && (
        <>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span>I have read and agree to the Terms & Conditions</span>
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {widget.onDeclineAction && (
              <ButtonWidget widget={{ type: 'Button', label: 'Decline', style: 'outline', onClickAction: widget.onDeclineAction }} />
            )}
            <ButtonWidget
              widget={{
                type: 'Button',
                label: 'Accept',
                style: 'primary',
                disabled: !accepted,
                onClickAction: widget.onAcceptAction,
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

// ============================================
// Form Widgets
// ============================================

function FormWidget({ widget }: { widget: any }) {
  const { onAction, theme } = React.useContext(WidgetContext)
  const [formData, setFormData] = React.useState<Record<string, any>>({})

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        widget.onSubmitAction && onAction({ ...widget.onSubmitAction, data: formData })
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      {widget.children?.map((child: Widget, i: number) => (
        <RenderWidget key={i} widget={child} />
      ))}
      {widget.onSubmitAction && (
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {widget.resetLabel && (
            <button type="reset" style={{ flex: 1, padding: 10, borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border}`, background: 'transparent', cursor: 'pointer' }}>
              {widget.resetLabel}
            </button>
          )}
          <button
            type="submit"
            disabled={widget.loading}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: theme.radius.md,
              border: 'none',
              background: theme.colors.primary,
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {widget.loading ? '...' : widget.submitLabel ?? 'Submit'}
          </button>
        </div>
      )}
    </form>
  )
}

function FieldWidget({ widget }: { widget: any }) {
  const { theme } = React.useContext(WidgetContext)

  return (
    <div>
      {widget.label && (
        <label style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>
          {widget.label}
          {widget.required && <span style={{ color: theme.colors.error }}> *</span>}
        </label>
      )}
      {widget.children?.[0] && <RenderWidget widget={widget.children[0]} />}
      {widget.helperText && !widget.error && (
        <div style={{ fontSize: sizeMap.xs, color: theme.colors.textSecondary, marginTop: 4 }}>{widget.helperText}</div>
      )}
      {widget.error && (
        <div style={{ fontSize: sizeMap.xs, color: theme.colors.error, marginTop: 4 }}>{widget.error}</div>
      )}
    </div>
  )
}

export default WidgetRenderer
