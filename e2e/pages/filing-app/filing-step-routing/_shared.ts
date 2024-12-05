/* eslint-disable no-await-in-loop */

import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { test } from '../../../fixtures/testFixture';

interface VerifyRedirects {
  page: Page;
  userShouldNotAccess: string[]; // List of paths that a user should not be able to access
  afterRedirectURL: RegExp; // RegExp that matches the URL a user should land on after redirect
  afterRedirectHeading: string; // H1 text a user should see after redirect
  currentStepPath: string; // A string at which to split the URL while preserving the LEI
  testLabel: string; // Label displayed in the Playwright logs
  test: typeof test;
}

/**
 * Ensure that, from the current Filing step, users cannot inappropriately access future steps.
 */
export const verifyRedirects = async ({
  page,
  test,
  userShouldNotAccess,
  afterRedirectURL,
  afterRedirectHeading,
  currentStepPath,
  testLabel,
}: VerifyRedirects) => {
  const [baseURL] = page.url().split(currentStepPath);

  // Note: Tests failed when using Promise.all in place of this loop approach
  for (const futureStep of userShouldNotAccess) {
    await test.step(`${testLabel}: Verify user cannot access ${futureStep}`, async () => {
      await page.goto(baseURL + futureStep);
      await expect(page).toHaveURL(afterRedirectURL);
      await expect(page.locator('h1')).toContainText(afterRedirectHeading);
    });
  }
};
