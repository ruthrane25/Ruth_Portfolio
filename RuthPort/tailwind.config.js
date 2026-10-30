/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          darkest: '#030712',
          darker: '#070c18',
          dark: '#0b0f19',
          card: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(6, 182, 212, 0.4)',
          cyan: '#06b6d4',
          'cyan-glow': '#22d3ee',
          emerald: '#10b981',
          'emerald-glow': '#34d399',
          indigo: '#6366f1',
          'indigo-glow': '#818cf8',
          violet: '#8b5cf6',
          'violet-glow': '#a78bfa',
          slate: {
            750: '#1e293b',
            850: '#0f172a',
            950: '#020617',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-beam': 'border-beam 6s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
      backgroundImage: {
        'radial-gradient-cyan': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), transparent 70%)',
        'radial-gradient-emerald': 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)',
        'radial-gradient-indigo': 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), transparent 70%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.35), 0 0 40px rgba(6, 182, 212, 0.15)',
        'neon-emerald': '0 0 20px rgba(16, 185, 129, 0.35), 0 0 40px rgba(16, 185, 129, 0.15)',
        'neon-indigo': '0 0 20px rgba(99, 102, 241, 0.35), 0 0 40px rgba(99, 102, 241, 0.15)',
        'glow-subtle': '0 0 30px -10px rgba(6, 182, 212, 0.25)',
      }
    },
  },
  plugins: [],
};

