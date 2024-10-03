import { expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { test } from '../../../fixtures/testFixture';
import { ResultUploadMessage, uploadFile } from '../../../utils/uploadFile';

const downloadPath = path.resolve(__dirname, 'downloads');
let downloadFilePath: string;

test('Resolve Errors (Logic)', async ({ page, navigateToUploadFile }) => {
  test.slow();

  navigateToUploadFile;

  await test.step('Upload file: navigate to Resolve Errors (Logic) after upload', async () => {
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: true,
      testTitle:
        'Upload file: upload small file with only warnings (logic-errors_medium.csv)',
      filePath:
        '../test-data/sample-sblar-files/logic-errors_single&multi_and_warnings.csv',
      resultMessage: ResultUploadMessage.logic,
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
      await expect(page.locator('h1')).toContainText('Resolve errors (logic)', {
        timeout: 30_000,
      });
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

      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.log(`Deleted the downloaded file: ${downloadFilePath}`);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to delete file: ${downloadFilePath}. Error: ${
        (error as Error).message
      }`,
    );
  }
});
