/* eslint-disable no-await-in-loop */

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';

const testLabel = 'Filing step routing (Warnings)';

const currentStepPath = '/warnings';

const userShouldNotAccess = ['/contact', '/submit'];

const afterRedirectHeading = 'Review warnings';
const afterRedirectURL = /.*\/warnings$/;

test(
  testLabel,
  async ({ page, navigateToReviewWarningsAfterOnlyWarningsUpload }) => {
    test.slow();

    navigateToReviewWarningsAfterOnlyWarningsUpload;

    const [baseURL] = page.url().split(currentStepPath);

    for (const step of userShouldNotAccess) {
      await test.step(`${testLabel}: Verify user cannot access ${step}`, async () => {
        await page.goto(baseURL + step);
        await expect(page).toHaveURL(afterRedirectURL);
        await expect(page.locator('h1')).toContainText(afterRedirectHeading);
      });
    }
  },
);
