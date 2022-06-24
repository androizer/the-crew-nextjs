const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({addUtilities}) {
      addUtilities({
        '.avatar-sm': {
          height: '25px',
          width: '25px',
        },
        '.avatar-md': {
          height: '50px',
          width: '50px',
        },
        '.avatar-lg': {
          height: '100px',
          width: '100px',
        }
      })
    })
  ],
}
