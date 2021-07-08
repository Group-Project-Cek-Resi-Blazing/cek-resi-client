module.exports = {
  mode: 'jit',
  purge: ['./**/*.html', './src/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        yellowTail: "'Yellowtail', cursive",
        bungee: "'Bungee Shade', cursive",
        poppins: "'Poppins', sans-serif"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
