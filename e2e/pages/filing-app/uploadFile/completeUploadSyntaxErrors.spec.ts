import { expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { test } from '../../../fixtures/testFixture';

const downloadPath = path.resolve(__dirname, 'downloads');
let downloadFilePath: string;

test('Resolve Errors (Syntax)', async ({ page, navigateToUploadFile }) => {
  test.slow();

  navigateToUploadFile;

  await test.step('Upload file: navigate to Resolve Errors (syntax) after upload', async () => {
    await test.step('Upload file: upload small file with only warnings (all_syntax_errors.csv)', async () => {
      await expect(page.locator('h2')).toContainText('Select a file to upload');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Select a .csv file to upload').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(
          __dirname,
          '/../../../test-data/sample-sblar-files/all_syntax_errors.csv',
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
      ).toBeVisible({ timeout: 40_000 });
    });

    await test.step('Verify Resolve Errors (syntax) and number of errors', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
      await expect(page.locator('h1')).toContainText(
        'Resolve errors (syntax)',
        {
          timeout: 20_000,
        },
      );
      await expect(page.locator('#error-header-alert')).toBeVisible({
        timeout: 20_000,
      });
      await expect(page.locator('h2')).toContainText(
        'Single-field errors: 136 found',
        {
          timeout: 20_000,
        },
      );
    });

    await test.step('Verify downloadable report', async () => {
      // Set up listener for the download event
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Download report' }).click();
      const download = await downloadPromise;

      // Save downloaded file to the specified location
      downloadFilePath = path.join(
        downloadPath,
        await download.suggestedFilename(),
      );
      await download.saveAs(downloadFilePath);

      // Wait for the download to complete
      await download.path();

      // Verify the file exists
      expect(fs.existsSync(downloadFilePath)).toBeTruthy();

      // Verify the file is not empty
      const fileSize = fs.statSync(downloadFilePath).size;
      expect(fileSize).toBeGreaterThan(0);

      console.log(`Downloaded file path: ${downloadFilePath}`);
    });
  });
});

// Use the `test.afterEach` hook to delete only the downloaded file
test.afterEach(async () => {
  try {
    // Small delay to ensure the test is fully complete
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    // Delete the downloaded file if it exists
    if (downloadFilePath && fs.existsSync(downloadFilePath)) {
      fs.unlinkSync(downloadFilePath);
      console.log(`Deleted the downloaded file: ${downloadFilePath}`);
    }
  } catch (error) {
    console.error(
      `Failed to delete file: ${downloadFilePath}. Error: ${
        (error as Error).message
      }`,
    );
  }
});
