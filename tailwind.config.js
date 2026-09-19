/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        macOS: {
          bg: '#1e1e1e', // Dark mode default backdrop
          glass: 'rgba(255, 255, 255, 0.2)',
          glassDark: 'rgba(0, 0, 0, 0.4)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'mac-window': '0 20px 40px -10px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}
