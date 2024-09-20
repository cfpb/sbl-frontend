import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';

test('Complete the User Profile: Checking for form errors based on user input', async ({
  page,
}) => {
  test.slow();

  await test.step('Complete the User Profile: Check that the error header render when no input is filled', async () => {
    await page.getByLabel('Submit User Profile').click();
    await expect(page.locator('#step1FormErrorHeader div').first()).toBeVisible(
      {
        timeout: 30_000,
      },
    );
  });

  await test.step('Complete the User Profile: Check the first and last names for invalid input', async () => {
    await page.getByLabel('First name').fill('!@#$%^&*()');
    await page.getByLabel('Last name').fill('!@#$%^&*()');
    await page.getByLabel('Submit User Profile').click();
    await expect(page.locator('#step1FormErrorHeader')).toContainText(
      'Enter valid characters for your first name',
    );
    await expect(page.locator('#step1FormErrorHeader')).toContainText(
      'Enter valid characters for your last name',
    );
    await expect(page.locator('form')).toContainText(
      'Your first name must not contain invalid characters',
    );
    await expect(page.locator('form')).toContainText(
      'Your last name must not contain invalid characters',
    );
  });
});
