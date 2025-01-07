import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import {
  expectAll,
  expectLogoutButtonVisible,
  selectAllNavLinks,
} from '../../../utils/verifyLinkTargets';

test('Verify link targets: Provide Type of Financial Institution', async ({
  page,
  navigateToProvideTypeOfFinancialInstitution,
}) => {
  navigateToProvideTypeOfFinancialInstitution;
  // New tab
  await test.step(`New tab: iRegs links`, async () => {
    const indexRegLinks = await page.locator('a:has-text("§")').all();

    for (const [index, indexRegPage] of indexRegLinks.entries()) {
      // eslint-disable-next-line no-await-in-loop
      const title = await indexRegPage.textContent();
      // eslint-disable-next-line no-await-in-loop
      await test.step(`iRegs link #${index + 1}: ${title}`, async () => {
        await expectLinkOpensNewTab(indexRegPage);
      });
    }
  });

  // Same tab
  await test.step(`Same tab: Nav bar links`, async () => {
    const navlinks = await selectAllNavLinks(page);
    expect(navlinks.length).toEqual(3);
    await expectAll(navlinks, expectLinkOpensSameTab);

    await expectLogoutButtonVisible(page);
  });

  await test.step(`Same tab: Update financial profile links`, async () => {
    const updateFinancialProfileLinks = await page
      .getByRole('link', {
        name: 'update your financial institution profile',
      })
      .all();

    for (const [
      index,
      updateProfile,
    ] of updateFinancialProfileLinks.entries()) {
      // eslint-disable-next-line no-await-in-loop
      await test.step(`Update financial profile #${index + 1}`, async () => {
        await expectLinkOpensSameTab(updateProfile);
      });
    }
  });
});
