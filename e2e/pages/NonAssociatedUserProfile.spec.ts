import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixture';

const expectedNoAssociationsUrl =
  'http://localhost:8899/profile/complete/no-associations';
const expectedNoAssociationsSummaryUrl =
  'http://localhost:8899/profile/complete/summary/submitted';

// Test with isNonAssociatedUser true
test.use({ isNonAssociatedUser: true });
test('Complete User Profile -- No Associations -- process', async ({
  page,
}) => {
  test.slow();

  await test.step('navigated to the no associations version of Complete User Profile ', async () => {
    await expect(page).toHaveURL(expectedNoAssociationsUrl);
    await expect(page.locator('h1')).toContainText(
      'Complete your user profile',
    );
    await expect(
      page.locator('#create-profile-form-no-associations'),
    ).toContainText(
      'Indicate the financial institution for which you are authorized to file to complete your user profile. Once we have associated your user profile with a financial institution in our database you will have access to the platform and can begin the filing process.',
    );
    await expect(
      page.locator('#create-profile-form-no-associations'),
    ).toContainText(
      'In order to begin using the platform you must have a Legal Entity Identifier (LEI) for your financial institution. If your organization does not have an LEI, visit the Global LEI Foundation (GLEIF) to get an LEI. If you need assistance with this form, email our support staff.',
    );
    await expect(page.locator('form')).toContainText(
      'Provide your financial institution details',
    );
    await expect(page.locator('form')).toContainText(
      'Provide the name and LEI of the financial institution for which you are authorized to file. If you are authorized to file for an additional financial institution, email our support staff.',
    );
    await expect(page.locator('form')).toContainText(
      'Financial institution name',
    );
    await expect(page.locator('form')).toContainText(
      'Legal Entity Identifier (LEI)',
    );
    await expect(page.locator('form')).toContainText(
      'LEI must be 20 characters and contain only A-Z and 0-9 (no special characters).',
    );
    await expect(page.getByLabel('Financial institution name')).toBeVisible();
    await expect(
      page.getByLabel('Legal Entity Identifier (LEI)'),
    ).toBeVisible();
  });

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
