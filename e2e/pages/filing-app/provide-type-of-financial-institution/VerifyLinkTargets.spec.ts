import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';

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
    const navContainer = page.locator('nav#nav-links');

    const home = await navContainer.getByRole('link', { name: 'Home' });
    await expectLinkOpensSameTab(home);

    const filing = await navContainer.getByRole('link', { name: 'Filing' });
    await expectLinkOpensSameTab(filing);

    const userProfile = await page.locator('.nav-item.profile');
    await expectLinkOpensSameTab(userProfile);

    const logout = await navContainer.getByRole('button', {
      name: 'LOG OUT',
    });
    await expectLinkOpensSameTab(logout);
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
