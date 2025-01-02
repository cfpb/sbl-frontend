import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Errors: Logic)';

const currentStepPath = '/error';

const userShouldNotAccess = ['/warnings', '/details', '/submit'];

const afterRedirectHeading = 'Resolve errors (syntax)';
const afterRedirectURL = /.*errors\/errors-syntax$/;

test(
  testLabel,
  async ({ page, navigateToLogicErrorsAfterLogicErrorsUpload }) => {
    navigateToLogicErrorsAfterLogicErrorsUpload;

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

test('Verify link targets (Errors: Logic)', async ({
  page,
  navigateToLogicErrorsAfterLogicErrorsUpload,
}) => {
  navigateToLogicErrorsAfterLogicErrorsUpload;

  // Same tab
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
