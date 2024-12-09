import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { checkSnapshot } from '../../utils/snapshotTesting';

test('User Profile Page', async ({ page, navigateToFilingHome }) => {
  // Go to Profile page
  await test.step('H1 Heading', async () => {
    navigateToFilingHome;
    await page.goto('/profile/view');
    await expect(page.locator('h1')).toContainText('View your user profile');
    await checkSnapshot(page);
  });

  // Verify Name + Email
  await test.step('Name & Email', async () => {
    await expect(
      page.getByRole('heading', { name: 'Full name' }).locator('+ p'),
    ).toContainText('Test User');
    await expect(
      page.getByRole('heading', { name: 'Email address' }).locator('+ p'),
    ).toContainText('playwright-test-user');
  });

  // Test Institution Link
  await test.step('Institution Link', async () => {
    await page
      .getByRole('link', { name: 'RegTech Regional Reserve - ' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'View your financial institution profile',
    );
  });

  // Test Breadcrumb
  await test.step('Breadcrumb', async () => {
    await page.locator('#main').getByRole('link', { name: 'Home' }).click();
    await expect(page.locator('h1')).toContainText('File your lending data');
  });

  // Test Name in Profile Link
  await test.step('Profile Link', async () => {
    await page
      .locator('.nav-items')
      .getByRole('link', { name: 'Playwright' })
      .click();
    await expect(page.locator('h1')).toContainText('View your user profile');
  });
});
