/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'india-saffron': '#FF9933',
        'india-green': '#138808',
        'india-navy': '#000080',
        'india-white': '#FFFFFF',
        'dark-bg': '#0a0a0c',
        'glass': 'rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'parliament': "url('https://images.unsplash.com/photo-1599932025134-8c8f0004907a?q=80&w=2000')",
        'ashoka-gradient': "linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

