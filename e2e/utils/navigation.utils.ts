import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { SBLPlaywrightTest } from '../fixtures/testFixture';

const clickContinueHelper = async ({
  name,
  test,
  page,
  delay,
}: {
  name: string;
  test: SBLPlaywrightTest;
  page: Page;
  delay?: boolean;
}) => {
  await test.step(`Click: ${name}`, async () => {
    await expect(page.getByRole('button', { name })).toBeVisible();
    if (delay) {
      await page.waitForTimeout(2 * 1000);
    }
    await page.getByRole('button', { name }).click();
  });
};

export const clickContinueNext = async (
  test: SBLPlaywrightTest,
  page: Page,
) => {
  await clickContinueHelper({
    name: 'Continue to next step',
    test,
    page,
    delay: true,
  });
};

export const clickContinue = async (test: SBLPlaywrightTest, page: Page) => {
  await clickContinueHelper({
    name: 'Continue',
    test,
    page,
    delay: false,
  });
};
