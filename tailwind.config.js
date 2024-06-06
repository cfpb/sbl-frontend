const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        warningColor: '#ff9e1b',
        errorColor: '#D14124',
        successColor: '#20AA3F',
        disabledColor: '#E7E8E9',
        cfpbBorderColor: '#919395',
        black: '#101820',
        gray20: '#D2D3D5',
        grayDark: '#43484E',
        pacific: '#0072CE', // TODO: Integrate DS color vars
        pacificDark: '#0050b4',
        navy: '#254b87',
        teal: '#257675',
        navy: '#254B87',
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
