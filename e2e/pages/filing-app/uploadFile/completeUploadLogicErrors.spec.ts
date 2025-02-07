import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import {
  clickContinue,
  clickContinueNext,
} from '../../../utils/navigation.utils';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { TIMEOUT_XS } from '../../../utils/timeoutConstants';
import { ResultUploadMessage, uploadFile } from '../../../utils/uploadFile';
import { verifyDownloadableReport } from '../../../utils/verifyDownloadableReport';

test('Resolve Errors (Logic)', async ({ page, navigateToUploadFile }) => {
  navigateToUploadFile;

  await test.step('Upload file: navigate to Resolve Errors (Logic) after upload', async () => {
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: true,
      testTitle:
        'Upload file: upload small file with logic errors (logic-errors_single&multi_and_warnings.csv)',
      filePath:
        '../test-data/sample-sblar-files/logic-errors_single&multi_and_warnings.csv',
      resultMessage: ResultUploadMessage.logic,
    });

    await test.step('Verify Resolve Errors (syntax) and zero errors', async () => {
      await clickContinueNext(test, page);
      await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');
      await expect(
        page.getByText('Your register contains no syntax errors'),
      ).toBeVisible();
      await checkSnapshot(page);
    });

    await test.step('Verify Resolve Errors (logic) and number of errors', async () => {
      await clickContinue(test, page);
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
      await checkSnapshot(page);
    });

    await test.step('Verify navigation of paginated (logic) content', async () => {
      await clickContinue(test, page);

      const section = page
        .locator('#multi-field-errors div')
        .filter({ hasText: 'E2004' })
        .first();
      const nextButton = section.getByRole('button', {
        name: 'Next',
        exact: true,
      });

      const verifyPage3 = async () => {
        await nextButton.click();
        const page3row1 = section
          .getByRole('row')
          .filter({ hasText: '123456789TESTBANK12300080' });
        await expect(page3row1.getByRole('cell').nth(0)).toHaveText('62');
        await expect(page3row1.getByRole('cell').nth(2)).toHaveText('999');
        await expect(page3row1.getByRole('cell').nth(3)).toHaveText('1');
        await page.waitForTimeout(2 * TIMEOUT_XS);
        await checkSnapshot(page);
      };

      await test.step('Page 1, Row 1', async () => {
        const page1row1 = section
          .getByRole('row')
          .filter({ hasText: '123456789TESTBANK12300034' });
        await expect(page1row1.getByRole('cell').nth(0)).toHaveText('18');
        await expect(page1row1.getByRole('cell').nth(2)).toHaveText('999');
        await expect(page1row1.getByRole('cell').nth(3)).toHaveText('2222');
      });
      await test.step('Page 2, Row 1', async () => {
        await nextButton.click();

        const page2row1 = section
          .getByRole('row')
          .filter({ hasText: '123456789TESTBANK12300060' });
        await expect(page2row1.getByRole('cell').nth(0)).toHaveText('42');
        await expect(page2row1.getByRole('cell').nth(2)).toHaveText('999');
        await expect(page2row1.getByRole('cell').nth(3)).toHaveText('1');
        await checkSnapshot(page);
      });

      await test.step('Page 3, Row 1', async () => {
        await verifyPage3();
        await checkSnapshot(page);
      });

      await test.step('Last page, "Next" disabled', async () => {
        // Note: We don't set the "disabled" attribute but this verifies that
        //       clicking the button leaves the user on the last page
        await verifyPage3();
      });
    });

    await verifyDownloadableReport({ testUsed: test, pageUsed: page });
  });
});
