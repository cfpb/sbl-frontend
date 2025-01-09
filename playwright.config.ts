import {
  PlaywrightTestConfig,
  ReporterDescription,
  devices,
} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

// Test specific timeouts are configured here
const CI_TIMEOUT_MULTIPLIER = 1;

const TIMEOUT_GLOBAL =
  60 * 60 * 1000 * (process.env.CI ? CI_TIMEOUT_MULTIPLIER : 1);
const TIMEOUT_TEST =
  5 * 60 * 1000 * (process.env.CI ? CI_TIMEOUT_MULTIPLIER : 1);
const TIMEOUT_EXPECT = 60 * 1000 * (process.env.CI ? CI_TIMEOUT_MULTIPLIER : 1);

// Reporter configs. See https://playwright.dev/docs/test-reporters
const BASE_REPORTERS: ReporterDescription[] = [
  ['html', { outputFolder: 'playwright-reports/html', open: 'on-failure' }],
  ['blob', { outputFile: 'playwright-reports/blob.zip' }],
  ['json', { outputFile: 'playwright-reports/json.json' }],
  ['junit', { outputFile: 'playwright-reports/junit.xml' }],
  ['list', { printSteps: true }],
];

if (process.env.CI) {
  BASE_REPORTERS[0][1].open = 'never';
  BASE_REPORTERS.push(['github']);
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: undefined,
  /* Timeout for the entire test suite */
  globalTimeout: TIMEOUT_GLOBAL,
  /* Timeout for per test */
  timeout: TIMEOUT_TEST,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: BASE_REPORTERS,
  /* Expect specific settings */
  expect: {
    /* Timeout for expects */
    timeout: TIMEOUT_EXPECT,
    /* Snapshot testing */
    toHaveScreenshot: {
      maxDiffPixels: 0,
    },
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: `${
      process.env.SBL_PLAYWRIGHT_TEST_TARGET ?? 'http://localhost:8899'
    }/`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // See https://playwright.dev/docs/network#missing-network-events-and-service-workers
    serviceWorkers: 'block',

    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // TODO: we'll enable these when we have more tests in the suite
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
};

export default config;
