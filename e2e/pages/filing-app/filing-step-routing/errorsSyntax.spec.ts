/* eslint-disable no-await-in-loop */

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';

const testLabel = 'Filing step routing (Errors: Syntax)';

const currentStepPath = '/error';

const userShouldNotAccess = [
  '/errors/errors-logic',
  '/warnings',
  '/contact',
  '/submit',
];

const afterRedirectHeading = 'Resolve errors (syntax)';
const afterRedirectURL = /.*errors\/errors-syntax$/;

test(
  testLabel,
  async ({ page, navigateToSyntaxErrorsAfterSyntaxErrorsUpload }) => {
    test.slow();

    navigateToSyntaxErrorsAfterSyntaxErrorsUpload;

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
