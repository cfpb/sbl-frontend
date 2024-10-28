// this test won't run, but may be helpful as an example when writing future tests

import { expect } from '@playwright/test';
import { test } from './fixtures/testFixture';
import pointOfContactJson from './test-data/point-of-contact/point-of-contact-data-1.json';
import { ResultUploadMessage, uploadFile } from './utils/uploadFile';
import { clickContinue } from './utils/navigation.utils';

test('proof of concept', async ({ page }) => {
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
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(page.locator('h1')).toContainText('Upload file');
  });

  await test.step('Upload file: navigate to Review warnings after only warnings upload', async () => {
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: true,
      testTitle:
        'Upload file: upload small file with only warnings (sbl-validations-all-pass-small.csv)',
      filePath:
        '../test-data/sample-sblar-files/sbl-validations-all-pass-small.csv',
      resultMessage: ResultUploadMessage.warning,
    });

    await test.step('Upload file: navigate to Resolve errors (syntax) with no errors after upload', async () => {
      await clickContinue(test, page);
      await expect(page.locator('h1')).toContainText('Resolve errors (syntax)');
    });

    await test.step('Resolve errors (syntax): navigate to Resolve errors (logic) with no errors after upload', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
      await expect(page.locator('h1')).toContainText('Resolve errors (logic)');
    });
  });

  await test.step('Resolve errors (logic): navigate to Review warnings', async () => {
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(page.locator('h1')).toContainText('Review warnings');
  });

  await test.step('Review warnings: navigate to Provide filing details', async () => {
    await page.getByText('I verify the accuracy of').click();
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(page.locator('h1')).toContainText('Provide filing details');
  });

  await test.step('Provide filing details: navigate to Sign and submit', async () => {
    await test.step('Provide filing details: fill out form', async () => {
      await page.getByLabel('First name').fill(pointOfContactJson.first_name);
      await page.getByLabel('Last name').fill(pointOfContactJson.last_name);
      await page
        .getByLabel('Phone numberPhone number')
        .fill(pointOfContactJson.phone_number);
      await page
        .getByLabel('Phone extension (optional)')
        .fill(pointOfContactJson.phone_ext);
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
    await test.step('Provide filing details: continue to next step', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
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
