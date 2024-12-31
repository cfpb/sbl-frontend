import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { expectLinkOpensSameTab } from '../../utils/openLink';
import { checkSnapshot } from '../../utils/snapshotTesting';

test('User Profile Page', async ({ page, navigateToFilingHome }) => {
  // Go to Profile page
  await test.step('H1 Heading', async () => {
    navigateToFilingHome;
    await page.goto('/profile/view');
    await expect(page.locator('h1')).toContainText('View your user profile');
    await checkSnapshot(page);
  });

  await test.step('Verify nav options', async () => {
    const navContainer = page.locator('nav#nav-links');
    await expect(navContainer).toBeVisible();
    await expect(
      navContainer.getByRole('button', { name: 'LOG OUT' }),
    ).toBeVisible();
    await expect(
      navContainer.getByRole('link', { name: 'Filing', exact: true }),
    ).toBeVisible();
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

  await test.step('Verify link targets', async () => {
    const main = page.locator('#main');
    const navContainer = page.locator('nav#nav-links');

    const home = await main.getByRole('link', { name: 'Home' });
    await expectLinkOpensSameTab(home);

    const userProfile = page.locator('.nav-item.profile');
    await expectLinkOpensSameTab(userProfile);

    const logout = await navContainer.getByRole('button', { name: 'LOG OUT' });
    await expectLinkOpensSameTab(logout);

    const visitLoginGovAccount = page.getByRole('link', {
      name: 'visit your Login.gov account page',
    });
    await expectLinkOpensSameTab(visitLoginGovAccount);

    const visitInstitutionProfile = page
      .locator('.associated-institutions .m-list_item')
      .getByRole('link');
    await expectLinkOpensSameTab(visitInstitutionProfile);
  });
});
