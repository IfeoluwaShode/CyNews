/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#1e40af',
        'cyber-dark': '#0f172a',
        'cyber-gray': '#64748b',
      }
    },
  },
  plugins: [],
}
