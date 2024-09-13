import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';

test('Point of Contact: Checking for form errors based on user input', async ({
  page,
  navigateToProvidePointOfContact,
}) => {
  test.slow();

  navigateToProvidePointOfContact;

  await test.step('Point of Contact: Check the error header render when no input is filled', async () => {
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(
      page.locator('#PointOfContactFormErrors div').first(),
    ).toBeVisible();
  });

  await test.step('Point of Contact: Check the first and last names for invalid input', async () => {
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await page.getByLabel('First name').click();
    await page.getByLabel('First name').fill('$!@#%^&*()');
    await page.getByLabel('Last name').click();
    await page.getByLabel('Last name').fill('$!@#%^&*()');
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(page.locator('form')).toContainText(
      'The first name must not contain invalid characters',
    );
    await expect(page.locator('form')).toContainText(
      'The last name must not contain invalid characters',
    );
    await expect(page.locator('#PointOfContactFormErrors')).toContainText(
      'The first name must not contain invalid characters',
    );
    await expect(page.locator('#PointOfContactFormErrors')).toContainText(
      'The last name must not contain invalid characters',
    );
  });
});
