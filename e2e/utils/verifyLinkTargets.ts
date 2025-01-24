import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

// Run a test function on each element of an array of locators
// i.e. expectAll([fig, gleif], expectLinkOpensNewTab)
export const expectAll = async (
  locators: Locator[],
  testFunction: (target: Locator) => Promise<void>,
) => {
  for (const locator of locators) {
    // eslint-disable-next-line no-await-in-loop
    await testFunction(locator);
  }
};

export const selectLink = (container: Locator | Page, name: string) =>
  container.getByRole('link', { name });

// Helper to create Locators for multiple links
// i.e. selectLinks(page, ['Home', {name: 'GLEIF', exact: true }])
export const selectLinks = (container: Locator | Page, options: string[]) =>
  options.map(value => {
    // Entry is a string to search by
    if (typeof value === 'string')
      return container.getByRole('link', { name: value });

    // Entry is an options object i.e. { name: 'Home', exact: true }
    return container.getByRole('link', value);
  });

export const selectCrumbtrailLink = (
  container: Locator | Page,
  name: string,
) => {
  const crumbtrail = container.locator('#crumbtrail');
  return crumbtrail.getByRole('link', { name });
};

export const selectAllNavLinks = async (page: Page) => {
  return page.locator('#nav-links a').all();
};

// Frequent text of page links
export const SelectorLinkText = {
  gleif: {
    long: 'Global LEI Foundation (GLEIF)',
    short: 'GLEIF',
  },
  fig: {
    long: 'filing instructions guide for small business lending data',
    readAboutFiling: 'Read about the filing process',
    readAboutValidations: 'Read about data validations',
    section4: 'section 4, "Data validation"',
  },
  crumbtrail: {
    home: 'Home',
  },
  upload: {
    aNewFile: 'Upload a new file',
  },
  navbar: {
    logout: 'LOG OUT',
  },
  sidebar: {
    fig: 'Filing instructions guide',
    collection: 'Collection and reporting requirements',
    finalRule: 'Final rule',
  },
  privacyNotice: 'View Privacy Notice',
  paperworkReductionAct: 'View Paperwork Reduction Act',
};

export const expectLogoutButtonVisible = async (page: Page) => {
  const navbar = page.locator('#nav-links');
  const logout = navbar.getByRole('button', {
    name: SelectorLinkText.navbar.logout,
  });
  await expect(logout).toBeVisible();
};
