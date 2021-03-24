const tailwindcss = require('tailwindcss');
// postcss.config.js
module.exports = {
  syntax: 'postcss-scss',
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};
