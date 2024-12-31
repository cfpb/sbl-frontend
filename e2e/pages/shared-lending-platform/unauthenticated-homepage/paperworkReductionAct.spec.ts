import { expect, test } from '@playwright/test';
import { expectLinkOpensSameTab } from '../../../utils/openLink';
import { expectedPaperworkReductionActUrl } from '../../../utils/testFixture.utils';

test('Unauthenticated homepage: Paperwork Reduction Act', async ({ page }) => {
  await test.step('Verify on the Paperwork Reduction Act and link exists', async () => {
    await page.goto('/');
    await expect(page.locator('#sidebar')).toContainText(
      'Paperwork Reduction Act',
    );
    const link = await page.getByRole('link', {
      name: 'View Paperwork Reduction Act',
    });

    await expectLinkOpensSameTab(link);
  });

  await test.step('Navigates to the Paperwork Reduction Act summary', async () => {
    await page
      .getByRole('link', { name: 'View Paperwork Reduction Act' })
      .click();
    await expect(page).toHaveURL(expectedPaperworkReductionActUrl);
    await expect(page.getByText('/Home')).toBeVisible();
    await expect(page.getByRole('heading')).toContainText(
      'Paperwork Reduction Act statement',
    );
  });
});
