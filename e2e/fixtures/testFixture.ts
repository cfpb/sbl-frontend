import type { Page } from '@playwright/test';
import { test as baseTest, expect } from '@playwright/test';
import { webcrypto } from 'node:crypto';
import path from 'node:path';
import pointOfContactJson from '../test-data/point-of-contact/point-of-contact-data-1.json';
import createDomainAssociation from '../utils/createDomainAssociation';
import createInstitution from '../utils/createInstitution';
import createKeycloakUser from '../utils/createKeycloakUser';
import getAdminKeycloakToken from '../utils/getKeycloakToken';

// eslint-disable-next-line import/no-mutable-exports
let testLei: string;

export const test = baseTest.extend<{
  authHook: void;
  navigateToAuthenticatedHomePage: Page;
  navigateToFilingHome: Page;
  navigateToProvideTypeOfFinancialInstitution: Page;
  navigateToUploadFile: Page;
  navigateToReviewWarningsAfterOnlyWarningsUpload: Page;
  navigateToProvidePointOfContact: Page;
  navigateToSignAndSubmit: Page;
}>({
  // allowing fixture functions to be called without being used immediately
  // eslint-disable @typescript-eslint/no-unused-expressions
  authHook: [
    async ({ page }, use) => {
      // eslint-disable @typescript-eslint/no-magic-numbers
      // generate a 10 integer string as a seed for the test data
      const seed = webcrypto
        .getRandomValues(new Uint32Array(1))[0]
        .toString()
        .padStart(10, '0');
      const testUsername = `playwright-test-user-${seed}`;
      const testFirstName = 'Playwright';
      const testLastName = `Test User ${seed}`;
      const testEmailDomain = `${seed}.gov`;
      const testUserEmail = `playwright-test-user-${seed}@${testEmailDomain}`;
      const testUserPassword = `playwright-test-user-${seed}-password`;
      const testInstitutionName = `RegTech Regional Reserve - ${seed}`;
      testLei = `${seed.slice(-9)}TESTACCT053`;
      const testTaxId = `${seed.slice(4, 6)}-${seed.slice(-7)}`;
      const testRssdId = seed.slice(-7);
      // eslint-enable @typescript-eslint/no-magic-numbers

      await createKeycloakUser({
        testUserEmail,
        testUsername,
        testFirstName,
        testLastName,
        testUserPassword,
      });
      const adminToken = await getAdminKeycloakToken();
      await createInstitution({
        adminToken,
        testInstitutionName,
        testTaxId,
        testLei,
        testRssdId,
      });
      await createDomainAssociation({ adminToken, testEmailDomain, testLei });

      // console.log the ephemeral user data for debugging
      // eslint-disable-next-line no-console
      console.log('testUsername :>>', testUsername);
      // eslint-disable-next-line no-console
      console.log('testPassword :>>', testUserPassword);

      await test.step('Unauthenticated homepage: navigate to keycloak', async () => {
        await page.goto('/');
        await expect(page.locator('h1')).toContainText(
          'Get started filing your lending data',
        );
        await page
          .getByRole('button', { name: 'Sign in with Login.gov' })
          .click();
        await expect(page.locator('#kc-page-title')).toContainText(
          'Sign in to your account',
        );
      });

      await test.step('Keycloak: log into test account', async () => {
        await page.getByLabel('Username or email').click();
        await page.getByLabel('Username or email').fill(testUsername);
        await page.getByLabel('Username or email').press('Tab');
        await page
          .getByLabel('Password', { exact: true })
          .fill(testUserPassword);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page.locator('h1')).toContainText(
          'Complete your user profile',
        );
      });

      await test.step('Complete your user profile: navigate to authenticated homepage', async () => {
        await page.getByLabel('First name').fill(testFirstName);
        await page.getByLabel('Last name').fill(testLastName);
        await page.getByText(testLei).click();
        await page.getByText('Submit').click();
        await expect(page.locator('h1')).toContainText(
          'File your lending data',
        );
      });

      await use();
    },
    { auto: true },
  ],

  navigateToAuthenticatedHomePage: async ({ page }, use) => {
    await test.step('Unauthenticated homepage: navigate to Authenticated homepage', async () => {
      await page.goto('/');
      await expect(page.locator('h1')).toContainText(
        'Get started filing your lending data',
      );
      await page
        .getByRole('button', { name: 'Sign in with Login.gov' })
        .click();
      await expect(page.locator('h1')).toContainText('File your lending data');
      await use(page);
    });
  },

  navigateToFilingHome: async (
    { page, navigateToAuthenticatedHomePage },
    use,
  ) => {
    navigateToAuthenticatedHomePage;
    await test.step('Unauthenticated homepage: navigate to Authenticated homepage', async () => {
      await page.getByRole('link', { name: 'File your data' }).click();
      await expect(page.locator('h1')).toContainText(
        'File your small business lending data',
      );
      await use(page);
    });
  },

  navigateToProvideTypeOfFinancialInstitution: async (
    { page, navigateToFilingHome },
    use,
  ) => {
    navigateToFilingHome;
    await test.step('Filing home: navigate to Provide type of financial institution', async () => {
      await page.getByRole('button', { name: 'Start filing' }).click();
      await expect(page.locator('h1')).toContainText(
        'Provide type of financial institution',
      );
      await use(page);
    });
  },

  navigateToUploadFile: async (
    { page, navigateToProvideTypeOfFinancialInstitution },
    use,
  ) => {
    navigateToProvideTypeOfFinancialInstitution;
    await test.step('Provide type of financial institution: navigate to Upload file', async () => {
      await page.getByRole('heading', {
        name: 'Type of financial institution',
        exact: true,
      });
      await page.getByText('Bank or savings association').click();
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('h1')).toContainText('Upload file');
      await use(page);
    });
  },

  navigateToReviewWarningsAfterOnlyWarningsUpload: async (
    { page, navigateToUploadFile },
    use,
  ) => {
    navigateToUploadFile;
    await test.step('Upload file: navigate to Review warnings after only warnings upload', async () => {
      await test.step('Upload file: upload small file with only warnings (sbl-validations-all-pass-small.csv)', async () => {
        await expect(page.locator('h2')).toContainText(
          'Select a file to upload',
        );
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.getByLabel('Select a .csv file to upload').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(
          path.join(
            __dirname,
            '../test-data/sample-sblar-files/sbl-validations-all-pass-small.csv',
          ),
        );
        await expect(page.getByText('File upload in progress')).toBeVisible();
        await expect(page.getByText('File upload successful')).toBeVisible({
          timeout: 10_000,
        });
        await expect(
          page.getByText('Validation checks in progress'),
        ).toBeVisible({ timeout: 10_000 });
        await expect(
          page.getByText('Warnings were found in your file'),
        ).toBeVisible({ timeout: 60_000 });
      });

      await test.step('Upload file: navigate to Resolve errors (syntax) with no errors after upload', async () => {
        await page.waitForSelector('#nav-next');
        await page.waitForTimeout(500);
        await page
          .getByRole('button', { name: 'Continue to next step' })
          .click();
        await expect(page.locator('h1')).toContainText(
          'Resolve errors (syntax)',
        );
      });

      await test.step('Resolve errors (syntax): navigate to Resolve errors (logic) with no errors after upload', async () => {
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('h1')).toContainText(
          'Resolve errors (logic)',
        );
      });

      await test.step('Resolve errors (logic): navigate to Review warnings', async () => {
        await page
          .getByRole('button', { name: 'Continue to next step' })
          .click();
        await expect(page.locator('h1')).toContainText('Review warnings');
      });
      await use(page);
    });
  },

  navigateToProvidePointOfContact: async (
    { page, navigateToReviewWarningsAfterOnlyWarningsUpload },
    use,
  ) => {
    navigateToReviewWarningsAfterOnlyWarningsUpload;
    await test.step('Review warnings: navigate to Provide point of contact', async () => {
      await page.getByText('I verify the accuracy of').click();
      await page.getByRole('button', { name: 'Continue to next step' }).click();
      await expect(page.locator('h1')).toContainText(
        'Provide point of contact',
      );
    });
    await use(page);
  },

  navigateToSignAndSubmit: async (
    { page, navigateToProvidePointOfContact },
    use,
  ) => {
    navigateToProvidePointOfContact;
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
      await test.step('Provide point of contact: continue to next step', async () => {
        await page
          .getByRole('button', { name: 'Continue to next step' })
          .click();
        await expect(page.locator('h1')).toContainText('Sign and submit');
      });
    });
    await use(page);
  },
});

export { testLei };
