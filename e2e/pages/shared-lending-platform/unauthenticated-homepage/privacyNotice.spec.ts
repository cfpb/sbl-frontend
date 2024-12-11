import { expect, test } from '@playwright/test';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { expectedPrivacyNoticeUrl } from '../../../utils/testFixture.utils';

test('Unauthenticated homepage: Privacy Notice', async ({ page }) => {
  await test.step('Verify on the Privacy Notice overview and link exists', async () => {
    await page.goto('/');
    await expect(page.locator('#sidebar')).toContainText('Privacy Notice');
    await expect(
      page.getByRole('link', { name: 'View Privacy Notice' }),
    ).toBeVisible();
    await checkSnapshot(page);
  });

  await test.step('Navigates to the Privacy Notice summary', async () => {
    await page.getByRole('link', { name: 'View Privacy Notice' }).click();
    await expect(page).toHaveURL(expectedPrivacyNoticeUrl);
    await expect(page.getByText('/Home')).toBeVisible();
    await expect(page.getByRole('heading')).toContainText('Privacy Notice');
    await checkSnapshot(page);
  });
});
