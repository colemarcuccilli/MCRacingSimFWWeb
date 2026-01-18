import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'asphalt': '#1A1A1A',
        'asphalt-light': '#2A2A2A',
        'asphalt-dark': '#0D0D0D',
        'apex-red': '#E62322',
        'apex-red-dark': '#B51C1B',
        'apex-red-glow': '#FF3B3A',
        'telemetry-cyan': '#00AEEF',
        'telemetry-cyan-dark': '#0088BB',
        'telemetry-cyan-glow': '#00D4FF',
        'grid-white': '#F5F5F5',
        'pit-gray': '#888888',
      },
      fontFamily: {
        'racing': ['Racing Sans One', 'Impact', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Oswald', 'Impact', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'race-line': 'race-line 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(230, 35, 34, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(230, 35, 34, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'race-line': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
export default config
