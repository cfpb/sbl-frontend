import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';

test('Verify link targets', async ({ page, navigateToUploadFile }) => {
  await navigateToUploadFile;

  // New tab
  const fig = await page.getByRole('link', {
    name: 'filing instructions guide for small business lending data',
  });
  await expectLinkOpensNewTab(fig);

  // Same tab
  const navbar = page.locator('#nav-links');

  const unauthenticatedHomepage = await navbar.getByRole('link', {
    name: 'Home ',
    exact: true,
  });
  await expectLinkOpensSameTab(unauthenticatedHomepage);

  const filing = await navbar.getByRole('link', {
    name: 'Filing',
  });
  await expectLinkOpensSameTab(filing);

  const userProfile = await page.locator('.nav-item.profile');
  await expectLinkOpensSameTab(userProfile);

  const logout = await navbar.getByRole('button', {
    name: 'LOG OUT',
  });
  await expectLinkOpensSameTab(logout);
});
