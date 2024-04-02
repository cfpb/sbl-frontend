const { defineConfig } = require('cypress');
const axe = require('axe-core/axe.js');

module.exports = defineConfig({
  fileServerFolder: 'dist',
  fixturesFolder: false,
  projectId: 'etow1b',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        getAxeSource: () => axe.source,
      });
    },
    baseUrl: 'http://localhost:4173/',
    specPattern: 'cypress/e2e/**/*.ts',
  },
});
