import { expect } from '@playwright/test';
import path from 'node:path';
import { test } from '../../fixtures/testFixture';

test('Form Alerts', async ({ page }) => {
  test.slow();

  // Filing page
  await test.step('Filing page', async () => {
    await page.goto('/filing');
    await expect(page.locator('h1')).toContainText(
      'File your small business lending data',
    );
    await expect(
      page.getByRole('button', { name: 'Start filing' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Start filing' }).click();
  });

  // Type of financial institution page
  await test.step('Type of financial institution page', async () => {
    await expect(page.locator('h1')).toContainText(
      'Provide type of financial institution',
    );

    // Incomplete form
    await test.step('Incomplete form', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForSelector('#TypesFinancialInstitutionsErrors', {
        timeout: 10_000,
      });
      await expect(
        page.locator(
          '#TypesFinancialInstitutionsErrors div.m-notification_content',
        ),
      ).toContainText(
        'There was a problem updating your type of financial institution',
      );
    });

    // Complete Form
    await test.step('Complete form', async () => {
      await page.getByText('Bank or savings association').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
  });

  // Upload file page
  await test.step('Upload file page', async () => {
    await expect(page.locator('h1')).toContainText('Upload file');

    // Upload file with syntax errors
    await test.step('Upload file: (errors-page-1-syntax-few.csv)', async () => {
      await expect(page.locator('h2')).toContainText('Select a file to upload');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Select a .csv file to upload').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(
          __dirname,
          '../../test-data/sample-sblar-files/errors-page-1-syntax-few.csv',
        ),
      );
      await expect(page.getByText('File upload in progress')).toBeVisible();
      await expect(page.getByText('File upload successful')).toBeVisible({
        timeout: 10_000,
      });
      await expect(page.getByText('Validation checks in progress')).toBeVisible(
        {
          timeout: 10_000,
        },
      );
      await expect(
        page.getByText('Errors were found in your file'),
      ).toBeVisible({ timeout: 60_000 });
    });

    // Continue to next page
    await test.step('Navigate: Resolve errors (syntax)', async () => {
      await page.waitForSelector('#nav-next');
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Resolve errors (syntax) page
  await test.step('Resolve errors (syntax) page', async () => {
    await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');
    await expect(page.locator('#error-header-alert')).toContainText(
      'Your register contains syntax errorsThere may be an issue with the data type or format of one or more values in your file. Make sure your register meets the requirements detailed in the filing instructions guide (section 4, "Data validation"), make the corrections, and upload a new file.',
    );
    await page
      .getByRole('button', { name: 'Continue' })
      .click({ timeout: 500 });

    await expect(page.locator('#error-footer-alert')).toContainText(
      'You must resolve syntax errors to continue.',
    );

    await page.getByRole('link', { name: 'Upload a new file' }).click();
  });

  // Upload file page
  await test.step('Upload file page', async () => {
    await expect(page.locator('h1')).toContainText('Upload file');

    // Upload file with syntax errors
    await test.step('Upload file: (errors-page-2-logic-few.csv)', async () => {
      await expect(page.locator('h2')).toContainText('Select a file to upload');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Replace your previously').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(
          __dirname,
          '../../test-data/sample-sblar-files/errors-page-2-logic-few.csv',
        ),
      );
      await expect(page.getByText('File upload in progress')).toBeVisible();
      await expect(page.getByText('File upload successful')).toBeVisible({
        timeout: 10_000,
      });
      await expect(page.getByText('Validation checks in progress')).toBeVisible(
        {
          timeout: 10_000,
        },
      );
      await expect(
        page.getByText('Errors were found in your file'),
      ).toBeVisible({ timeout: 60_000 });

      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Resolve errors (syntax) page
  await test.step('Resolve errors (syntax) page', async () => {
    await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');
    await expect(page.locator('.m-notification__success')).toContainText(
      'Your register contains no syntax errors',
    );
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  // Resolve errors (logic) page
  await test.step('Resolve errors (logic) page', async () => {
    await expect(page.locator('h1')).toContainText('Resolve errors (logic)');
    await expect(page.locator('#error-header-alert')).toContainText(
      'Your register contains logic errorsThere is missing data, incorrect data, or conflicting information in your file. Make sure your register meets the requirements detailed in the filing instructions guide (section 4, "Data validation"), make the corrections, and upload a new file.',
    );

    await page
      .getByRole('button', { name: 'Continue to next step' })
      .click({ timeout: 500 });

    await expect(page.locator('#error-footer-alert')).toContainText(
      'You must resolve all errors to continue to the next step.',
    );
    await page.getByRole('link', { name: 'Upload a new file' }).click();
  });

  // Upload file page
  await test.step('Upload file page', async () => {
    await expect(page.locator('h1')).toContainText('Upload file');

    // Upload file with warnings
    await test.step('Upload file: (warning-page-few.csv)', async () => {
      await expect(page.locator('h2')).toContainText('Select a file to upload');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Replace your previously').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(
          __dirname,
          '../../test-data/sample-sblar-files/warnings-page-few.csv',
        ),
      );
      await expect(page.getByText('File upload in progress')).toBeVisible();
      await expect(page.getByText('File upload successful')).toBeVisible({
        timeout: 10_000,
      });
      await expect(page.getByText('Validation checks in progress')).toBeVisible(
        {
          timeout: 10_000,
        },
      );
      await expect(
        page.getByText('Warnings were found in your file'),
      ).toBeVisible({ timeout: 60_000 });

      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Resolve errors (syntax) page
  await test.step('Resolve errors (syntax) page', async () => {
    await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');
    await expect(page.locator('.m-notification__success')).toContainText(
      'Your register contains no syntax errors',
    );
    await page
      .getByRole('button', { name: 'Continue' })
      .click({ timeout: 5000 });
  });

  // Resolve errors (logic) page
  await test.step('Resolve errors (logic) page', async () => {
    await expect(page.locator('h1')).toContainText('Resolve errors (logic)');
    await expect(page.locator('.m-notification__success')).toContainText(
      'Your register contains no logic errors',
    );
    await page.getByRole('button', { name: 'Continue to next step' }).click();
  });

  // Review warnings page
  await test.step('Review warnings page', async () => {
    await expect(page.locator('h1')).toContainText('Review warnings');
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(page.locator('#error-header-alert')).toContainText(
      'You must correct or verify the accuracy of register values to continue to the next step.',
    );
    await page.getByText('I verify the accuracy of').check({ timeout: 500 });
    await page.getByRole('button', { name: 'Continue to next step' }).click();
  });

  // Point of contact page
  await test.step('Point of contact page', async () => {
    await expect(page.locator('h1')).toContainText('Provide point of contact');

    // Incomplete form
    await test.step('Incomplete form', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
      await expect(page.locator('.m-notification__error')).toContainText(
        'There was a problem updating your point of contact informationEnter the first name of the point of contactEnter the last name of the point of contactEnter the phone number of the point of contactEnter the email address of the point of contactEnter the street address of the point of contactEnter the city of the point of contactSelect the state or territory of the point of contactEnter the ZIP code of the point of contact',
      );
    });

    // Complete form
    await test.step('Complete form', async () => {
      await page.getByLabel('First name').fill('Playwright');
      await page.getByLabel('Last name').fill('Test');
      await page.getByLabel('Work phone').fill('555-555-5555');
      await page.getByLabel('Email address').fill('playwright@test.com');
      await page.getByLabel('Street address line 1').fill('555 Main St.');
      await page.getByLabel('City').fill('Utah (U');
      await page.selectOption('select#state', 'UT');
      await page.getByLabel('Zip code').fill('55555');
    });

    await page.getByRole('button', { name: 'Continue to next step' }).click();
  });

  // Sign and submit page
  await test.step('Sign and submit page', async () => {
    await expect(page.locator('h1')).toContainText('Sign and submit');
  });
});
