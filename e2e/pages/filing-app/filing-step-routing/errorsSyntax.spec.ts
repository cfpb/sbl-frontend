import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Errors: Syntax)';

const currentStepPath = '/error';

const userShouldNotAccess = [
  '/errors/errors-logic',
  '/warnings',
  '/details',
  '/submit',
];

const afterRedirectHeading = 'Resolve errors (syntax)';
const afterRedirectURL = /.*errors\/errors-syntax$/;

test(
  testLabel,
  async ({ page, navigateToSyntaxErrorsAfterSyntaxErrorsUpload }) => {
    navigateToSyntaxErrorsAfterSyntaxErrorsUpload;

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

test('Verify link targets (Errors: Syntax)', async ({
  page,
  navigateToSyntaxErrorsAfterSyntaxErrorsUpload,
}) => {
  navigateToSyntaxErrorsAfterSyntaxErrorsUpload;
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
  const figErrorDefinitions = await page
    .locator('.validation-info-section a')
    .all();
  for (const [index, figPage] of figErrorDefinitions.entries()) {
    // eslint-disable-next-line no-await-in-loop
    await test.step(`FIG error link #${index + 1}`, async () => {
      await expectLinkOpensNewTab(figPage);
    });
  }

  const figDataValidation = page.getByRole('link', {
    name: 'section 4, "Data validation"',
  });
  await expectLinkOpensNewTab(figDataValidation);
});
