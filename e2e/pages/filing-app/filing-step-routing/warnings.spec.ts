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

  await test.step('Open in same tab', async () => {
    const navlinks = await selectAllNavLinks(page);
    expect(navlinks.length).toEqual(3);
    await expectAll(navlinks, expectLinkOpensSameTab);

    await expectLogoutButtonVisible(page);

    const uploadNewFile = selectLink(page, SelectorLinkText.upload.aNewFile);
    await expectLinkOpensSameTab(uploadNewFile);
  });

  await test.step('Open in new tab', async () => {
    const figWarningsSingle = await page
      .locator('#single-field-warnings a')
      .all();

    const figWarningMulti = await page.locator('#multi-field-warnings a').all();

    for (const [index, figPage] of [
      ...figWarningsSingle.entries(),
      ...figWarningMulti.entries(),
    ]) {
      // eslint-disable-next-line no-await-in-loop
      const warningID = await figPage.textContent();
      // eslint-disable-next-line no-await-in-loop
      await test.step(`FIG warning description link #${
        index + 1
      }: ${warningID}`, async () => {
        await expectLinkOpensNewTab(figPage);
      });
    }

    const figDataValidation = selectLink(page, SelectorLinkText.fig.section4);

    await expectLinkOpensNewTab(figDataValidation);
  });
});
