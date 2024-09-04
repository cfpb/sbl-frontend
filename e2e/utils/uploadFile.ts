import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import path from 'node:path';

type ErrorType = 'logic' | 'syntax' | 'warning' | null;

async function uploadFile(
  page: Page,
  newUpload: boolean,
  errorType: ErrorType,
) {
  await test.step('Upload file', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Upload file',
    );

    // Check for the upload header
    await expect(page.locator('h2'), 'h2 is correct').toContainText(
      'Select a file to upload',
    );

    // Set up file chooser promise
    const fileChooserPromise = page.waitForEvent('filechooser');

    // Click the appropriate file upload button based on newUpload value
    await (newUpload
      ? page.getByLabel('Select a .csv file to upload').click()
      : page.getByLabel('Replace your previously').click());

    // Wait for file chooser and select file
    const fileChooser = await fileChooserPromise;

    // Determine which file to upload based on error type
    const fileNames: Record<NonNullable<ErrorType>, string> = {
      syntax: 'errors-page-1-syntax-few.csv',
      logic: 'errors-page-2-logic-few.csv',
      warning: 'warnings-page-few.csv',
    };
    const fileName = errorType
      ? fileNames[errorType]
      : 'sbl-validations-all-pass-small.csv';

    await fileChooser.setFiles(
      path.join(__dirname, `../test-data/sample-sblar-files/${fileName}`),
    );

    // Check for upload progress message
    await expect(page.getByText('File upload in progress')).toBeVisible();

    // Check for upload success message
    await expect(page.getByText('File upload successful')).toBeVisible({
      timeout: 10_000,
    });

    // Check for validation progress message
    await expect(page.getByText('Validation checks in progress')).toBeVisible({
      timeout: 10_000,
    });

    const errorMessages = {
      syntax: 'Errors were found in your file',
      logic: 'Errors were found in your file',
      warning: 'Warnings were found in your file',
      null: 'Validation successful',
    };

    const message = errorMessages[errorType ?? 'null'];
    const timeout = errorType ? 60_000 : 15_000;

    await expect(page.getByText(message)).toBeVisible({ timeout });
  });
}

export default uploadFile;
