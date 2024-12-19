import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixture';
import { checkSnapshot } from './snapshotTesting';

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

/**
 * Verify the process:
 *   Block API -> Confirm error boundary -> Unblock API -> Confirm Filing app
 */

interface VerifyApiBlockThenUnblockProperties {
  endpointPath: RegExp | string;
  expectedHeading: string;
  page: Page;
  endpointLabel: string;
}

export const verifyApiBlockThenUnblock = async ({
  endpointPath,
  expectedHeading,
  page,
  endpointLabel,
}: VerifyApiBlockThenUnblockProperties) => {
  await expect(page.locator('h1'), 'h1 is correct').toContainText(
    expectedHeading,
  );

  // Block API Call
  await test.step(`Block API: ${endpointLabel}`, async () => {
    await blockApi(page, endpointPath, true);
  });

  // Confirm Error Boundary
  await test.step('Error Boundary is visible', async () => {
    await test.step('Refresh page', async () => {
      await page.reload();
    });

    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'An unknown error occurred',
    );
    await checkSnapshot(page);
  });

  // Unblock API Call
  await test.step('Unblock API', async () => {
    await blockApi(page, endpointPath, false);

    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      expectedHeading,
    );
  });
};
