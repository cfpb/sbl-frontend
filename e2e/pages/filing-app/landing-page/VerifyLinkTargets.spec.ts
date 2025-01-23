import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import {
  SelectorLinkText,
  expectAll,
  expectLogoutButtonVisible,
  selectAllNavLinks,
  selectLink,
} from '../../../utils/verifyLinkTargets';

test('Authenticated homepage: Verify link targets', async ({
  page,
  navigateToAuthenticatedHomePage,
}) => {
  navigateToAuthenticatedHomePage;

  await test.step('Open in same tab', async () => {
    const navlinks = await selectAllNavLinks(page);
    expect(navlinks.length).toEqual(3);
    await expectAll(navlinks, expectLinkOpensSameTab);

    await expectLogoutButtonVisible(page);

    const institutionProfile = await page
      .locator('h3', { hasText: 'Review your financial institution profile' })
      .locator('..')
      .getByRole('link');
    await expectLinkOpensSameTab(institutionProfile);
  });

  await test.step('Open in new tab', async () => {
    const finalRule = selectLink(page, SelectorLinkText.sidebar.finalRule);
    const filingInstructionGuide = selectLink(
      page,
      SelectorLinkText.sidebar.collection,
    );
    const collectionReportingReqs = selectLink(
      page,
      SelectorLinkText.sidebar.collection,
    );

    await expectAll(
      [finalRule, filingInstructionGuide, collectionReportingReqs],
      expectLinkOpensNewTab,
    );
  });
});
