import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixture';

const expectedNoAssociationsUrl =
  'http://localhost:8899/profile/complete/no-associations';

// Test with isNonAssociatedUser true
test.use({ isNonAssociatedUser: true });
test('Complete User Profile -- no associations', async ({ page }) => {
  // await page.goto('/');
  // await page.getByLabel('Home').click();
  // await expect(page).toHaveURL('https://www.consumerfinance.gov/');

  await expect(page.locator('h1')).toContainText('Complete your user profile');
  await expect(page).toHaveURL(expectedNoAssociationsUrl);
});
