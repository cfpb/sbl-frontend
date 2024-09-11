import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixture';

const expectedNoAssociationsSummaryUrl =
  /\/profile\/complete\/summary\/submitted$/;

// Test with isNonAssociatedUser true
test.use({ isNonAssociatedUser: true });
test('Complete User Profile -- No Associations -- process', async ({
  page,
}) => {
  test.slow();

  await test.step('Fillout Complete User Profile (No Associations) and verify 24-48 hour summary message', async () => {
    await page.getByLabel('First name').click();
    await page.getByLabel('First name').fill('exampleFirstName');
    await page.getByLabel('Last name').click();
    await page.getByLabel('Last name').fill('exampleLastName');
    await page.getByLabel('Financial institution name').click();
    await page
      .getByLabel('Financial institution name')
      .fill('exampleFinancialInstitutionName');
    await page.getByLabel('Legal Entity Identifier (LEI)').click();
    await page
      .getByLabel('Legal Entity Identifier (LEI)')
      .fill('12345678901234567890');
    await page.getByLabel('Submit User Profile').click();

    // redirected to the summary page
    await expect(page).toHaveURL(expectedNoAssociationsSummaryUrl);
    await expect(page.getByRole('heading')).toContainText(
      'Your request has been submitted',
    );
    await expect(page.locator('#Summary')).toContainText(
      'Your request has been submitted to our support staff for review',
    );
    await expect(page.locator('#Summary')).toContainText(
      'You will not have access to the platform until we have associated your user profile with a financial institution in our database. Please allow 24-48 hours for a response during normal business hours. If you need further assistance email our support staff. Otherwise you can close this window.',
    );
    await expect(page.locator('#Summary div').first()).toBeVisible();
  });
});
