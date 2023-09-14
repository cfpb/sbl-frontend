const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "errorColor": "#D14124",
        "disabledColor": "#E7E8E9",
        "cfpbBorderColor": "#919395",
        "formBorderColor": "#A2A3A4"
      },
      fontFamily: {
        inter: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      }
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin],
  corePlugins: {
    preflight: false,
  }
};
module.exports = config;
