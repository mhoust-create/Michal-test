/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        military: {
          dark: '#0d1117',
          card: '#161b22',
          border: '#21262d',
          green: '#39d353',
          gold: '#e8c547',
          orange: '#f97316',
          red: '#f85149',
        }
      },
    },
  },
  plugins: [],
}
