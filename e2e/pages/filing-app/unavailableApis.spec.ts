import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { blockApi, verifyApiBlockThenUnblock } from '../../utils/blockApi';
import { clickContinue, clickContinueNext } from '../../utils/navigation.utils';
import { checkSnapshot } from '../../utils/snapshotTesting';
import { ResultUploadMessage, uploadFile } from '../../utils/uploadFile';

test('Blocking API Calls - Error Boundaries', async ({
  page,
  navigateToProvideTypeOfFinancialInstitution,
}) => {
  // Type of Financial Institution page
  await test.step('Type of Financial Institution page', async () => {
    navigateToProvideTypeOfFinancialInstitution;

    await verifyApiBlockThenUnblock({
      expectedHeading: 'Provide type of financial institution',
      endpointPath: '**/v1/admin/me/',
      endpointLabel: '/v1/admin/me/',
      page,
    });

    // Complete Form and Continue
    await test.step('Complete Form', async () => {
      await page.getByText('Bank or savings association').check();
      await clickContinue(test, page);
    });
  });

  // Upload file page
  await test.step('Upload file page', async () => {
    await verifyApiBlockThenUnblock({
      expectedHeading: 'Upload file',
      endpointPath: '**/v1/filing/institutions/**',
      endpointLabel: '/v1/filing/institutions',
      page,
    });

    // Upload file
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: true,
      testTitle: 'Upload passing file with warnings',
      filePath:
        '../test-data/sample-sblar-files/sbl-validations-all-pass-small.csv',
      resultMessage: ResultUploadMessage.warning,
    });

    // Continue to next page
    await clickContinueNext(test, page);
  });

  // Resolve errors page
  await test.step('Resolve errors page', async () => {
    await verifyApiBlockThenUnblock({
      expectedHeading: 'Resolve errors (syntax)',
      endpointPath: '**/submissions/latest',
      endpointLabel: '/submissions/latest',
      page,
    });

    // Navigate: Resolve errors (logic)
    await test.step('Resolve errors (logic) page', async () => {
      await clickContinue(test, page);
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'Resolve errors (logic)',
      );
    });
    await clickContinueNext(test, page);
  });

  // Review warnings page
  await test.step('Review warnings page', async () => {
    await expect(page.locator('h1')).toContainText('Review warnings');

    // Block API Call: **/v1/institutions/
    await test.step('Block API: /v1/institutions', async () => {
      await blockApi(page, /.*?\/v1\/institutions\/.*TESTACCT053.*/, true);
    });

    // Confirm Error Alert
    await test.step('Error Alert is visible', async () => {
      await test.step('Refresh page', async () => {
        await page.reload();
      });

      await expect(page.locator('h1'), 'h1 is visible').toContainText(
        'Review warnings',
      );
      await expect(
        page.locator('#main .m-notification__error'),
        'Error Alert is visible',
      ).toBeVisible();
      await checkSnapshot(page);
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, /.*?\/v1\/institutions\/.*TESTACCT053.*/, false);
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'Review warnings',
      );
      await expect(page.locator('#main .m-notification__error')).toHaveCount(0);
    });

    await test.step('Click: Continue', async () => {
      await page.getByText('I verify the accuracy of').check();
      await clickContinueNext(test, page);
    });
  });

  // Provide filing details page
  await test.step('Provide filing details page', async () => {
    await verifyApiBlockThenUnblock({
      expectedHeading: 'Provide filing details',
      endpointPath: '**/v1/admin/me/',
      endpointLabel: '/v1/admin/me',
      page,
    });
  });
});
