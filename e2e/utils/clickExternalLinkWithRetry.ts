import type { Locator, Page } from '@playwright/test';

/**
 * Helps address intermittent failures when loading external links
 * by attempting to click the link multiple times, hoping one of
 * the retries succeeds.
 * @param page Page object to allow navigation operations
 * @param target Target that should be clicked
 */
export const clickLinkWithRetry = async ({
  page,
  target,
  maxRetries = 2,
}: {
  page: Page;
  target: Locator;
  maxRetries?: number;
}) => {
  const URL_LOAD_FAILED = 'chrome-error://chromewebdata/';
  let counter = 0;

  await target.click();

  while (page.url() === URL_LOAD_FAILED && counter < maxRetries) {
    counter += 1;
    // eslint-disable-next-line no-await-in-loop
    await page.goBack();
    // eslint-disable-next-line no-await-in-loop
    await target.click();
  }
};
