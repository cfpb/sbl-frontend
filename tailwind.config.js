const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      avenirNext: ["Avenir Next",  ...defaultConfig.theme.fontFamily.sans]
    }
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin],
  corePlugins: {
    preflight: false,
  }
};
module.exports = config;
