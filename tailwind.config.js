/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired Dark System
        'apple-black': '#000000',
        'apple-dark': '#0a0a0a',    // Quase preto, fundo principal
        'apple-surface': '#111111', // Superfície de cards
        'apple-card': '#1a1a1a',    // Cards elevados
        'apple-border': '#2a2a2a',  // Bordas sutis
        'apple-line': '#3a3a3a',    // Divisores visíveis
        'apple-gray': '#8e8e93',    // Texto secundário (SF Gray)
        'apple-white': '#f5f5f7',   // Texto principal (Apple off-white)
        'apple-blue': '#0a84ff',    // Apple Blue (accent SF)
        'apple-blue-dark': '#0066cc', // Hover do azul
        'apple-green': '#30d158',   // Apple Green (status)
        // kept for backward compat (some components still reference these)
        'neon-cyan': colors.cyan[400],
        'neon-purple': colors.violet[500],
        'cosmic-dark': '#0a0a0a',
        'cosmic-light': '#111111',
      },
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}