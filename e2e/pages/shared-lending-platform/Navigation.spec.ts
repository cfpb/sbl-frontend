import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { openLinkSameTab } from '../../utils/openLink';
import { checkSnapshot } from '../../utils/snapshotTesting';

// Note: Skipped snapshot tests for pages outside of the SBL site

test('Navigation', async ({ page, navigateToFilingHome }) => {
  navigateToFilingHome;

  await test.step('Main Navigation', async () => {
    // Test Filing Link
    await page
      .locator('.navbar .links')
      .getByRole('link', { name: 'Filing', exact: false })
      .click();
    await expect(page.locator('h1')).toContainText(
      'File your small business lending data',
    );
    await checkSnapshot(page);

    // Test Home Link
    await page
      .locator('.navbar .links')
      .getByRole('link', { name: 'Home', exact: false })
      .click();
    await expect(page.locator('h1')).toContainText('File your lending data');
    await checkSnapshot(page);

    // Test Profile Link
    await page
      .locator('.navbar .links')
      .getByRole('link', { name: 'Playwright Test User' })
      .click();
    await expect(page.locator('h1')).toContainText('View your user profile');
    await checkSnapshot(page);
  });

  await test.step('Breadcrumb Navigation', async () => {
    // Test Breadcrumbs
    await page
      .getByRole('link', { name: 'RegTech Regional Reserve - ' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'View your financial institution profile',
    );
    await checkSnapshot(page);
    await page
      .getByRole('link', {
        name: 'Update your financial institution profile',
        exact: true,
      })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Update your financial institution profile',
    );
    await checkSnapshot(page);
    await page
      .getByRole('link', { name: 'View your financial institution profile' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'View your financial institution profile',
    );
    await page.locator('#main').getByRole('link', { name: 'Home' }).click();
    await expect(page.locator('h1')).toContainText('File your lending data');
  });

  await test.step('Footer Navigation', async () => {
    await openLinkSameTab({
      page,
      target: page
        .locator('.o-footer')
        .getByRole('link', { name: 'About Us', exact: true }),
    });
    await expect(page.locator('h1')).toContainText('About us');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Contact Us', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Have questions? Start here.',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Careers', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText('Careers at the CFPB');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Events', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText('Events');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Industry Whistleblowers', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Report potential industry misconduct',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'CFPB Ombudsman', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText('CFPB Ombudsman');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'FOIA', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText('FOIA requests');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Privacy', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText('Privacy');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', {
        name: 'Website Privacy Policy & Legal Notices',
        exact: true,
      })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Website privacy policy and legal notices',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Data', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Serving the public through data transparency and access',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Open Government', exact: true })
      .click();
    await expect(page.locator('h1')).toContainText('Open government');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Information Quality Guidelines' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Information quality guidelines',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Diversity & Inclusion' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Office of Minority and Women Inclusion at the Bureau',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Administrative Adjudication' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Administrative adjudication proceedings',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Plain Writing' })
      .click();
    await expect(page.locator('h1')).toContainText('Plain writing');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Accessibility' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Accessibility and reasonable accommodation',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Office of Civil Rights' })
      .click();
    await expect(page.locator('h1')).toContainText('Office of Civil Rights');
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'No FEAR Act & Cummings Act' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'No FEAR Act & Cummings Act',
    );
    await page.goBack();

    await page
      .locator('.o-footer')
      .getByRole('link', { name: 'Tribal' })
      .click();
    await expect(page.locator('h1')).toContainText(
      'Working with tribal governments',
    );
    await page.goBack();

    await openLinkSameTab({
      page,
      target: page.locator('.o-footer').getByRole('link', { name: 'USA.gov' }),
    });
    await expect(page).toHaveURL(/.*usa.gov/);
    await page.goBack();

    await openLinkSameTab({
      page,
      target: page
        .locator('.o-footer')
        .getByRole('link', { name: 'Office of Inspector General' }),
    });
    await expect(page).toHaveURL(/.*oig/);
    await page.goBack();
  });

  await test.step('Logout Navigation', async () => {
    // Test Logout Link
    await page
      .locator('.navbar .links')
      .getByRole('button', { name: 'LOG OUT' })
      .click();

    await expect(page.locator('h1')).toContainText(
      'Get started filing your lending data',
    );
    await expect(page.locator('.navbar .nav-items')).toHaveCount(0);
    await checkSnapshot(page);

    // Test CFPB Logo Link
    await openLinkSameTab({ page, target: page.getByLabel('Home') });
    await expect(page).toHaveURL('https://www.consumerfinance.gov/');
  });
});
