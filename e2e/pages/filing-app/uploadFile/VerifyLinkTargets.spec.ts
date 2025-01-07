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
  selectLinks,
} from '../../../utils/verifyLinkTargets';

test('Verify link targets', async ({ page, navigateToUploadFile }) => {
  await navigateToUploadFile;

  // New tab
  const figLinks = selectLinks(page, [SelectorLinkText.fig.long]);

  await expectAll(figLinks, expectLinkOpensNewTab);

  // Same tab
  const navlinks = await selectAllNavLinks(page);
  expect(navlinks.length).toEqual(3);
  await expectAll(navlinks, expectLinkOpensSameTab);

  await expectLogoutButtonVisible(page);
});
