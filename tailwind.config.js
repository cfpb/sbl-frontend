const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        errorColor: '#D14124',
        disabledColor: '#E7E8E9',
        cfpbBorderColor: '#919395',
        stepIndicatorComplete: '#162e51',
        stepIndicatorCurrent: '#0072CE',
        stepIndicatorIncomplete: '#D2D3D5',
      },
      fontFamily: {
        inter: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      },
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin],
  corePlugins: {
    preflight: false,
  },
};
module.exports = config;
