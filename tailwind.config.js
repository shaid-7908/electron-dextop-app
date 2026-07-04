/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/ui/**/*.js"],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0f172a',
        'bg-secondary': '#1e293b',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'accent': '#3b82f6',
        'accent-hover': '#2563eb',
        'card-bg': 'rgba(30, 41, 59, 0.7)',
        'border-color': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

