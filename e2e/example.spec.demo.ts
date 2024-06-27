// this test won't run, but may be helpful as an example when writing future tests

import { expect } from '@playwright/test';
import path from 'node:path';
import { test } from './fixtures/testFixture';
import pointOfContactJson from './test-data/point-of-contact/point-of-contact-data-1.json';

test('proof of concept', async ({ page }) => {
  test.slow();
  const tenSecondTimeout = 10_000;
  const sixtySecondTimeout = 60_000;
  const minorDelay = 500;

  await test.step('Unauthenticated homepage: navigate to Authenticated homepage', async () => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(
      'Get started filing your lending data',
    );
    await page.getByRole('button', { name: 'Sign in with Login.gov' }).click();
    await expect(page.locator('h1')).toContainText('File your lending data');
  });

  await test.step('Authenticated homepage: navigate to Filing home', async () => {
    await page.getByRole('link', { name: 'File your data' }).click();
    await expect(page.locator('h1')).toContainText(
      'File your small business lending data',
    );
  });

  await test.step('Filing home: navigate to Provide type of financial institution', async () => {
    await page.getByRole('button', { name: 'Start filing' }).click();
    await expect(page.locator('h1')).toContainText(
      'Provide type of financial institution',
    );
  });

  await test.step('Provide type of financial institution: navigate to Upload file', async () => {
    await page.getByRole('heading', {
      name: 'Type of financial institution',
      exact: true,
    });
    await page.getByText('Bank or savings association').click();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    await expect(page.locator('h1')).toContainText('Upload file');
  });

  await test.step('Upload file: navigate to Review warnings after only warnings upload', async () => {
    await test.step('Upload file: upload small file with only warnings (sbl-validations-all-pass-small.csv)', async () => {
      await expect(page.locator('h2')).toContainText('Select a file to upload');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Select a .csv file to upload').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(
          // eslint-disable-next-line unicorn/prefer-module
          __dirname,
          './test-data/sample-sblar-files/sbl-validations-all-pass-small.csv',
        ),
      );
      await expect(page.getByText('File upload in progress')).toBeVisible();
      await expect(page.getByText('File upload successful')).toBeVisible({
        timeout: tenSecondTimeout,
      });
      await expect(page.getByText('Validation checks in progress')).toBeVisible(
        { timeout: tenSecondTimeout },
      );
      await expect(
        page.getByText('Warnings were found in your file'),
      ).toBeVisible({ timeout: sixtySecondTimeout });
    });

    await test.step('Upload file: navigate to Resolve errors (1 of 2) with no errors after upload', async () => {
      await page.waitForSelector('#nav-next');
      await page.waitForTimeout(minorDelay);
      await page.getByRole('button', { name: 'Save and continue' }).click();
      await expect(page.locator('h1')).toContainText('Resolve errors (1 of 2)');
    });

    await test.step('Resolve errors (1 of 2): navigate to Resolve errors (2 of 2) with no errors after upload', async () => {
      await page.getByRole('button', { name: 'Save and continue' }).click();
      await expect(page.locator('h1')).toContainText('Resolve errors (2 of 2)');
    });
  });

  await test.step('Resolve errors (2 of 2): navigate to Review warnings', async () => {
    await page.getByRole('button', { name: 'Save and continue' }).click();
    await expect(page.locator('h1')).toContainText('Review warnings');
  });

  await test.step('Review warnings: navigate to Provide point of contact', async () => {
    await page.getByText('I verify the accuracy of').click();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    await expect(page.locator('h1')).toContainText('Provide point of contact');
  });

  await test.step('Provide point of contact: navigate to Sign and submit', async () => {
    await test.step('Provide point of contact: fill out form', async () => {
      await page.getByLabel('First name').fill(pointOfContactJson.first_name);
      await page.getByLabel('Last name').fill(pointOfContactJson.last_name);
      await page
        .getByLabel('Work phone numberPhone number')
        .fill(pointOfContactJson.phone_number);
      await page
        .getByLabel('Email addressEmail address')
        .fill(pointOfContactJson.email);
      await page
        .getByLabel('Street address line 1')
        .fill(pointOfContactJson.hq_address_street_1);
      await page
        .getByLabel('Street address line 2 (')
        .fill(pointOfContactJson.hq_address_street_2);
      await page
        .getByLabel('Street address line 3 (')
        .fill(pointOfContactJson.hq_address_street_3);
      await page
        .getByLabel('Street address line 4 (')
        .fill(pointOfContactJson.hq_address_street_4);
      await page.getByLabel('City').fill(pointOfContactJson.hq_address_city);
      await page
        .getByLabel('State or territory')
        .selectOption(pointOfContactJson.hq_address_state);
      await page
        .getByLabel('ZIP codeZIP code must be in')
        .fill(pointOfContactJson.hq_address_zip);
    });
    await test.step('Provide point of contact: save and continue', async () => {
      await page.getByRole('button', { name: 'Save and continue' }).click();
      await expect(page.locator('h1')).toContainText('Sign and submit');
    });
  });

  await test.step('Sign and submit: verify completion', async () => {
    await expect(
      page.getByText(
        'Congratulations! You have reached the end of the beta filing process.',
      ),
    ).toBeVisible();
  });
});
