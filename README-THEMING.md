# 🎨 FlowKit Theming System

Beautiful themes for your chat interface. Light, dark, and 8 more!

---

## Quick Start

```tsx
import { TailwindChat, ThemeProvider, ThemeSwitcher } from 'flowkit'
import 'flowkit/styles/tailwind.css'
import 'flowkit/styles/theme-variables.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ThemeSwitcher />
      <TailwindChat adapter={adapter} />
    </ThemeProvider>
  )
}
```

---

## Built-in Themes (10)

| Theme | Description | Preview |
|-------|-------------|---------|
| **Light** | Clean, professional light mode | ☀️ White + Green |
| **Dark** | Easy on the eyes | 🌙 Dark gray + Green |
| **OpenAI** | Exact OpenAI colors | 🤖 ChatGPT style |
| **Midnight** | Deep blue, night sky | 🌃 Navy + Indigo |
| **Sunset** | Warm, inviting | 🌅 Orange + Peach |
| **Forest** | Nature-inspired | 🌲 Green + Mint |
| **Ocean** | Cool, calming | 🌊 Blue + Cyan |
| **Rose** | Elegant, feminine | 🌸 Pink + Rose |
| **Purple** | Creative, bold | 💜 Violet + Lavender |
| **Cyberpunk** | Neon, futuristic | 🤖 Cyan + Magenta |

---

## ThemeProvider

```tsx
import { ThemeProvider } from 'flowkit/integrations'

<ThemeProvider
  defaultTheme="dark"          // Initial theme
  storageKey="my-app-theme"    // localStorage key
  detectSystem={true}          // Auto-detect system preference
  customThemes={myThemes}      // Add custom themes
  onThemeChange={(theme) => {  // Theme change callback
    console.log('Theme:', theme.name)
  }}
>
  <App />
</ThemeProvider>
```

---

## Theme Switcher

### Simple Switcher

```tsx
import { ThemeSwitcher } from 'flowkit/integrations'

<ThemeSwitcher />
```

### Custom Switcher

```tsx
import { useTheme, themes } from 'flowkit/integrations'

function CustomThemeSwitcher() {
  const { themeName, setTheme, isDark, toggleDarkMode } = useTheme()
  
  return (
    <div>
      {/* Toggle dark mode */}
      <button onClick={toggleDarkMode}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
      
      {/* Full theme selector */}
      <select value={themeName} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="openai">OpenAI</option>
        <option value="midnight">Midnight</option>
        <option value="sunset">Sunset</option>
        <option value="forest">Forest</option>
        <option value="ocean">Ocean</option>
        <option value="rose">Rose</option>
        <option value="purple">Purple</option>
        <option value="cyberpunk">Cyberpunk</option>
      </select>
    </div>
  )
}
```

---

## Custom Themes

### Build from Primary Color

```tsx
import { buildTheme, ThemeProvider } from 'flowkit/integrations'

// Auto-generates all color variations
const brandTheme = buildTheme({
  name: 'brand',
  primary: '#FF6B6B',
  mode: 'light' // or 'dark'
})

<ThemeProvider
  defaultTheme="brand"
  customThemes={{ brand: brandTheme }}
>
  <App />
</ThemeProvider>
```

### Full Custom Theme

```tsx
import { FlowKitTheme } from 'flowkit/integrations'

const myTheme: FlowKitTheme = {
  name: 'custom',
  colors: {
    primary: '#FF6B6B',
    primaryHover: '#FF5252',
    primaryLight: '#FFE5E5',
    primaryDark: '#D32F2F',
    
    secondary: '#4ECDC4',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#FFFFFF',
    surface: '#F7F7F8',
    surfaceHover: '#ECECF1',
    
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    
    border: '#E5E5E5',
    borderDark: '#D1D5DB',
    
    userBubble: '#FF6B6B',
    userBubbleText: '#FFFFFF',
    assistantBubble: '#F7F7F8',
    assistantBubbleText: '#1A1A1A',
    
    inputBackground: '#F7F7F8',
    inputBorder: '#E5E5E5',
    inputFocusBorder: '#FF6B6B',
    inputPlaceholder: '#9CA3AF',
  },
  fonts: {
    sans: 'Inter, -apple-system, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    widget: '0 1px 3px rgba(0,0,0,0.08)',
    widgetHover: '0 4px 12px rgba(0,0,0,0.12)',
  },
}
```

---

## CSS Variables

Theme colors are automatically applied as CSS variables:

```css
/* Available variables */
--flowkit-primary
--flowkit-primaryHover
--flowkit-primaryLight
--flowkit-primaryDark
--flowkit-secondary
--flowkit-success
--flowkit-warning
--flowkit-error
--flowkit-info
--flowkit-background
--flowkit-surface
--flowkit-surfaceHover
--flowkit-text
--flowkit-textSecondary
--flowkit-textMuted
--flowkit-border
--flowkit-borderDark
--flowkit-userBubble
--flowkit-userBubbleText
--flowkit-assistantBubble
--flowkit-assistantBubbleText
--flowkit-inputBackground
--flowkit-inputBorder
--flowkit-inputFocusBorder
--flowkit-inputPlaceholder
```

### Use in Your Components

```css
.my-component {
  background-color: var(--flowkit-surface);
  color: var(--flowkit-text);
  border: 1px solid var(--flowkit-border);
}

.my-button {
  background-color: var(--flowkit-primary);
  color: white;
}

.my-button:hover {
  background-color: var(--flowkit-primaryHover);
}
```

---

## Theme-aware Components

### Using Themed Classes

```tsx
<div className="flowkit-card-themed">
  {/* Auto-themed card */}
</div>

<div className="flowkit-bubble-user-themed">
  {/* User message bubble */}
</div>

<input className="flowkit-input-themed" />

<button className="flowkit-btn-primary-themed">
  Submit
</button>

<span className="flowkit-badge-primary-themed">
  New
</span>
```

### With Transitions

```tsx
<div className="flowkit-theme-transition">
  {/* Smooth color transitions on theme change */}
</div>
```

---

## System Preference Detection

```tsx
<ThemeProvider detectSystem={true}>
  {/* Auto-detects dark/light from OS */}
</ThemeProvider>
```

Or manually:

```tsx
function App() {
  const { isDark, setTheme } = useTheme()
  
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    if (media.matches && !localStorage.getItem('theme')) {
      setTheme('dark')
    }
  }, [])
}
```

---

## Dark Mode Detection

```tsx
import { useTheme } from 'flowkit/integrations'

function MyComponent() {
  const { isDark, toggleDarkMode } = useTheme()
  
  return (
    <div style={{
      background: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#1a1a1a'
    }}>
      <button onClick={toggleDarkMode}>
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
```

---

## Access Theme Colors

```tsx
import { useThemeColors } from 'flowkit/integrations'

function MyComponent() {
  const colors = useThemeColors()
  
  return (
    <div style={{
      backgroundColor: colors.surface,
      color: colors.text,
      borderTop: `2px solid ${colors.primary}`
    }}>
      Themed component
    </div>
  )
}
```

---

## Complete Example

```tsx
import { 
  TailwindChat, 
  ThemeProvider, 
  ThemeSwitcher,
  useTheme,
  DemoAdapter 
} from 'flowkit'
import 'flowkit/styles/tailwind.css'
import 'flowkit/styles/theme-variables.css'

const adapter = new DemoAdapter()

function App() {
  return (
    <ThemeProvider 
      defaultTheme="dark"
      detectSystem={true}
      onThemeChange={(theme) => {
        console.log('Theme changed to:', theme.name)
      }}
    >
      <div className="h-screen flex flex-col bg-[var(--flowkit-background)]">
        {/* Header with theme switcher */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--flowkit-border)]">
          <h1 
            className="text-xl font-bold"
            style={{ color: 'var(--flowkit-text)' }}
          >
            My Store
          </h1>
          <ThemeSwitcher />
        </header>
        
        {/* Chat */}
        <div className="flex-1">
          <TailwindChat
            adapter={adapter}
            welcomeTitle="How can I help?"
            suggestions={['Products', 'Track Order', 'Support']}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}
```

---

## Theme Previews

### Light
```
Background: #FFFFFF
Surface: #F7F7F8
Primary: #10A37F
Text: #202123
```

### Dark
```
Background: #1A1A1A
Surface: #2A2A2A
Primary: #10A37F
Text: #FFFFFF
```

### OpenAI
```
Same as light, but with exact OpenAI fonts
Primary: #10A37F
Fonts: Söhne
```

### Midnight
```
Background: #0F172A
Surface: #1E293B
Primary: #6366F1
Text: #F1F5F9
```

### Sunset
```
Background: #FFFFFF
Surface: #FFF7ED
Primary: #F97316
Text: #1C1917
```

### Forest
```
Background: #FFFFFF
Surface: #F0FDF4
Primary: #059669
Text: #14532D
```

### Ocean
```
Background: #FFFFFF
Surface: #F0F9FF
Primary: #0EA5E9
Text: #0C4A6E
```

### Rose
```
Background: #FFFFFF
Surface: #FFF1F2
Primary: #F43F5E
Text: #4C0519
```

### Purple
```
Background: #FFFFFF
Surface: #FAF5FF
Primary: #8B5CF6
Text: #3B0764
```

### Cyberpunk
```
Background: #0A192F
Surface: #112240
Primary: #00F0FF
Text: #CCD6F6
Fonts: Orbitron
Shadows: Neon glow
```

---

## Files

```
flowkit/src/
├── theming/
│   └── index.ts           # All theme code
├── styles/
│   └── theme-variables.css # CSS variables
└── integrations.ts         # Theme exports
```

---

**Questions?** Open an issue at https://github.com/openclawabdullah/flowkit
