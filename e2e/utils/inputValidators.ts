import type { ElementHandle, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const assertTextInput = async (
  page: Page,
  label: RegExp | string,
  values: {
    isLocator?: boolean;
    fill: string;
    expected: string;
    unexpected: string;
  },
) => {
  if (values?.isLocator) {
    await page.locator(label as string).click();
    // Clear Input
    await page.locator(label as string).fill('');
    await expect(page.locator(label as string)).toHaveValue('');
    // Fill Input
    await page.locator(label as string).fill(values.fill);
    await expect(page.locator(label as string)).not.toHaveValue(
      values.unexpected,
    );
    await expect(page.locator(label as string)).toHaveValue(values.expected);
  } else {
    await page.getByLabel(label).click();
    // Clear Input
    await page.getByLabel(label).fill('');
    await expect(page.getByLabel(label)).toHaveValue('');
    // Fill Input
    await page.getByLabel(label).fill(values.fill);
    await expect(page.getByLabel(label)).not.toHaveValue(values.unexpected);
    await expect(page.getByLabel(label)).toHaveValue(values.expected);
  }
};

export const assertSelectInput = async (
  page: Page,
  label: RegExp | string,
  values: {
    isLocator?: boolean;
    fill:
      | ElementHandle
      | string
      | readonly {
          value?: string;
          label?: string;
          index?: number;
        }[]
      | readonly ElementHandle[]
      | readonly string[]
      | {
          value?: string;
          label?: string;
          index?: number;
        }
      | null;
    expected: string;
    unexpected: string;
  },
) => {
  if (values?.isLocator) {
    await page.locator(label as string).selectOption(values.fill);
    await expect(page.locator(label as string)).not.toHaveValue(
      values.unexpected,
    );
    await expect(page.locator(label as string)).toHaveValue(values.expected);
  } else {
    await page.getByLabel(label).selectOption(values.fill);
    await expect(page.getByLabel(label)).not.toHaveValue(values.unexpected);
    await expect(page.getByLabel(label)).toHaveValue(values.expected);
  }
};
