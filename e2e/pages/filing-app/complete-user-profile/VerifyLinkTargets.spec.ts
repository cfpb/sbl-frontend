import { test } from '../../../fixtures/testFixture';
import { expectLinkOpensSameTab } from '../../../utils/openLink';

test('Complete user profile: Verify link targets', async ({ page }) => {
  const gleif = await page.getByRole('link', {
    name: 'Global LEI Foundation (GLEIF)',
  });
  await expectLinkOpensSameTab(gleif);

  const privacyNotice = await page.getByRole('link', {
    name: 'View Privacy Notice',
  });
  await expectLinkOpensSameTab(privacyNotice);

  const mainSection = page.locator('#main');
  const unauthenticatedHome = await mainSection.getByRole('link', {
    name: 'Home',
    exact: true,
  });
  await expectLinkOpensSameTab(unauthenticatedHome);
});
