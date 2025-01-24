import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import {
  expectLinkOpensNewTab,
  expectLinkOpensSameTab,
} from '../../../utils/openLink';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import {
  expectAll,
  expectLogoutButtonVisible,
  selectAllNavLinks,
} from '../../../utils/verifyLinkTargets';

test('Sign and submit: complete filing flow with only warnings', async ({
  page,
  navigateToSignAndSubmit,
}) => {
  navigateToSignAndSubmit;

  await test.step('Sign and submit: verify completion', async () => {
    await expect(
      page.getByText(
        'Congratulations! You have reached the end of the beta filing process.',
      ),
    ).toBeVisible();
    await checkSnapshot(page);
  });

  await test.step('Sign and submit: verify link targets', async () => {
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

    await test.step(`Same tab: Update filing details links`, async () => {
      const updateFilingDetailsLinks = await page
        .getByRole('button', {
          name: 'update your filing details',
        })
        .all();

      for (const [index, updateDetails] of updateFilingDetailsLinks.entries()) {
        // eslint-disable-next-line no-await-in-loop
        await test.step(`Update financial details #${index + 1}`, async () => {
          await expectLinkOpensSameTab(updateDetails);
        });
      }
    });

    await test.step(`Same tab: Upload a new file links`, async () => {
      const uploadANewFileLinks = await page
        .getByRole('link', {
          name: 'upload a new file',
        })
        .all();

      for (const [index, uploadFileLink] of uploadANewFileLinks.entries()) {
        // eslint-disable-next-line no-await-in-loop
        await test.step(`Upload a new file #${index + 1}`, async () => {
          await expectLinkOpensSameTab(uploadFileLink);
        });
      }
    });
  });
});
