import type { Page } from '@playwright/test';
import { test as baseTest, expect } from '@playwright/test';
import pointOfContactJson from '../test-data/point-of-contact/point-of-contact-data-1.json';
import createDomainAssociation from '../utils/createDomainAssociation';
import createInstitution from '../utils/createInstitution';
import createKeycloakUser from '../utils/createKeycloakUser';
import getAdminKeycloakToken from '../utils/getKeycloakToken';
import type { Account } from '../utils/testFixture.utils';
import {
  expectedNoAssociationsUrl,
  expectedWithAssociationsUrl,
  getTestDataObject,
} from '../utils/testFixture.utils';
import { ResultUploadMessage, uploadFile } from '../utils/uploadFile';

export const test = baseTest.extend<{
  isNonAssociatedUser: boolean; // Skips creating a domain association and creating a financial institution
  account: Account;
  authHook: void;
  navigateToAuthenticatedHomePage: Page;
  navigateToFilingHome: Page;
  navigateToProvideTypeOfFinancialInstitution: Page;
  navigateToUploadFile: Page;
  navigateToReviewWarningsAfterOnlyWarningsUpload: Page;
  navigateToSyntaxErrorsAfterSyntaxErrorsUpload: Page;
  navigateToLogicErrorsAfterLogicErrorsUpload: Page;
  navigateToProvidePointOfContact: Page;
  navigateToSignAndSubmit: Page;
}>({
  isNonAssociatedUser: [false, { option: true }], // Default is 'false'
  // allowing fixture functions to be called without being used immediately
  // eslint-disable @typescript-eslint/no-unused-expressions
  // eslint-disable-next-line no-empty-pattern
  account: async ({}, use) => {
    const account = getTestDataObject();
    await use(account);
  },
  authHook: [
    async ({ page, isNonAssociatedUser, account }, use) => {
      // eslint-disable @typescript-eslint/no-magic-numbers
      const {
        testUsername,
        testFirstName,
        testLastName,
        testEmailDomain,
        testUserEmail,
        testUserPassword,
        testInstitutionName,
        testLei,
        testTaxId,
        testRssdId,
      } = account;
      // eslint-enable @typescript-eslint/no-magic-numbers

      await createKeycloakUser({
        testUserEmail,
        testUsername,
        testFirstName,
        testLastName,
        testUserPassword,
      });
      const adminToken = await getAdminKeycloakToken();
      if (!isNonAssociatedUser) {
        await createInstitution({
          adminToken,
          testInstitutionName,
          testTaxId,
          testLei,
          testRssdId,
        });
        await createDomainAssociation({ adminToken, testEmailDomain, testLei });
      }

      // console.log the ephemeral user data for debugging
      // eslint-disable-next-line no-console
      console.log('testUsername :>>', testUsername);
      // eslint-disable-next-line no-console
      console.log('testUserPassword :>>', testUserPassword);

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
          { timeout: 30_000 },
        );

        // Two versions of Complete User Profile - with and without associations
        if (isNonAssociatedUser) {
          await expect(page).toHaveURL(expectedNoAssociationsUrl);
          await expect(page.locator('form')).toContainText(
            'Provide your financial institution details',
          );
          // Test forks path to tests in `NonAssociatedUserUserProfile.spec.ts`
        } else {
          await expect(page).toHaveURL(expectedWithAssociationsUrl);
        }
      });

      await use();
    },
    { auto: true },
  ],

  navigateToAuthenticatedHomePage: async ({ page, account }, use) => {
    await test.step('Complete your user profile: navigate to authenticated homepage', async () => {
      const { testFirstName, testLastName, testLei } = account;
      await page.getByLabel('First name').fill(testFirstName);
      await page.getByLabel('Last name').fill(testLastName);
      await page.getByText(testLei).click();
      await page.getByText('Submit').click();
      await expect(page.locator('h1')).toContainText('File your lending data');
    });

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

      await expect(page.locator('h1')).toContainText('Upload file', {
        timeout: 30_000,
      });
      await use(page);
    });
  },

  navigateToSyntaxErrorsAfterSyntaxErrorsUpload: async (
    { page, navigateToUploadFile },
    use,
  ) => {
    navigateToUploadFile;
    await test.step('Upload file: navigate to Syntax Errors page after only errors upload', async () => {
      await uploadFile({
        testUsed: test,
        pageUsed: page,
        newUpload: true,
        testTitle:
          'Upload file: upload small file with only syntax errors (errors-page-1-syntax-few.csv)',
        filePath:
          '../test-data/sample-sblar-files/errors-page-1-syntax-few.csv',
        resultMessage: ResultUploadMessage.syntax,
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

      await use(page);
    });
  },

  navigateToLogicErrorsAfterLogicErrorsUpload: async (
    { page, navigateToUploadFile },
    use,
  ) => {
    navigateToUploadFile;
    await test.step('Upload file: navigate to Logic Errors page after only errors upload', async () => {
      await uploadFile({
        testUsed: test,
        pageUsed: page,
        newUpload: true,
        testTitle:
          'Upload file: upload small file with only logic errors (errors-page-2-logic-few.csv)',
        filePath:
          '../test-data/sample-sblar-files/logic-errors_single&multi_and_warnings.csv',
        resultMessage: ResultUploadMessage.logic,
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

      await test.step('Resolve errors (logic): navigate to Resolve errors (logic) with errors after upload', async () => {
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('h1')).toContainText(
          'Resolve errors (logic)',
        );
      });

      await use(page);
    });
  },

  navigateToReviewWarningsAfterOnlyWarningsUpload: async (
    { page, navigateToUploadFile },
    use,
  ) => {
    navigateToUploadFile;
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
        { timeout: 30_000 },
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
          .getByLabel('Phone numberPhone number')
          .fill(pointOfContactJson.phone_number);
        await page
          .getByLabel('Phone Extension (optional)')
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
