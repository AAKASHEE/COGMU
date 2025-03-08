/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#352F44',
          DEFAULT: '#5C5470',
          light: '#B9B4C7',
          beige: '#FAF0E6'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(185, 180, 199, 0.3)',
        'glow-strong': '0 0 30px rgba(185, 180, 199, 0.5)'
      }
    },
  },
  plugins: [],
};