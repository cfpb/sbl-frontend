import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';

test('Authenticated homepage: Verify link targets', async ({
  page,
  navigateToAuthenticatedHomePage,
}) => {
  await navigateToAuthenticatedHomePage;

  const navbar = page.locator('#nav-links');

  await test.step('Open in same tab', async () => {
    const userProfile = await page.locator('.nav-item.profile');
    await expectLinkOpensSameTab(userProfile);

    const unauthenticatedHomepage = await navbar.getByRole('link', {
      name: 'Home ',
      exact: true,
    });
    await expectLinkOpensSameTab(unauthenticatedHomepage);

    const logout = await navbar.getByRole('button', {
      name: 'LOG OUT',
    });
    await expectLinkOpensSameTab(logout);

    const institutionProfile = await page
      .locator('h3', { hasText: 'Review your financial institution profile' })
      .locator('..')
      .getByRole('link');
    await expectLinkOpensSameTab(institutionProfile);
  });

  await test.step('Open in new tab', async () => {
    const finalRule = await page.getByRole('link', { name: 'Final Rule' });
    const filingInstructionGuide = await page.getByRole('link', {
      name: 'Filing instructions guide',
    });
    const collectionReportingReqs = await page.getByRole('link', {
      name: 'Collection and reporting requirements',
    });

    await expectLinkOpensNewTab(finalRule);
    await expectLinkOpensNewTab(filingInstructionGuide);
    await expectLinkOpensNewTab(collectionReportingReqs);
  });
});
