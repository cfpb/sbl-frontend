import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';

test('Update Institution Profile Page', async ({ page }) => {
  test.slow();

  // Go to Profile page
  await test.step('User Profile Page', async () => {
    await page.goto('/profile/view');
    await expect(page.locator('h1')).toContainText('View your user profile');
  });

  // Go to Institution Profile page
  await test.step('Institution Profile Page', async () => {
    await page
      .getByRole('link', { name: 'RegTech Regional Reserve - ' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'View your financial institution profile',
    );
  });

  // Go to Update Institution Profile page
  await test.step('Update Institution Profile Page', async () => {
    await page
      .getByRole('link', { name: 'Update your financial institution profile' })
      .first()
      .click();
    await expect(page.locator('h1')).toContainText(
      'Update your financial institution profile',
    );
  });

  await test.step('Editable Form Fields', async () => {
    // RSSID and TIN
    await expect(page.locator('#rssd_id')).toBeEditable();
    await expect(page.getByLabel('Federal Taxpayer')).toBeEditable();

    // Checkboxes
    await expect(page.getByText('Bank or savings association')).toBeEnabled();
    await expect(page.getByText('Minority depository')).toBeEnabled();
    await expect(page.getByText('Credit union')).toBeEnabled();
    await expect(page.getByText('Non-depository institution')).toBeEnabled();
    await expect(page.getByText('Community development')).toBeEnabled();
    await expect(page.getByText('Other nonprofit financial')).toBeEnabled();
    await expect(
      page.getByText('Farm Credit System institution'),
    ).toBeEnabled();
    await expect(page.getByText('Government lender')).toBeEnabled();
    await expect(page.getByText('Commercial finance company')).toBeEnabled();
    await expect(page.getByText('Equipment finance company')).toBeEnabled();
    await expect(page.getByText('Industrial loan company')).toBeEnabled();
    await expect(page.getByText('Online lender')).toBeEnabled();

    // "Other" Form Options
    await expect(page.getByText('Other', { exact: true })).toBeEnabled();
    await expect(page.getByLabel('You must enter a type of')).not.toBeEnabled();
    await page.getByText('Other', { exact: true }).check();
    await expect(page.getByLabel('You must enter a type of')).toBeEnabled();
    await page
      .getByLabel('You must enter a type of')
      .fill('Test Institution Type');

    // Parent Entities
    await expect(page.locator('#parent_legal_name')).toBeEnabled();
    await expect(page.locator('#parent_lei')).toBeEnabled();
    await expect(page.locator('#parent_rssd_id')).toBeEnabled();
    await expect(page.locator('#top_holder_legal_name')).toBeEnabled();
    await expect(page.locator('#top_holder_lei')).toBeEnabled();
    await expect(page.locator('#top_holder_rssd_id')).toBeEnabled();

    // Reset Form
    await page.getByRole('button', { name: 'Reset form' }).click();
    await expect(page.getByLabel('You must enter a type of')).not.toBeEnabled();

    // Add Other (again)
    await page.getByText('Other', { exact: true }).check();
    await expect(page.getByLabel('You must enter a type of')).toBeEnabled();
    await page
      .getByLabel('You must enter a type of')
      .fill('Test Institution Type After Reset');

    // Submit
    await page.getByRole('button', { name: 'Submit' }).click();

    // Summary page
    await expect(page.locator('h1')).toContainText(
      'Your update request has been submitted',
    );
    await expect(
      page
        .getByRole('link', { name: 'email our support staff' })
        .getAttribute('href'),
    ).resolves.toEqual(
      'mailto:SBLHelp@cfpb.gov?subject=[BETA] Update your financial institution profile: Questions after submitting form',
    );
  });
});
