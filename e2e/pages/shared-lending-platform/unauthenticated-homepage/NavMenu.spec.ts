import { expect, test } from '@playwright/test';

test('Unauthenticated homepage: Validate Nav Menu', async ({ page }) => {
  await test.step('Verify nav options', async () => {
    const navContainer = page.locator('nav#nav-links');
    await expect(navContainer).not.toBeVisible();
  });
});
