/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS variables
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        accent2: "hsl(var(--accent-2))",
        ring: "hsl(var(--ring))",

        // Semantic colors
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",

        // Design system color tokens for Button component
        primary: "hsl(var(--accent))",
        "primary-foreground": "hsl(var(--surface))",
        "card-foreground": "hsl(var(--text))",
        "muted-foreground": "hsl(var(--muted))",

        // Legacy support (keep existing vars for backwards compatibility)
        background: "hsl(var(--bg))",
        card: "hsl(var(--surface))",

        // Field Notebook design tokens (Phase 1)
        'ink': {
          DEFAULT: '#EDEDE8',
          muted: 'rgba(237,237,232,0.65)',
          faint: 'rgba(237,237,232,0.4)',
          ghost: 'rgba(237,237,232,0.08)',
        },
        'shell': {
          DEFAULT: '#0A0A0C',
          raised: '#141417',
        },
        'nb-amber': {
          DEFAULT: '#E9A942',
          soft: 'rgba(233,169,66,0.7)',
          faint: 'rgba(233,169,66,0.25)',
          wash: 'rgba(233,169,66,0.04)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tight-display': '-0.022em',
        'mono-label': '0.14em',
        'mono-eyebrow': '0.18em',
      },
      animation: {
        'pulse-amber': 'pulse-amber 2.4s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.4,0,0.2,1) both',
        'ink-underline': 'ink-underline 0.8s cubic-bezier(0.4,0,0.2,1) both',
      },
      keyframes: {
        'pulse-amber': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 0 0 rgba(233,169,66,0.5)' },
          '50%': { opacity: 0.55, boxShadow: '0 0 0 6px rgba(233,169,66,0)' },
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'ink-underline': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        // Fluid typography
        'display': 'clamp(2.25rem, 4vw + 1rem, 4rem)',
        'h1': 'clamp(1.875rem, 2.5vw + 1rem, 3rem)',
        'h2': 'clamp(1.5rem, 2vw + 0.5rem, 2.25rem)',
        'h3': 'clamp(1.25rem, 1.5vw + 0.5rem, 1.875rem)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius)',
        '2xl': 'var(--radius-lg)',
      },
      boxShadow: {
        'soft': '0 8px 24px 0 hsl(var(--shadow) / 0.08)',
        'hover': '0 12px 28px 0 hsl(var(--shadow) / 0.12)',
        'focus': '0 0 0 2px hsl(var(--ring) / 0.2)',
        'inner-soft': 'inset 0 2px 4px 0 hsl(var(--shadow) / 0.05)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'bounce': 'var(--ease-bounce)',
        'out': 'var(--ease-out)',
        'in': 'var(--ease-in)',
        'damped': 'cubic-bezier(0.4,0,0.2,1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px', 
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      aspectRatio: {
        'video': '16 / 9',
        'square': '1 / 1',
        'photo': '4 / 3',
        'card': '16 / 10',
      },
      gridTemplateColumns: {
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      zIndex: {
        'nav': 'var(--z-nav)',
        'overlay': 'var(--z-overlay)',
        'panel': 'var(--z-panel)',
        'tooltip': 'var(--z-tooltip)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}