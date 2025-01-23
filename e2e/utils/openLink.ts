import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

const URL_LOAD_FAILED = 'chrome-error://chromewebdata/';

interface ClickLinkParameters {
  page: Page;
  target: Locator;
  maxRetries?: number;
}

// Confirms link opens in a new tab
export const expectLinkOpensNewTab = async (link: Locator) => {
  await expect(link).toBeVisible();
  const target = await link.getAttribute('target');
  expect(target).toBe('_blank');
};

// Confirms link opens in the same tab
export const expectLinkOpensSameTab = async (link: Locator) => {
  await expect(link).toBeVisible();
  const target = await link.getAttribute('target');
  expect(target).toBe(null);
};

/**
 * Helps address intermittent failures when loading external links
 * by attempting to click the link multiple times, hoping one of
 * the retries succeeds.
 * @param page Page object to allow navigation operations
 * @param target Target that should be clicked
 */
export const openLinkSameTab = async ({
  page,
  target,
  maxRetries = 2,
}: ClickLinkParameters) => {
  let counter = 0;

  await expectLinkOpensSameTab(target);

  await target.click();

  while (page.url() === URL_LOAD_FAILED && counter < maxRetries) {
    counter += 1;
    // eslint-disable-next-line no-await-in-loop
    await page.goBack();
    // eslint-disable-next-line no-await-in-loop
    await target.click();
  }
};

/**
 * Opens a link in a new tab, allowing multiple retries if the link fails to load
 * @param page Page object to allow navigation operations
 * @param target Target that should be clicked
 */
export const openLinkNewTab = async ({
  page,
  target,
  maxRetries = 2,
}: ClickLinkParameters) => {
  let counter = 0;

  await expectLinkOpensNewTab(target);

  while (counter < maxRetries) {
    const newTabPromise = page.waitForEvent('popup');
    // eslint-disable-next-line no-await-in-loop
    await target.click();
    // eslint-disable-next-line no-await-in-loop
    const newTab = await newTabPromise;

    // Error, close tab and try again
    if (newTab.url() === URL_LOAD_FAILED) {
      // eslint-disable-next-line no-await-in-loop
      await newTab.close();
      counter += 1;
    }
    // Link successfully opened in new tab
    else return newTab;
  }

  return page;
};
