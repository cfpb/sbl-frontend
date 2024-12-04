import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Run a snapshot test
 * @param page The Playwright Page object being tested
 * @param options toHaveScreenshot options
 */
export const checkSnapshot = async (page: Page, options = {}) => {
  if (process.env.SBL_ENABLE_PLAYWRIGHT_SNAPSHOT_TESTING === 'true') {
    await expect(page).toHaveScreenshot({
      fullPage: true, // Verify the full page
      ...options,
    });
  }
};
