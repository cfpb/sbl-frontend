import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Warnings)';

const currentStepPath = '/warnings';

const userShouldNotAccess = ['/details', '/submit'];

const afterRedirectHeading = 'Review warnings';
const afterRedirectURL = /.*\/warnings$/;

test(
  testLabel,
  async ({ page, navigateToReviewWarningsAfterOnlyWarningsUpload }) => {
    navigateToReviewWarningsAfterOnlyWarningsUpload;

    await verifyRedirects({
      afterRedirectHeading,
      afterRedirectURL,
      currentStepPath,
      page,
      test,
      testLabel,
      userShouldNotAccess,
    });
    await checkSnapshot(page);
  },
);

test('Verify link targets (Warnings)', async ({
  page,
  navigateToReviewWarningsAfterOnlyWarningsUpload,
}) => {
  navigateToReviewWarningsAfterOnlyWarningsUpload;
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

  const uploadNewFile = await page.getByRole('link', {
    name: 'Upload a new file',
  });
  await expectLinkOpensSameTab(uploadNewFile);

  // New tab
  const figWarningsSingle = await page
    .locator('#single-field-warnings a')
    .all();

  const figWarningMulti = await page.locator('#multi-field-warnings a').all();

  for (const [index, figPage] of [
    ...figWarningsSingle.entries(),
    ...figWarningMulti.entries(),
  ]) {
    // eslint-disable-next-line no-await-in-loop
    await test.step(`FIG warning link #${index + 1}`, async () => {
      await expectLinkOpensNewTab(figPage);
    });
  }

  const figDataValidation = page.getByRole('link', {
    name: 'section 4, "Data validation"',
  });
  await expectLinkOpensNewTab(figDataValidation);
});
