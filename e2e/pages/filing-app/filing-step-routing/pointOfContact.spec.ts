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

  // Same tab
  const navlinks = await selectAllNavLinks(page);
  expect(navlinks.length).toEqual(3);
  await expectAll(navlinks, expectLinkOpensSameTab);

  await expectLogoutButtonVisible(page);

  // New tab
  const indexRegLinks = await page.locator('a:has-text("§")').all();

  for (const indexRegPage of indexRegLinks) {
    // eslint-disable-next-line no-await-in-loop
    const title = await indexRegPage.textContent();
    // eslint-disable-next-line no-await-in-loop
    await test.step(`iRegs link opens new tab: ${title}`, async () => {
      await expectLinkOpensNewTab(indexRegPage);
    });
  }

  const privacyNotice = selectLink(page, SelectorLinkText.privacyNotice);
  await expectLinkOpensNewTab(privacyNotice);
});
