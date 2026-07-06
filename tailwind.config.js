/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#121212',
        ember: '#8E1B1B',
        flare: '#C62828',
        gold: '#C9A227',
        cream: '#F5F3EE',
      },
      fontFamily: {
        display: ['Didot', 'Bodoni 72', 'Georgia', 'serif'],
        sans: ['Avenir Next', 'Segoe UI', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 28px rgba(198, 40, 40, 0.22)',
        gold: '0 14px 36px rgba(201, 162, 39, 0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 700ms ease both',
        ember: 'ember 1800ms ease-in-out infinite',
        'slow-pan': 'slowPan 18s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ember: {
          '0%, 100%': { opacity: '0.76', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        slowPan: {
          '0%': { transform: 'scale(1.03) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.08) translate3d(-1.5%, 1%, 0)' },
        },
      },
    },
  },
  plugins: [],
}
