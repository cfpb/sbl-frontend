import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Point of Contact)';

const currentStepPath = '/details';

const userShouldNotAccess = ['/submit'];

const afterRedirectHeading = 'Provide filing details';
const afterRedirectURL = /.*\/details$/;

test(testLabel, async ({ page, navigateToProvideFilingDetails }) => {
  navigateToProvideFilingDetails;

  await verifyRedirects({
    testLabel,
    currentStepPath,
    userShouldNotAccess,
    afterRedirectHeading,
    afterRedirectURL,
    page,
    test,
  });
  await checkSnapshot(page);
});

test('Verify link targets (Provide filing details)', async ({
  page,
  navigateToProvideFilingDetails,
}) => {
  navigateToProvideFilingDetails;
  const navbar = page.locator('#nav-links');

  // Same tab
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

  // New tab
  const indexRegLinks = await page.locator('a:has-text("§")').all();

  for (const [index, indexRegPage] of indexRegLinks.entries()) {
    // eslint-disable-next-line no-await-in-loop
    const title = await indexRegPage.textContent();
    // eslint-disable-next-line no-await-in-loop
    await test.step(`iRegs link #${index + 1}: ${title}`, async () => {
      await expectLinkOpensNewTab(indexRegPage);
    });
  }

  const privacyNotice = page.getByRole('link', {
    name: 'View Privacy Notice',
  });
  await expectLinkOpensNewTab(privacyNotice);
});
