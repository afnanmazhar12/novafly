/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'max-sm': {'max': '640px'}, // Custom max-width breakpoint
      },
    },
  },
  plugins: [],
}