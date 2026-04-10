/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          light: '#5FDCA7',
          DEFAULT: '#3EB489',
          dark: '#2A8B67',
        },
        coral: {
          light: '#FFA68A',
          DEFAULT: '#FF7F50',
          dark: '#E05D2D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
