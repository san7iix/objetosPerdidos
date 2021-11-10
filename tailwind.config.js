module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          ligth: "#004a87",
          dark: "#013866"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}