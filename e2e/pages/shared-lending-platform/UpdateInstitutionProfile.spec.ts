import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';

test('Update Institution Profile Page', async ({ page }) => {
  test.slow();

  // Profile page
  await test.step('User Profile Page', async () => {
    await page.goto('/profile/view');
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'View your user profile',
    );
    await test.step('Click: Institution link', async () => {
      await page
        .getByRole('link', { name: 'RegTech Regional Reserve - ' })
        .click();
    });
  });

  // Institution Profile page
  await test.step('Institution Profile Page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'View your financial institution profile',
    );
    await test.step('Click: Update link', async () => {
      await page
        .getByRole('link', {
          name: 'Update your financial institution profile',
        })
        .first()
        .click();
    });
  });

  // Update Institution Profile page
  await test.step('Update Institution Profile Page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Update your financial institution profile',
    );

    await test.step('Editable Form Fields', async () => {
      // RSSID and TIN
      await expect(
        page.locator('#rssd_id'),
        'RSSD ID is editable',
      ).toBeEditable();
      await expect(
        page.getByLabel('Federal Taxpayer'),
        'TIN is editable',
      ).toBeEditable();

      // Checkboxes
      await expect(
        page.getByText('Bank or savings association'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Minority depository'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Credit union'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Non-depository institution'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Community development'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Other nonprofit financial'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Farm Credit System institution'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Government lender'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Commercial finance company'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Equipment finance company'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Industrial loan company'),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByText('Online lender'),
        'Checkbox is enabled',
      ).toBeEnabled();

      // "Other" Form Options
      await expect(
        page.getByText('Other', { exact: true }),
        'Checkbox is enabled',
      ).toBeEnabled();
      await expect(
        page.getByLabel('You must enter a type of'),
        'Other Field is disabled',
      ).not.toBeEnabled();
      await test.step('Click: Other checkbox', async () => {
        await page.getByText('Other', { exact: true }).check();
      });
      await expect(
        page.getByLabel('You must enter a type of'),
        'Other Field is enabled',
      ).toBeEnabled();
      await test.step('Fill: Other field', async () => {
        await page
          .getByLabel('You must enter a type of')
          .fill('Test Institution Type');
      });

      // Parent Entities
      await expect(
        page.locator('#parent_legal_name'),
        'Parent Name is editable',
      ).toBeEditable();
      await expect(
        page.locator('#parent_lei'),
        'Parent LEI is editable',
      ).toBeEditable();
      await expect(
        page.locator('#parent_rssd_id'),
        'Parent RSSD is editable',
      ).toBeEditable();
      await expect(
        page.locator('#top_holder_legal_name'),
        'Top-Holder Name is editable',
      ).toBeEditable();
      await expect(
        page.locator('#top_holder_lei'),
        'Top-Holder LEI is editable',
      ).toBeEditable();
      await expect(
        page.locator('#top_holder_rssd_id'),
        'Top-Holder RSSD is editable',
      ).toBeEditable();
    });

    // Reset Form
    await test.step('Click: Reset form', async () => {
      await page.getByRole('button', { name: 'Reset form' }).click();
      await expect(
        page.getByLabel('You must enter a type of'),
        'Other field reset',
      ).not.toBeEnabled();
    });

    // Add Other (again)
    await test.step('Complete Other field', async () => {
      await page.getByText('Other', { exact: true }).check();
      await expect(page.getByLabel('You must enter a type of')).toBeEnabled();
      await page
        .getByLabel('You must enter a type of')
        .fill('Test Institution Type After Reset');
    });

    // Submit
    await test.step('Click: Submit', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
    });
  });
  // Summary page
  await test.step('Summary page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Your update request has been submitted',
    );
    await test.step('Success message is visible', async () => {
      await expect(
        page
          .getByRole('link', { name: 'email our support staff' })
          .getAttribute('href'),
      ).resolves.toEqual(
        'mailto:SBLHelp@cfpb.gov?subject=[BETA] Update your financial institution profile: Questions after submitting form',
      );
    });
  });
});