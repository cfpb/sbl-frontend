import { test } from '../../../fixtures/testFixture';
import { expectLinkOpensSameTab } from '../../../utils/openLink';
import {
  SelectorLinkText,
  expectAll,
  selectCrumbtrailLink,
  selectLinks,
} from '../../../utils/verifyLinkTargets';

test('Complete user profile: Verify link targets', async ({ page }) => {
  const unauthenticatedHome = selectCrumbtrailLink(
    page,
    SelectorLinkText.crumbtrail.home,
  );

  const linksByText = selectLinks(page, [
    SelectorLinkText.gleif.long,
    SelectorLinkText.privacyNotice,
  ]);

  await expectAll(
    [unauthenticatedHome, ...linksByText],
    expectLinkOpensSameTab,
  );
});
