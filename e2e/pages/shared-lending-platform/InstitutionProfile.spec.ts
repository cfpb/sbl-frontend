import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';

test('Institution Profile Page', async ({ page, context }) => {
  test.slow();

  // Go to Profile page
  await test.step('User Profile Page', async () => {
    await page.goto('/profile/view');
    await expect(page.locator('h1')).toContainText('View your user profile');
  });

  // Go to Institution Profile
  await test.step('Institution Profile Page', async () => {
    await page
      .getByRole('link', { name: 'RegTech Regional Reserve - ' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'View your financial institution profile',
    );
  });

  // Check Detail Headings
  await test.step('Headings: Detail Section', async () => {
    await expect(page.locator('#main h2').nth(0)).toContainText(
      'Financial institution details',
    );
    await expect(page.locator('#main h3').nth(0)).toContainText(
      'Financial institution name',
    );
    await expect(page.locator('#main h3').nth(1)).toContainText(
      'Headquarters address',
    );
    await expect(page.locator('#main h3').nth(2)).toContainText(
      'Legal Entity Identifier (LEI)',
    );
    await expect(page.locator('#main h3').nth(3)).toContainText('LEI status');
    await expect(page.locator('#main h3').nth(4)).toContainText(
      'Email domain(s)',
    );
  });

  // Check Institution Headings
  await test.step('Headings: Institution Section', async () => {
    await expect(page.locator('#main h2').nth(1)).toContainText(
      'Financial institution identifying information',
    );
    await expect(page.locator('#main h3').nth(5)).toContainText(
      'Federal Taxpayer Identification Number (TIN)',
    );
    await expect(page.locator('#main h3').nth(6)).toContainText(
      'Research, Statistics, Supervision, Discount Identification (RSSD ID) number',
    );
    await expect(page.locator('#main h3').nth(7)).toContainText(
      'Federal prudential regulator',
    );
    await expect(page.locator('#main h3').nth(8)).toContainText(
      'Type of financial institution',
    );
  });

  // Check Parent Headings
  await test.step('Headings: Parent Section', async () => {
    await expect(page.locator('#main h2').nth(2)).toContainText(
      'Parent entity information (if applicable)',
    );
    await expect(page.locator('#main h3').nth(9)).toContainText(
      'Immediate Parent entity',
    );
    await expect(page.locator('#main h3').nth(10)).toContainText('Name');
    await expect(page.locator('#main h3').nth(11)).toContainText(
      'Legal Entity Identifier (LEI)',
    );
    await expect(page.locator('#main h3').nth(12)).toContainText(
      'Research, Statistics, Supervision, Discount Identification (RSSD ID) number',
    );
    await expect(page.locator('#main h3').nth(13)).toContainText(
      'Top-Holding Parent Entity',
    );
    await expect(page.locator('#main h3').nth(14)).toContainText('Name');
    await expect(page.locator('#main h3').nth(15)).toContainText(
      'Legal Entity Identifier (LEI)',
    );
    await expect(page.locator('#main h3').nth(16)).toContainText(
      'Research, Statistics, Supervision, Discount Identification (RSSD ID) number',
    );
  });

  // Check Inline Links
  await test.step('Inline Links', async () => {
    // Email link
    await expect(
      page
        .getByRole('link', { name: 'email our support staff' })
        .getAttribute('href'),
    ).resolves.toEqual(
      'mailto:SBLHelp@cfpb.gov?subject=[BETA] Update financial institution profile: Update email domain',
    );

    // GLEIF link
    const [externalLink] = await Promise.all([
      context.waitForEvent('page'),
      page
        .getByRole('link', {
          name: 'GLEIF',
          exact: true,
        })
        .click(),
    ]);
    await expect(externalLink).toHaveURL(
      'https://www.gleif.org/en/about-lei/get-an-lei-find-lei-issuing-organizations',
    );
    await expect(externalLink).toHaveTitle(
      'Get an LEI: Find LEI Issuing Organizations - LEI – GLEIF',
    );
    await externalLink.close();

    // Update Financial Institution links
    const fipLinks = await page
      .getByRole('link', {
        name: 'Update your financial institution profile',
      })
      .all();

    for (const fipLink of fipLinks) {
      await test.step(`fipLink: ${await fipLink.innerHTML()}`, async () => {
        fipLink.click();
        await expect(page.locator('h1')).toContainText(
          'Update your financial institution profile',
        );
        await page.goBack();
      });
    }

    // Federal Reserve Board links
    const frbLinks = await page
      .getByRole('link', {
        name: 'Federal Reserve Board',
      })
      .all();

    for (const frbLink of frbLinks) {
      await test.step(`frbLink`, async () => {
        const [frbExternalLink] = await Promise.all([
          context.waitForEvent('page'),
          frbLink.click(),
        ]);

        await expect(frbExternalLink).toHaveURL(
          'https://www.federalreserve.gov/apps/reportingforms/Report/Index/FR_Y-10',
        );
        await frbExternalLink.close();
      });
    }
  });

  // Test Breadcrumb
  await test.step('Breadcrumb', async () => {
    await page.locator('#main').getByRole('link', { name: 'Home' }).click();
    await expect(page.locator('h1')).toContainText('File your lending data');
  });
});
