const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // TODO: Consolidate colors to tailwind theme: https://github.com/cfpb/sbl-frontend/issues/1094
      colors: {
        warningColor: '#ff9e1b',
        errorColor: '#D14124',
        successColor: '#20AA3F',
        disabledColor: '#E7E8E9',
        cfpbBorderColor: '#919395',
        black: '#101820',
        gray5: '#F7F8F9',
        gray20: '#D2D3D5',
        gray50: '#A2A3A4',
        grayDark: '#43484E',
        grayDarker: '#293037',
        pacific90: '#2284d5',
        pacific40: '#AFD2F2',
        pacific10: '#EFF8FD',
        pacific: '#0072CE', // TODO: Integrate DS color vars
        pacificDark: '#0050b4',
        navy: '#254b87',
        teal: '#257675',
      },
      fontFamily: {
        inter: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      },
      // See `vars-breakpoints.js` of the `design-system` repo
      screens: {
        bpXS: '0px',
        bpSM: '601px',
        bpMED: '901px',
        bpLG: '1021px',
        bpXL: '1201px',
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
