import { expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { test } from '../../../fixtures/testFixture';

test('Resolve Errors (Logic)', async ({ page, navigateToUploadFile }) => {
  test.slow();

  navigateToUploadFile;

  await test.step('Upload file: navigate to Resolve Errors (Logic) after upload', async () => {
    await test.step('Upload file: upload small file with only warnings (logic-errors_medium.csv)', async () => {
      await expect(page.locator('h2')).toContainText('Select a file to upload');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Select a .csv file to upload').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(
          __dirname,
          '/../../../test-data/sample-sblar-files/logic-errors_single&multi_and_warnings.csv',
        ),
      );
      await expect(page.getByText('File upload in progress')).toBeVisible();
      await expect(page.getByText('File upload successful')).toBeVisible({
        timeout: 10_000,
      });
      await expect(page.getByText('Validation checks in progress')).toBeVisible(
        { timeout: 10_000 },
      );
      await expect(
        page.getByText('Errors were found in your file'),
      ).toBeVisible({ timeout: 30_000 });
    });

    await test.step('Verify Resolve Errors (syntax) and zero errors', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
      await expect(page.locator('h1')).toContainText(
        'Resolve errors (syntax)',
        {
          timeout: 30_000,
        },
      );
      await expect(
        page.getByText('Your register contains no syntax errors'),
      ).toBeVisible({ timeout: 40_000 });
    });

    await test.step('Verify Resolve Errors (logic) and number of errors', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('h1')).toContainText('Resolve errors (logic)');
      await expect(page.locator('#error-header-alert')).toContainText(
        'Your register contains logic errors',
      );
      await expect(page.locator('#single-field-errors')).toContainText(
        'Single-field errors: 1 found',
      );
      await expect(page.locator('#register-level-errors')).toContainText(
        'Register-level errors: 2 found',
      );
      await expect(page.locator('#multi-field-errors')).toContainText(
        'Multi-field errors: 52 found',
      );
    });

    await test.step('Verify downloadable report', async () => {
      // Set up download path
      const downloadPath = path.resolve(__dirname, 'downloads');
      if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath);
      }

      // Set up listener for the download event
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Download report' }).click();
      const download = await downloadPromise;

      const suggestedFilename = await download.suggestedFilename();

      // Save the download to a specific location
      const downloadFilePath = path.join(downloadPath, suggestedFilename);
      await download.saveAs(downloadFilePath);

      // Wait for the download to complete
      await download.path();

      // Verify the file exists
      expect(fs.existsSync(downloadFilePath)).toBeTruthy();

      // Verify file size
      const fileSize = fs.statSync(downloadFilePath).size;
      expect(fileSize).toBeGreaterThan(0); // Ensure the file is not empty
    });
  });
});
