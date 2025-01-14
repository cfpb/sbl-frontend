import { expect, test } from '@playwright/test';
import { expectLinkOpensSameTab } from '../../../utils/openLink';
import { expectedPaperworkReductionActUrl } from '../../../utils/testFixture.utils';
import { SelectorLinkText, selectLink } from '../../../utils/verifyLinkTargets';

test('Verify link - Unauthenticated homepage: Paperwork Reduction Act', async ({
  page,
}) => {
  await test.step('Verify on the Paperwork Reduction Act and link exists', async () => {
    await page.goto('/');
    await expect(page.locator('#sidebar')).toContainText(
      'Paperwork Reduction Act',
    );

    await expectLinkOpensSameTab(
      selectLink(page, SelectorLinkText.paperworkReductionAct),
    );
  });

  await test.step('Navigates to the Paperwork Reduction Act summary', async () => {
    await selectLink(page, SelectorLinkText.paperworkReductionAct).click();
    await expect(page).toHaveURL(expectedPaperworkReductionActUrl);
    await expect(page.getByText('/Home')).toBeVisible();
    await expect(page.getByRole('heading')).toContainText(
      'Paperwork Reduction Act statement',
    );
  });
});
