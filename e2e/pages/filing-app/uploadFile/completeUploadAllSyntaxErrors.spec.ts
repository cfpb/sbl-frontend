import { expect } from '@playwright/test';
import path from 'node:path';
import { test } from '../../../fixtures/testFixture';

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
      ).toBeVisible({ timeout: 60_000 });
    });
  });
});
