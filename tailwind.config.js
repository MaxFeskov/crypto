const tailwindForms = require('@tailwindcss/forms');

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx'
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [tailwindForms],
};
