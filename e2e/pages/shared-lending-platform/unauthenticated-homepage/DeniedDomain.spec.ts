import { expect, test } from '@playwright/test';
import { webcrypto } from 'node:crypto';
import { checkSnapshot } from '../../../utils/snapshotTesting';

// this is just an example test (e2e tests should be way longer than this)
test('Unauthenticated homepage: Registering with an invalid email domain', async ({
  page,
}) => {
  await test.step('Registering a new user with gmail.com email domain', async () => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign in with Login.gov' }).click();

    // Registering with gmail.com account
    const seed = webcrypto
      .getRandomValues(new Uint32Array(1))[0]
      .toString()
      .padStart(10, '0');
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill(`exampleUsername-${seed}`);
    await page.getByLabel('Password *', { exact: true }).click();
    await page
      .getByLabel('Password *', { exact: true })
      .fill('examplePassword');
    await page.getByLabel('Confirm password').click();
    await page.getByLabel('Confirm password').fill('examplePassword');
    await page.getByLabel('Email').click();
    await page
      .getByLabel('Email')
      .fill(`playwright-test-user-${seed}@gmail.com`);
    await page.getByLabel('First name').click();
    await page.getByLabel('First name').fill('exampleFirstname');
    await page.getByLabel('Last name').click();
    await page.getByLabel('Last name').fill('exampleLastname');
    await page.getByRole('button', { name: 'Register' }).click();

    // Verify having the user navigated to the error summary
    await expect(page.getByRole('heading')).toContainText(
      'Your email domain is not authorized',
    );
    await checkSnapshot(page);
    await expect(page.locator('#Summary div').first()).toBeVisible();
  });
});
