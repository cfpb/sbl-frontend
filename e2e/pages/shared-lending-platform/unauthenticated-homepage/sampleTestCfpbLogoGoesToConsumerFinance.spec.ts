import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import { clickLinkWithRetry } from '../../../utils/clickExternalLinkWithRetry';

// this is just an example test (e2e tests should be way longer than this)
test('Unauthenticated homepage: CFPB logo link goes to consumerfinance.gov', async ({
  page,
}) => {
  await page.goto('/');
  await clickLinkWithRetry({ page, target: page.getByLabel('Home') });
  await expect(page).toHaveURL('https://www.consumerfinance.gov/complaint/');
});
