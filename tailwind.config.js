/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OpenAI-inspired colors
        flowkit: {
          primary: '#10a37f',
          'primary-hover': '#0d8a6a',
          secondary: '#6b7280',
          background: '#ffffff',
          surface: '#f7f7f8',
          'surface-hover': '#ececf1',
          text: '#202123',
          'text-secondary': '#6b7280',
          border: '#e5e5e5',
          'border-dark': '#d1d5db',
          user: '#10a37f',
          assistant: '#f7f7f8',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
      animation: {
        'typing-dot': 'typing-dot 1.4s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        'typing-dot': {
          '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'chat': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'chat-lg': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'chat-xl': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'widget': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'widget-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
