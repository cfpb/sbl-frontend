import type { Page } from '@playwright/test';

export async function blockApi(
  page: Page,
  apiUrl: RegExp | string,
  blocked: boolean,
) {
  if (blocked) {
    await page.route(apiUrl, async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });
  } else {
    await page.unroute(apiUrl);
    await page.reload();
  }
}
