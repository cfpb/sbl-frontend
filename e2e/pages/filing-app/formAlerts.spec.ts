import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';

test('Form Alerts', async ({ page }) => {
  test.slow();

  // Filing page
  await test.step('Filing page', async () => {
    await page.goto('/filing');
    await expect(page.locator('h1')).toContainText(
      'File your small business lending data',
    );
    await expect(
      page.getByRole('button', { name: 'Start filing' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Start filing' }).click();
  });

  // Type of financial institution page
  await test.step('Type of financial institution page', async () => {
    await expect(page.locator('h1')).toContainText(
      'Provide type of financial institution',
    );

    // Incomplete form
    await test.step('Incomplete form', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForSelector('#TypesFinancialInstitutionsErrors', {
        timeout: 10_000,
      });
      await expect(
        page.locator(
          '#TypesFinancialInstitutionsErrors div.m-notification_content',
        ),
      ).toContainText(
        'There was a problem updating your type of financial institution',
      );
    });

    // Complete Form
    await test.step('Complete form', async () => {
      await page.getByText('Bank or savings association').check();
      await page.getByRole('button', { name: 'Continue' }).click();
    });

    // Upload file page
    await test.step('Upload file page', async () => {
      await expect(page.locator('h1')).toContainText('Upload file');
    });
  });
});
