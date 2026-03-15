/**
 * FlowKit - Theme System
 * 
 * Beautiful themes for your chat interface.
 * - Light (default)
 * - Dark
 * - OpenAI
 * - Custom brand colors
 */

import React from 'react'

// ============================================
// Theme Types
// ============================================

export interface FlowKitTheme {
  name: string
  colors: {
    // Primary
    primary: string
    primaryHover: string
    primaryLight: string
    primaryDark: string
    
    // Semantic
    secondary: string
    success: string
    warning: string
    error: string
    info: string
    
    // Background
    background: string
    surface: string
    surfaceHover: string
    
    // Text
    text: string
    textSecondary: string
    textMuted: string
    
    // Border
    border: string
    borderDark: string
    
    // Chat specific
    userBubble: string
    userBubbleText: string
    assistantBubble: string
    assistantBubbleText: string
    
    // Input
    inputBackground: string
    inputBorder: string
    inputFocusBorder: string
    inputPlaceholder: string
  }
  fonts: {
    sans: string
    mono: string
  }
  radii: {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    widget: string
    widgetHover: string
  }
}

// ============================================
// Built-in Themes
// ============================================

/**
 * Light theme (default)
 */
export const lightTheme: FlowKitTheme = {
  name: 'light',
  colors: {
    primary: '#10a37f',
    primaryHover: '#0d8a6a',
    primaryLight: '#ecfdf5',
    primaryDark: '#059669',
    
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#ffffff',
    surface: '#f7f7f8',
    surfaceHover: '#ececf1',
    
    text: '#202123',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    
    border: '#e5e5e5',
    borderDark: '#d1d5db',
    
    userBubble: '#10a37f',
    userBubbleText: '#ffffff',
    assistantBubble: '#f7f7f8',
    assistantBubbleText: '#202123',
    
    inputBackground: '#f7f7f8',
    inputBorder: '#e5e5e5',
    inputFocusBorder: '#10a37f',
    inputPlaceholder: '#9ca3af',
  },
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
    mono: 'Monaco, Menlo, "Ubuntu Mono", monospace',
  },
  radii: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    widget: '0 1px 3px rgba(0, 0, 0, 0.08)',
    widgetHover: '0 4px 12px rgba(0, 0, 0, 0.12)',
  },
}

/**
 * Dark theme
 */
export const darkTheme: FlowKitTheme = {
  name: 'dark',
  colors: {
    primary: '#10a37f',
    primaryHover: '#0d9a72',
    primaryLight: '#064e3b',
    primaryDark: '#059669',
    
    secondary: '#9ca3af',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#1a1a1a',
    surface: '#2a2a2a',
    surfaceHover: '#3a3a3a',
    
    text: '#ffffff',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
    
    border: '#3a3a3a',
    borderDark: '#4a4a4a',
    
    userBubble: '#10a37f',
    userBubbleText: '#ffffff',
    assistantBubble: '#2a2a2a',
    assistantBubbleText: '#ffffff',
    
    inputBackground: '#2a2a2a',
    inputBorder: '#3a3a3a',
    inputFocusBorder: '#10a37f',
    inputPlaceholder: '#71717a',
  },
  fonts: lightTheme.fonts,
  radii: lightTheme.radii,
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    widget: '0 1px 3px rgba(0, 0, 0, 0.3)',
    widgetHover: '0 4px 12px rgba(0, 0, 0, 0.4)',
  },
}

/**
 * OpenAI theme (exact OpenAI colors)
 */
export const openaiTheme: FlowKitTheme = {
  name: 'openai',
  colors: {
    primary: '#10a37f',
    primaryHover: '#0d8a6a',
    primaryLight: '#ecfdf5',
    primaryDark: '#059669',
    
    secondary: '#8e8ea0',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#ffffff',
    surface: '#f7f7f8',
    surfaceHover: '#ececf1',
    
    text: '#202123',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    
    border: '#e5e5e5',
    borderDark: '#d1d5db',
    
    userBubble: '#10a37f',
    userBubbleText: '#ffffff',
    assistantBubble: '#f7f7f8',
    assistantBubbleText: '#202123',
    
    inputBackground: '#ffffff',
    inputBorder: '#d9d9e3',
    inputFocusBorder: '#10a37f',
    inputPlaceholder: '#8e8ea0',
  },
  fonts: {
    sans: 'Söhne, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'Söhne Mono, Monaco, Menlo, monospace',
  },
  radii: lightTheme.radii,
  shadows: lightTheme.shadows,
}

/**
 * Midnight theme (deep blue)
 */
export const midnightTheme: FlowKitTheme = {
  name: 'midnight',
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    primaryLight: '#312e81',
    primaryDark: '#4338ca',
    
    secondary: '#a5b4fc',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
    
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#334155',
    
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    
    border: '#334155',
    borderDark: '#475569',
    
    userBubble: '#6366f1',
    userBubbleText: '#ffffff',
    assistantBubble: '#1e293b',
    assistantBubbleText: '#f1f5f9',
    
    inputBackground: '#1e293b',
    inputBorder: '#334155',
    inputFocusBorder: '#6366f1',
    inputPlaceholder: '#64748b',
  },
  fonts: lightTheme.fonts,
  radii: lightTheme.radii,
  shadows: darkTheme.shadows,
}

/**
 * Sunset theme (warm colors)
 */
export const sunsetTheme: FlowKitTheme = {
  name: 'sunset',
  colors: {
    primary: '#f97316',
    primaryHover: '#ea580c',
    primaryLight: '#fff7ed',
    primaryDark: '#c2410c',
    
    secondary: '#fb923c',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#ffffff',
    surface: '#fff7ed',
    surfaceHover: '#ffedd5',
    
    text: '#1c1917',
    textSecondary: '#78716c',
    textMuted: '#a8a29e',
    
    border: '#fed7aa',
    borderDark: '#fdba74',
    
    userBubble: '#f97316',
    userBubbleText: '#ffffff',
    assistantBubble: '#fff7ed',
    assistantBubbleText: '#1c1917',
    
    inputBackground: '#fff7ed',
    inputBorder: '#fed7aa',
    inputFocusBorder: '#f97316',
    inputPlaceholder: '#a8a29e',
  },
  fonts: lightTheme.fonts,
  radii: lightTheme.radii,
  shadows: lightTheme.shadows,
}

/**
 * Forest theme (nature green)
 */
export const forestTheme: FlowKitTheme = {
  name: 'forest',
  colors: {
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: '#ecfdf5',
    primaryDark: '#065f46',
    
    secondary: '#6ee7b7',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#ffffff',
    surface: '#f0fdf4',
    surfaceHover: '#dcfce7',
    
    text: '#14532d',
    textSecondary: '#166534',
    textMuted: '#22c55e',
    
    border: '#bbf7d0',
    borderDark: '#86efac',
    
    userBubble: '#059669',
    userBubbleText: '#ffffff',
    assistantBubble: '#f0fdf4',
    assistantBubbleText: '#14532d',
    
    inputBackground: '#f0fdf4',
    inputBorder: '#bbf7d0',
    inputFocusBorder: '#059669',
    inputPlaceholder: '#6ee7b7',
  },
  fonts: lightTheme.fonts,
  radii: lightTheme.radii,
  shadows: lightTheme.shadows,
}

/**
 * Ocean theme (blue)
 */
export const oceanTheme: FlowKitTheme = {
  name: 'ocean',
  colors: {
    primary: '#0ea5e9',
    primaryHover: '#0284c7',
    primaryLight: '#f0f9ff',
    primaryDark: '#0369a1',
    
    secondary: '#7dd3fc',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#6366f1',
    
    background: '#ffffff',
    surface: '#f0f9ff',
    surfaceHover: '#e0f2fe',
    
    text: '#0c4a6e',
    textSecondary: '#0369a1',
    textMuted: '#0ea5e9',
    
    border: '#bae6fd',
    borderDark: '#7dd3fc',
    
    userBubble: '#0ea5e9',
    userBubbleText: '#ffffff',
    assistantBubble: '#f0f9ff',
    assistantBubbleText: '#0c4a6e',
    
    inputBackground: '#f0f9ff',
    inputBorder: '#bae6fd',
    inputFocusBorder: '#0ea5e9',
    inputPlaceholder: '#7dd3fc',
  },
  fonts: lightTheme.fonts,
  radii: lightTheme.radii,
  shadows: lightTheme.shadows,
}

/**
 * Rose theme (pink)
 */
export const roseTheme: FlowKitTheme = {
  name: 'rose',
  colors: {
    primary: '#f43f5e',
    primaryHover: '#e11d48',
    primaryLight: '#fff1f2',
    primaryDark: '#be123c',
    
    secondary: '#fda4af',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#ffffff',
    surface: '#fff1f2',
    surfaceHover: '#ffe4e6',
    
    text: '#4c0519',
    textSecondary: '#9f1239',
    textMuted: '#f43f5e',
    
    border: '#fecdd3',
    borderDark: '#fda4af',
    
    userBubble: '#f43f5e',
    userBubbleText: '#ffffff',
    assistantBubble: '#fff1f2',
    assistantBubbleText: '#4c0519',
    
    inputBackground: '#fff1f2',
    inputBorder: '#fecdd3',
    inputFocusBorder: '#f43f5e',
    inputPlaceholder: '#fda4af',
  },
  fonts: lightTheme.fonts,
  radii: lightTheme.radii,
  shadows: lightTheme.shadows,
}

/**
 * Purple theme (violet)
 */
export const purpleTheme: FlowKitTheme = {
  name: 'purple',
  colors: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    primaryLight: '#faf5ff',
    primaryDark: '#6d28d9',
    
    secondary: '#c4b5fd',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    background: '#ffffff',
    surface: '#faf5ff',
    surfaceHover: '#f3e8ff',
    
    text: '#3b0764',
    textSecondary: '#7e22ce',
    textMuted: '#a855f7',
    
    border: '#e9d5ff',
    borderDark: '#d8b4fe',
    
    userBubble: '#8b5cf6',
    userBubbleText: '#ffffff',
    assistantBubble: '#faf5ff',
    assistantBubbleText: '#3b0764',
    
    inputBackground: '#faf5ff',
    inputBorder: '#e9d5ff',
    inputFocusBorder: '#8b5cf6',
    inputPlaceholder: '#c4b5fd',
  },
  fonts: lightTheme.fonts,
  radii: lightTheme.radii,
  shadows: lightTheme.shadows,
}

/**
 * Cyberpunk theme (neon)
 */
export const cyberpunkTheme: FlowKitTheme = {
  name: 'cyberpunk',
  colors: {
    primary: '#00f0ff',
    primaryHover: '#00c4cc',
    primaryLight: '#0a192f',
    primaryDark: '#00f0ff',
    
    secondary: '#ff00ff',
    success: '#00ff00',
    warning: '#ffff00',
    error: '#ff0055',
    info: '#00f0ff',
    
    background: '#0a192f',
    surface: '#112240',
    surfaceHover: '#1d3557',
    
    text: '#ccd6f6',
    textSecondary: '#8892b0',
    textMuted: '#64ffda',
    
    border: '#1d3557',
    borderDark: '#3d5a80',
    
    userBubble: '#00f0ff',
    userBubbleText: '#0a192f',
    assistantBubble: '#112240',
    assistantBubbleText: '#ccd6f6',
    
    inputBackground: '#112240',
    inputBorder: '#1d3557',
    inputFocusBorder: '#00f0ff',
    inputPlaceholder: '#8892b0',
  },
  fonts: {
    sans: '"Orbitron", "Share Tech Mono", -apple-system, sans-serif',
    mono: '"Share Tech Mono", Monaco, monospace',
  },
  radii: lightTheme.radii,
  shadows: {
    sm: '0 0 5px rgba(0, 240, 255, 0.3)',
    md: '0 0 10px rgba(0, 240, 255, 0.3)',
    lg: '0 0 20px rgba(0, 240, 255, 0.3)',
    widget: '0 0 5px rgba(0, 240, 255, 0.2)',
    widgetHover: '0 0 15px rgba(0, 240, 255, 0.4)',
  },
}

// ============================================
// Theme Collection
// ============================================

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  openai: openaiTheme,
  midnight: midnightTheme,
  sunset: sunsetTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  rose: roseTheme,
  purple: purpleTheme,
  cyberpunk: cyberpunkTheme,
} as const

export type ThemeName = keyof typeof themes

// ============================================
// Theme Context
// ============================================

interface ThemeContextValue {
  theme: FlowKitTheme
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
  toggleDarkMode: () => void
  isDark: boolean
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: lightTheme,
  themeName: 'light',
  setTheme: () => {},
  toggleDarkMode: () => {},
  isDark: false,
})

// ============================================
// Theme Provider
// ============================================

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeName
  storageKey?: string
  detectSystem?: boolean
  customThemes?: Record<string, FlowKitTheme>
  onThemeChange?: (theme: FlowKitTheme, name: string) => void
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'flowkit-theme',
  detectSystem = true,
  customThemes,
  onThemeChange,
}: ThemeProviderProps) {
  const [themeName, setThemeName] = React.useState<ThemeName | string>(() => {
    // Try localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey)
      if (stored && (themes as any)[stored]) {
        return stored
      }
      
      // Detect system preference
      if (detectSystem) {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return isDark ? 'dark' : defaultTheme
      }
    }
    
    return defaultTheme
  })
  
  const theme = React.useMemo(() => {
    return (customThemes?.[themeName] ?? (themes as any)[themeName]) ?? lightTheme
  }, [themeName, customThemes])
  
  const isDark = React.useMemo(() => {
    return theme.name === 'dark' || 
           theme.colors.background === darkTheme.colors.background
  }, [theme])
  
  const setTheme = React.useCallback((name: ThemeName | string) => {
    setThemeName(name)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, name)
    }
    
    onThemeChange?.(
      (customThemes?.[name] ?? (themes as any)[name]) ?? lightTheme,
      name
    )
  }, [storageKey, customThemes, onThemeChange])
  
  const toggleDarkMode = React.useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])
  
  // Apply CSS variables
  React.useEffect(() => {
    const root = document.documentElement
    
    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--flowkit-${key}`, value)
    })
    
    // Apply fonts
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--flowkit-font-${key}`, value)
    })
    
    // Apply radii
    Object.entries(theme.radii).forEach(([key, value]) => {
      root.style.setProperty(`--flowkit-radius-${key}`, value)
    })
    
    // Apply shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--flowkit-shadow-${key}`, value)
    })
    
    // Add theme class
    root.classList.remove('theme-light', 'theme-dark')
    root.classList.add(`theme-${theme.name}`)
    
  }, [theme])
  
  const value: ThemeContextValue = {
    theme,
    themeName: themeName as ThemeName,
    setTheme,
    toggleDarkMode,
    isDark,
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// ============================================
// Theme Hooks
// ============================================

export function useTheme() {
  return React.useContext(ThemeContext)
}

export function useThemeColors() {
  const { theme } = useTheme()
  return theme.colors
}

// ============================================
// Custom Theme Builder
// ============================================

export interface BuildThemeOptions {
  name: string
  primary: string
  mode?: 'light' | 'dark'
}

export function buildTheme(options: BuildThemeOptions): FlowKitTheme {
  const { name, primary, mode = 'light' } = options
  const base = mode === 'dark' ? darkTheme : lightTheme
  
  // Calculate color variations
  const primaryHover = adjustColorBrightness(primary, -15)
  const primaryLight = adjustColorBrightness(primary, mode === 'dark' ? -80 : 90)
  const primaryDark = adjustColorBrightness(primary, -30)
  
  return {
    ...base,
    name,
    colors: {
      ...base.colors,
      primary,
      primaryHover,
      primaryLight,
      primaryDark,
      userBubble: primary,
      inputFocusBorder: primary,
    },
  }
}

// Helper to adjust color brightness
function adjustColorBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1)
}

// ============================================
// Theme Switcher Component
// ============================================

export interface ThemeSwitcherProps {
  showLabel?: boolean
  className?: string
}

export function ThemeSwitcher({ showLabel = true, className = '' }: ThemeSwitcherProps) {
  const { themeName, setTheme, isDark, toggleDarkMode } = useTheme()
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm text-[var(--flowkit-textSecondary)]">
          Theme:
        </span>
      )}
      
      <select
        value={themeName}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        className="px-3 py-1.5 text-sm border border-[var(--flowkit-border)] rounded-lg bg-[var(--flowkit-surface)] text-[var(--flowkit-text)] focus:outline-none focus:border-[var(--flowkit-primary)]"
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
        <option value="openai">🤖 OpenAI</option>
        <option value="midnight">🌃 Midnight</option>
        <option value="sunset">🌅 Sunset</option>
        <option value="forest">🌲 Forest</option>
        <option value="ocean">🌊 Ocean</option>
        <option value="rose">🌸 Rose</option>
        <option value="purple">💜 Purple</option>
        <option value="cyberpunk">🤖 Cyberpunk</option>
      </select>
      
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg border border-[var(--flowkit-border)] bg-[var(--flowkit-surface)] hover:bg-[var(--flowkit-surfaceHover)] transition-colors"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  )
}

export default {
  themes,
  lightTheme,
  darkTheme,
  openaiTheme,
  midnightTheme,
  sunsetTheme,
  forestTheme,
  oceanTheme,
  roseTheme,
  purpleTheme,
  cyberpunkTheme,
  ThemeProvider,
  useTheme,
  useThemeColors,
  buildTheme,
  ThemeSwitcher,
}
