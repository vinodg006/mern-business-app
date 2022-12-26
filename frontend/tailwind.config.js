module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'false'
  theme: {
    extend: {
      colors:{
        primary: '#9d0aff',
        'primary-hover': '#00f59b'
      },
      fontFamily:{
        monts:['Montserrat','sans-serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
