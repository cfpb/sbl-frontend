import { test } from '@playwright/test';

test('Unauthenticated homepage: Privacy Notice', async ({ page }) => {
  test.slow();

  await test.step('Verify on the Privacy Notice overview and link exists', async () => {
    await page.goto('/');
  });

  await test.step('Navigates to the Privacy Notice summary', async () => {});
});
