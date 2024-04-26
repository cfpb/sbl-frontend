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
        stepIndicatorComplete: '#254B87',
        stepIndicatorCurrent: '#0072CE',
        stepIndicatorIncomplete: '#D2D3D5',
        inProgressUploadValidation: '#43484E',
        labelHelper: '#43484E',
        pacific: '#0072CE', // TODO: Integrate DS color vars
        teal: '#257675',
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
