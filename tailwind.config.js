module.exports = {
  content: [
    './src/**/*.{tsx,ts}'
  ],
  safelist: [
    'loading',
    {
      pattern: /react-datepicker.*/
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
