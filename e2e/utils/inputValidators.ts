import type { ElementHandle, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const assertTextInput = async (
  page: Page,
  label: RegExp | string,
  values: {
    fill: string;
    expected: string;
    unexpected: string;
  },
) => {
  await page.getByLabel(label).click();
  await page.getByLabel(label).fill(values.fill);
  await expect(page.getByLabel(label)).not.toHaveValue(values.unexpected);
  await expect(page.getByLabel(label)).toHaveValue(values.expected);
};

export const assertSelectInput = async (
  page: Page,
  label: RegExp | string,
  values: {
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
  await page.getByLabel(label).selectOption(values.fill);
  await expect(page.getByLabel(label)).not.toHaveValue(values.unexpected);
  await expect(page.getByLabel(label)).toHaveValue(values.expected);
};
