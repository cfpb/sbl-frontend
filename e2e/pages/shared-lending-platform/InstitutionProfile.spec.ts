import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { openLinkNewTab, openLinkSameTab } from '../../utils/openLink';
import { checkSnapshot } from '../../utils/snapshotTesting';

test('Institution Profile Page', async ({ page, navigateToFilingHome }) => {
  // Go to Profile page
  await test.step('User Profile Page', async () => {
    navigateToFilingHome;
    await page.goto('/profile/view');
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'View your user profile',
    );
  });

  // Go to Institution Profile Page
  await test.step('Institution Profile Page', async () => {
    await page
      .getByRole('link', { name: 'RegTech Regional Reserve - ' })
      .click();
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'View your financial institution profile',
    );
    await checkSnapshot(page);
  });

  // Check Detail Headings
  await test.step('Financial institution details section', async () => {
    await expect(
      page.locator('#main h2').nth(0),
      'h2 is correct',
    ).toContainText('Financial institution details');

    // Financial institution name
    await test.step('Financial institution name', async () => {
      await expect(
        page.locator('#main h3').nth(0),
        'Label is correct',
      ).toContainText('Financial institution name');
      await expect(
        page.locator('#main h3').nth(0).locator('xpath=../p[1]'),
        'Name is correct',
      ).toContainText('RegTech Regional Reserve - ');
    });

    // Headquarters address
    await test.step('Headquarters address', async () => {
      await expect(
        page.locator('#main h3').nth(1),
        'Label is correct',
      ).toContainText('Headquarters address');
      await expect(
        page.locator('#main h3').nth(1).locator('xpath=../p[1]'),
        'Name is correct',
      ).toContainText('Test Address Street 1Test');
    });

    // LEI
    await test.step('LEI', async () => {
      await expect(
        page.locator('#main h3').nth(2),
        'Label is correct',
      ).toContainText('Legal Entity Identifier (LEI)');
      await expect(
        page.locator('#main h3').nth(2).locator('xpath=../p[1]'),
        'LEI is correct',
      ).toContainText(/.*TESTACCT053/);
    });

    // LEI status
    await test.step('LEI status', async () => {
      await expect(
        page.locator('#main h3').nth(3),
        'Label is correct',
      ).toContainText('LEI registration status');
      await expect(
        page.locator('#main h3').nth(3).locator('xpath=../p[1]'),
        'LEI status is correct',
      ).toContainText('Issued');
    });

    // Email domains
    await test.step('Email domains', async () => {
      await expect(
        page.locator('#main h3').nth(4),
        'Label is correct',
      ).toContainText('Email domain(s)');
      await expect(
        page.locator('#main h3').nth(4).locator('xpath=../p[1]'),
        'Email domain is correct',
      ).toContainText(/.*gov/);
    });
  });

  // Institution section
  await test.step('Institution section', async () => {
    await expect(
      page.locator('#main h2').nth(1),
      'h2 is correct',
    ).toContainText('Financial institution identifying information');

    // TIN
    await test.step('Federal TIN', async () => {
      await expect(
        page.locator('#main h3').nth(5),
        'Label is correct',
      ).toContainText('Federal Taxpayer Identification Number (TIN)');
      await expect(
        page.locator('#main h3').nth(5).locator('xpath=../p[1]'),
        'TIN is correct',
      ).toHaveText(/\d{2}-\d{7}/);
    });

    // RSSD ID
    await test.step('RSSD ID', async () => {
      await expect(
        page.locator('#main h3').nth(6),
        'Label is correct',
      ).toContainText(
        'Research, Statistics, Supervision, Discount Identification (RSSD ID) number',
      );
      await expect(
        page.locator('#main h3').nth(6).locator('xpath=../p[1]'),
        'RSSD ID is correct',
      ).toHaveText(/\d{6}/);
    });

    // Federal prudential regulator
    await test.step('Federal prudential regulator', async () => {
      await expect(
        page.locator('#main h3').nth(7),
        'Label is correct',
      ).toContainText('Federal prudential regulator');
      await expect(
        page.locator('#main h3').nth(7).locator('xpath=../p[1]'),
        'RSSD ID is correct',
      ).toContainText('Office of the Comptroller of');
    });

    // Type of financial institution
    await test.step('Type of financial institution', async () => {
      await expect(
        page.locator('#main h3').nth(8),
        'Label is correct',
      ).toContainText('Type of financial institution');
      await expect(
        page.locator('#main h3').nth(8).locator('xpath=../p[1]'),
        'Type is correct',
      ).toContainText('Not provided');
      await expect(
        page.getByText(
          'You must provide your type of financial institution to file.',
        ),
        'Missing Type of FI: Alert is displayed',
      ).toBeVisible();
    });
  });

  // Parent section
  await test.step('Parent section', async () => {
    await expect(
      page.locator('#main h2').nth(2),
      'h2 is correct',
    ).toContainText('Parent entity information (if applicable)');

    // Immediate Parent entity section
    await test.step('Immediate Parent entity section', async () => {
      await expect(
        page.locator('#main h3').nth(9),
        'Heading is correct',
      ).toContainText('Immediate Parent entity');

      // Name
      await test.step('Name', async () => {
        await expect(
          page.locator('#main h3').nth(10),
          'Label is correct',
        ).toContainText('Name');
        await expect(
          page.locator('#main h3').nth(10).locator('xpath=../p[1]'),
          'Name is correct',
        ).toContainText('PARENT TEST BANK');
      });

      // LEI
      await test.step('LEI', async () => {
        await expect(
          page.locator('#main h3').nth(11),
          'Label is correct',
        ).toContainText('Legal Entity Identifier (LEI)');
        await expect(
          page.locator('#main h3').nth(11).locator('xpath=../p[1]'),
          'LEI is correct',
        ).toContainText(/.*PARENTTESTBANK*/);
      });

      // RSSD ID
      await test.step('RSSD ID', async () => {
        await expect(
          page.locator('#main h3').nth(12),
          'Label is correct',
        ).toContainText(
          'Research, Statistics, Supervision, Discount Identification (RSSD ID) number',
        );
        await expect(
          page.locator('#main h3').nth(12).locator('xpath=../p[1]'),
          'RSSD ID is correct',
        ).toHaveText(/\d{5}/);
      });
    });

    // Top-Holding Parent Entity
    await test.step('Top-Holding Parent entity section', async () => {
      await expect(
        page.locator('#main h3').nth(13),
        'Heading is correct',
      ).toContainText('Top-Holding Parent Entity');

      // Name
      await test.step('Name', async () => {
        await expect(
          page.locator('#main h3').nth(14),
          'Label is correct',
        ).toContainText('Name');
        await expect(
          page.locator('#main h3').nth(14).locator('xpath=../p[1]'),
          'Name is correct',
        ).toContainText('TOP HOLDER LEI');
      });

      // LEI
      await test.step('LEI', async () => {
        await expect(
          page.locator('#main h3').nth(15),
          'Label is correct',
        ).toContainText('Legal Entity Identifier (LEI)');
        await expect(
          page.locator('#main h3').nth(15).locator('xpath=../p[1]'),
          'LEI is correct',
        ).toContainText(/.*TOPHOLDERLEI*/);
      });

      // RSSD ID
      await test.step('RSSD ID', async () => {
        await expect(
          page.locator('#main h3').nth(16),
          'Label is correct',
        ).toContainText(
          'Research, Statistics, Supervision, Discount Identification (RSSD ID) number',
        );
        await expect(
          page.locator('#main h3').nth(16).locator('xpath=../p[1]'),
          'RSSD ID is correct',
        ).toHaveText(/\d{5}/);
      });
    });
  });

  // Check Inline Links
  await test.step('Inline Links', async () => {
    // Email link
    await test.step('Email link', async () => {
      await expect(
        page
          .getByRole('link', { name: 'email our support staff' })
          .getAttribute('href'),
        'Link is correct',
      ).resolves.toEqual(
        'mailto:SBLHelp@cfpb.gov?subject=[BETA] Update financial institution profile: Update email domain',
      );
    });

    // GLEIF link
    await test.step('GLEIF links', async () => {
      const link = await page.getByRole('link', {
        name: 'GLEIF',
        exact: true,
      });

      const newTab = await openLinkNewTab({
        page,
        target: link,
      });
      await expect(newTab).toHaveURL(
        'https://www.gleif.org/en/about-lei/get-an-lei-find-lei-issuing-organizations',
      );
      await expect(newTab).toHaveTitle(
        'Get an LEI: Find LEI Issuing Organizations - LEI – GLEIF',
      );
      await newTab.close();

      // Verify initial tab is correct
      await expect(page.locator('h1'), 'h1 is correct').toContainText(
        'View your financial institution profile',
      );
    });

    // Update Financial Institution links
    await test.step('FIP Links', async () => {
      const fipLinksLocator = await page.getByRole('link', {
        name: 'Update your financial institution profile',
      });
      const fipLinks = await fipLinksLocator.all();

      for (const [index, fipLink] of fipLinks.entries()) {
        // eslint-disable-next-line no-await-in-loop
        await test.step(`fipLink: ${index + 1}`, async () => {
          await test.step('Click: link', async () => {
            await openLinkSameTab({
              page,
              target: fipLink,
            });
          });
          await expect(page.locator('h1'), 'h1 is correct').toContainText(
            'Update your financial institution profile',
          );
          await page.goBack();
          await expect(page.locator('h1'), 'h1 is correct').toContainText(
            'View your financial institution profile',
          );
        });
      }
    });

    // Federal Reserve Board links
    await test.step('FRB Links', async () => {
      const frbLinksLocator = await page.getByRole('link', {
        name: 'Federal Reserve Board',
      });
      const frbLinks = await frbLinksLocator.all();

      for (const [index, frbLink] of frbLinks.entries()) {
        // eslint-disable-next-line no-await-in-loop
        await test.step(`frbLink: ${index + 1}`, async () => {
          const newTab = await openLinkNewTab({
            page,
            target: frbLink,
          });
          await expect(newTab, 'Resolves correctly').toHaveURL(
            'https://www.federalreserve.gov/apps/reportingforms/Report/Index/FR_Y-10',
          );
          await newTab.close();

          // Verify initial tab is correct
          await expect(page.locator('h1'), 'h1 is correct').toContainText(
            'View your financial institution profile',
          );
        });
      }
    });
  });

  // Test Breadcrumb
  await test.step('Breadcrumb', async () => {
    await test.step('Click: Home', async () => {
      await page.locator('#main').getByRole('link', { name: 'Home' }).click();
    });
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'File your lending data',
    );
  });
});
