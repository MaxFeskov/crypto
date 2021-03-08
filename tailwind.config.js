const tailwindForms = require('@tailwindcss/forms');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [tailwindForms],
};
