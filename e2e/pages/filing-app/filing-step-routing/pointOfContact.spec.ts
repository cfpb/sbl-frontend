/* eslint-disable no-await-in-loop */

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';

const testLabel = 'Filing step routing (Point of Contact)';

const currentStepPath = '/contact';

const userShouldNotAccess = ['/submit'];

const afterRedirectHeading = 'Provide point of contact';
const afterRedirectURL = /.*\/contact$/;

test(testLabel, async ({ page, navigateToProvidePointOfContact }) => {
  test.slow();

  navigateToProvidePointOfContact;

  const [baseURL] = page.url().split(currentStepPath);

  for (const step of userShouldNotAccess) {
    await test.step(`${testLabel}: Verify user cannot access ${step}`, async () => {
      await page.goto(baseURL + step);
      await expect(page).toHaveURL(afterRedirectURL);
      await expect(page.locator('h1')).toContainText(afterRedirectHeading);
    });
  }
});
