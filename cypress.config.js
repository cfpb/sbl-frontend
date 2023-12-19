const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fileServerFolder: 'dist',
  fixturesFolder: false,
  projectId: 'etow1b',
  e2e: {
    baseUrl: 'http://localhost:4173/',
    specPattern: 'cypress/e2e/**/*.ts',
  },
});
