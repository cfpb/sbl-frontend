import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { blockApi } from '../../utils/blockApi';
import uploadFile from '../../utils/uploadFile';

test('Form Alerts and API', async ({
  page,
  navigateToProvideTypeOfFinancialInstitution,
}) => {
  test.slow();

  // Type of Financial Institution page
  await test.step('Type of Financial Institution page', async () => {
    navigateToProvideTypeOfFinancialInstitution;
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Provide type of financial institution',
    );

    // Block API Call: /v1/admin/me
    await test.step('Block API: /v1/admin/me', async () => {
      await blockApi(page, '**/v1/admin/me/', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundary is visible', async () => {
      await test.step('Refresh page', async () => {
        await page.reload();
      });
      // ToDo: Make retries less when testing (#916)
      await test.step('Waiting for retries timeout', async () => {
        await page.waitForSelector('h1', { state: 'visible' });
      });
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/v1/admin/me/', false);
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'Provide type of financial institution',
      );
    });

    // Complete Form and Continue
    await test.step('Complete Form', async () => {
      await page.getByText('Bank or savings association').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });
  });

  // Upload file page
  await test.step('Upload file page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Upload file',
    );

    // Block API Call: /v1/filing/institutions
    await test.step('Block API: /v1/filing/institutions', async () => {
      await blockApi(page, '**/v1/filing/institutions/**', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundaryis visible', async () => {
      await test.step('Refresh page', async () => {
        await page.reload();
      });
      // ToDo: Make retries less when testing (#916)
      await test.step('Waiting for retries timeout', async () => {
        await page.waitForSelector('h1', { state: 'visible' });
      });
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/v1/filing/institutions/**', false);
      await expect(page.locator('h1')).toContainText('Upload file');
    });

    // Upload file
    await uploadFile(page, true, null);

    // Continue to next page
    await test.step('Click: Continue', async () => {
      await page.waitForSelector('#nav-next');
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Resolve errors page
  await test.step('Resolve errors page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Resolve errors (syntax)',
    );

    // Block API Call: **/submisions/latest
    await test.step('Block API: /submissions/latest', async () => {
      await blockApi(page, '**/submissions/latest', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundary is visible', async () => {
      await test.step('Refresh page', async () => {
        await page.reload();
      });
      // ToDo: Make retries less when testing (#916)
      await test.step('Waiting for retries timeout', async () => {
        await page.waitForSelector('h1', { state: 'visible' });
      });
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/submissions/latest', false);
      await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');
    });

    // Navigate: Resolve errors (logic)
    await test.step('Click: Continue', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'Resolve errors (logic)',
      );
    });

    await test.step('Click Continue', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
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
      // ToDo: Make retries less when testing (#916)
      test.setTimeout(150_000);
      await test.step('Refresh page', async () => {
        await page.reload();
      });
      // ToDo: Make retries less when testing (#916)
      await test.step('Waiting for retries timeout', async () => {
        await page.waitForSelector('h1', { state: 'visible' });
      });
      await expect(page.locator('h1'), 'h1 is visible').toContainText(
        'Review warnings',
      );
      await expect(
        page.locator('#main .m-notification__error'),
        'Error Alert is visible',
      ).toBeVisible();
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
      await page.getByText('I verify the accuracy of').check({ timeout: 500 });
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Provide point of contact page
  await test.step('Provide point of contact page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Provide point of contact',
    );

    // Block API Call: /v1/admin/me
    await test.step('Block API: /v1/admin/me', async () => {
      await blockApi(page, '**/v1/admin/me/', true);
    });

    // Confirm Error Boundary
    await test.step('Error Boundary is visible', async () => {
      await test.step('Refresh page', async () => {
        await page.reload();
      });
      // ToDo: Make retries less when testing (#916)
      await test.step('Waiting for retries timeout', async () => {
        await page.waitForSelector('h1', { state: 'visible' });
      });
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'An unknown error occurred',
      );
    });

    // Unblock API Call
    await test.step('Unblock API', async () => {
      await blockApi(page, '**/v1/admin/me/', false);
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'Provide point of contact',
      );
    });
  });
});
