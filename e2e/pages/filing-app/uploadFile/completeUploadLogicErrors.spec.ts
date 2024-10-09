import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import { ResultUploadMessage, uploadFile } from '../../../utils/uploadFile';
import { verifyDownloadableReport } from '../../../utils/verifyDownloadableReport';

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

    await verifyDownloadableReport({ testUsed: test, pageUsed: page });
  });
});
