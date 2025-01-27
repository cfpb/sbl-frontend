import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import {
  SelectorLinkText,
  expectAll,
  expectLogoutButtonVisible,
  selectAllNavLinks,
  selectLink,
} from '../../../utils/verifyLinkTargets';
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

  // Same tab
  const navlinks = await selectAllNavLinks(page);
  expect(navlinks.length).toEqual(3);
  await expectAll(navlinks, expectLinkOpensSameTab);

  await expectLogoutButtonVisible(page);

  const uploadNewFile = selectLink(page, SelectorLinkText.upload.aNewFile);
  await expectLinkOpensSameTab(uploadNewFile);

  // New tab
  const figErrorDefinitions = await page
    .locator('.validation-info-section a')
    .all();
  for (const figPage of figErrorDefinitions) {
    // eslint-disable-next-line no-await-in-loop
    const errorLabel = await figPage.textContent();
    // eslint-disable-next-line no-await-in-loop
    await test.step(`FIG error description link opens new tab: ${errorLabel}`, async () => {
      await expectLinkOpensNewTab(figPage);
    });
  }

  const figDataValidation = selectLink(page, SelectorLinkText.fig.section4);
  await expectLinkOpensNewTab(figDataValidation);
});
