import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'oklch(0.99 0.005 85)',
        'bg-soft': 'oklch(0.97 0.006 85)',
        'bg-card': 'oklch(1 0 0)',
        ink: 'oklch(0.22 0.015 260)',
        'ink-soft': 'oklch(0.42 0.015 260)',
        'ink-mute': 'oklch(0.58 0.01 260)',
        line: 'oklch(0.9 0.008 260)',
        'line-soft': 'oklch(0.94 0.006 260)',
        accent: 'oklch(0.45 0.14 260)',
        'accent-soft': 'oklch(0.95 0.03 260)',
        'accent-ink': 'oklch(0.35 0.15 260)',
        warn: 'oklch(0.55 0.15 50)',
        ok: 'oklch(0.55 0.13 155)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '1180px',
        read: '780px',
      },
      borderRadius: {
        card: '10px',
        sm: '6px',
      },
    },
  },
  plugins: [typography],
}

export default config
