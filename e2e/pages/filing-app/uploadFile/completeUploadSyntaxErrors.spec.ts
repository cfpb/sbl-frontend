import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import { ResultUploadMessage, uploadFile } from '../../../utils/uploadFile';
import { verifyDownloadableReport } from '../../../utils/verifyDownloadableReport';

test('Resolve Errors (Syntax)', async ({ page, navigateToUploadFile }) => {
  test.slow();

  navigateToUploadFile;

  await test.step('Upload file: navigate to Resolve Errors (syntax) after upload', async () => {
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: true,
      testTitle:
        'Upload file: upload small file with syntax errors (all_syntax_errors.csv)',
      filePath: '../test-data/sample-sblar-files/all_syntax_errors.csv',
      resultMessage: ResultUploadMessage.syntax,
    });

    await test.step('Verify Resolve Errors (syntax) and number of errors', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
      await expect(page.locator('h1')).toContainText(
        'Resolve errors (syntax)',
        {
          timeout: 30_000,
        },
      );
      await expect(page.locator('#error-header-alert')).toBeVisible({
        timeout: 30_000,
      });
      await expect(page.locator('h2')).toContainText(
        'Single-field errors: 136 found',
        {
          timeout: 20_000,
        },
      );
    });

    await verifyDownloadableReport({ testUsed: test, pageUsed: page });
  });
});
