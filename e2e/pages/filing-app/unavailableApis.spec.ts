import { expect } from '@playwright/test';
import path from 'node:path';
import { test, testLei } from '../../fixtures/testFixture';
import { blockApi } from '../../utils/blockApi';

test('Form Alerts and API', async ({ page }) => {
  test.slow();

  // Filing page
  await test.step('Filing Page', async () => {
    await page.goto('/filing');
    await expect(page.locator('h1')).toContainText(
      'File your small business lending data',
    );

    const startFilingButton = page.getByRole('button', {
      name: 'Start filing',
    });
    await startFilingButton.waitFor({ state: 'visible' });
    await startFilingButton.click();
  });

  // Type of Financial Institution page
  await test.step('Type of Financial Institution page', async () => {
    await expect(page.locator('h1')).toContainText(
      'Provide type of financial institution',
    );

    // Block API Call: /v1/admin/me
    await test.step('Block API: /v1/admin/me', async () => {
      await blockApi(page, '**/v1/admin/me/', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundary', async () => {
      await page.reload();
      await page.waitForSelector('h1', { state: 'visible' });
      await expect(page.locator('h1')).toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/v1/admin/me/', false);
      await expect(page.locator('h1')).toContainText(
        'Provide type of financial institution',
      );
    });

    // Complete Form and Continue
    await test.step('Navigate: Upload File', async () => {
      await page.getByText('Bank or savings association').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
  });

  // Upload file page
  await test.step('Upload file page', async () => {
    await expect(page.locator('h1')).toContainText('Upload file');

    // Block API Call: /v1/filing/institutions
    await test.step('Block API: /v1/filing/institutions', async () => {
      await blockApi(page, '**/v1/filing/institutions/**', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundary', async () => {
      await page.reload();
      await page.waitForSelector('h1', { state: 'visible' });
      await expect(page.locator('h1')).toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/v1/filing/institutions/**', false);
      await expect(page.locator('h1')).toContainText('Upload file');
    });

    // Upload file
    await test.step('Upload file: (sbl-validations-all-pass-small.csv)', async () => {
      await expect(page.locator('h2')).toContainText('Select a file to upload');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Select a .csv file to upload').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(
          __dirname,
          '../../test-data/sample-sblar-files/sbl-validations-all-pass-small.csv',
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
    });

    // Continue to next page
    await test.step('Navigate: Resolve errors (syntax)', async () => {
      await page.waitForSelector('#nav-next');
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Resolve errors page
  await test.step('Resolve errors page', async () => {
    await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');

    // Block API Call: **/submisions/latest
    await test.step('Block API: /submissions/latest', async () => {
      await blockApi(page, '**/submissions/latest', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundary', async () => {
      await page.reload();
      await page.waitForSelector('h1', { state: 'visible' });
      await expect(page.locator('h1')).toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/submissions/latest', false);
      await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');
    });

    // Navigate: Resolve errors (logic)
    await test.step('Navigate: Resolve errors (logic)', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('h1')).toContainText('Resolve errors (logic)');
    });

    await test.step('Navigate: Review Warnings', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Review warnings page
  await test.step('Review warnings page', async () => {
    await expect(page.locator('h1')).toContainText('Review warnings');

    // Block API Call: **/v1/institutions/
    await test.step('Block API: /v1/institutions', async () => {
      await blockApi(page, new RegExp(`.*?/v1/institutions/${testLei}`), true);
    });

    // Confirm Error Alert
    await test.step('Error Alert', async () => {
      test.setTimeout(120_000);
      await page.reload();
      await page.waitForSelector('h1', { state: 'visible', timeout: 60_000 });
      await expect(page.locator('h1')).toContainText('Review warnings');
      await expect(page.locator('#main .m-notification__error')).toBeVisible();
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, new RegExp(`.*?/v1/institutions/${testLei}`), false);
      await expect(page.locator('h1')).toContainText('Review warnings');
      await expect(page.locator('#main .m-notification__error')).toHaveCount(0);
    });

    await test.step('Navigate: Provide point of contact', async () => {
      await page.getByText('I verify the accuracy of').check({ timeout: 500 });
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Provide point of contact page
  await test.step('Provide point of contact page', async () => {
    await expect(page.locator('h1')).toContainText('Provide point of contact');

    // Block API Call: /v1/admin/me
    await test.step('Block API: /v1/admin/me', async () => {
      await blockApi(page, '**/v1/admin/me/', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundary', async () => {
      await page.reload();
      await page.waitForSelector('h1', { state: 'visible' });
      await expect(page.locator('h1')).toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/v1/admin/me/', false);
      await expect(page.locator('h1')).toContainText(
        'Provide point of contact',
      );
    });
  });
});
