import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Run a snapshot test
 * @param page The Playwright Page object being tested
 * @param options toHaveScreenshot options to override default configuration
 */
export const checkSnapshot = async (page: Page, options = {}) => {
  if (process.env.SBL_ENABLE_PLAYWRIGHT_SNAPSHOT_TESTING === 'true') {
    await expect(page).toHaveScreenshot({
      // Verify the full page
      fullPage: true,
      mask: [
        // Ignore flagged areas
        page.locator('.snapshot-ignore'),
        // USA flag in header is flaky in very tall snapshots
        page.locator('.u-usa-flag'),
      ],
      // CSS modifications to reduce flake (see CSS file for details)
      stylePath: 'e2e/utils/snapshotModifications.css',
      // Any option overrides provided on a test-by-test basis
      ...options,
    });
  }
};
