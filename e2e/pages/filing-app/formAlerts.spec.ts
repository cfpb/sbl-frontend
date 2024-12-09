import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import pointOfContactJson from '../../test-data/point-of-contact/point-of-contact-data-1.json';
import { clickContinue, clickContinueNext } from '../../utils/navigation.utils';
import { checkSnapshot } from '../../utils/snapshotTesting';
import { ResultUploadMessage, uploadFile } from '../../utils/uploadFile';

test('Form Alerts', async ({
  page,
  navigateToProvideTypeOfFinancialInstitution,
}) => {
  // Type of financial institution page
  await test.step('Type of financial institution page', async () => {
    navigateToProvideTypeOfFinancialInstitution;
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Provide type of financial institution',
    );
    await checkSnapshot(page);

    // Submit Incomplete form
    await test.step('Submit Incomplete form', async () => {
      await clickContinue(test, page);
      await test.step('Error Alert is visible', async () => {
        await page.waitForSelector('#TypesFinancialInstitutionsErrors');
        await expect(
          page.locator(
            '#TypesFinancialInstitutionsErrors div.m-notification_content',
          ),
          'Alert is visible',
        ).toContainText(
          'There was a problem updating your type of financial institution',
        );
      });
      await checkSnapshot(page);
    });

    // Submit Completed Form
    await test.step('Submit Completed form', async () => {
      await test.step('Complete form', async () => {
        await page.getByText('Bank or savings association').check();
      });
      await clickContinue(test, page);
      await checkSnapshot(page);
    });
  });

  // Upload file with syntax errors
  await test.step('Upload syntax errors file', async () => {
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: true,
      testTitle:
        'Upload file: upload small file with syntax errors (all_syntax_errors.csv)',
      filePath: '../test-data/sample-sblar-files/all_syntax_errors.csv',
      resultMessage: ResultUploadMessage.syntax,
    });

    // Continue to next page
    await clickContinueNext(test, page);
    await checkSnapshot(page);
  });

  // Resolve errors (syntax) page
  await test.step('Resolve errors (syntax) page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Resolve errors (syntax)',
    );
    await expect(
      page.locator('#error-header-alert'),
      'Error alert is visible',
    ).toContainText(
      'Your register contains syntax errorsThere may be an issue with the data type or format of one or more values in your file. Make sure your register meets the requirements detailed in the filing instructions guide (section 4, "Data validation"), make the corrections, and upload a new file.',
    );
    await clickContinue(test, page);
    await expect(
      page.locator('#error-footer-alert'),
      'Footer alert is visible',
    ).toContainText('You must resolve syntax errors to continue.');

    await test.step('Click: Upload new file', async () => {
      await page.getByRole('link', { name: 'Upload a new file' }).click();
    });
    await checkSnapshot(page);
  });

  // Upload file with logic errors
  await test.step('Upload logic errors file', async () => {
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: false,
      testTitle:
        'Upload file: upload small file with logic errors (logic-errors_single&multi_and_warnings.csv)',
      filePath:
        '../test-data/sample-sblar-files/logic-errors_single&multi_and_warnings.csv',
      resultMessage: ResultUploadMessage.logic,
    });

    // Continue to next page
    await checkSnapshot(page);
    await clickContinueNext(test, page);
  });

  // Resolve errors (syntax) page
  await test.step('Resolve errors (syntax) page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Resolve errors (syntax)',
    );
    await expect(
      page.locator('.m-notification__success'),
      'Success message is visible',
    ).toContainText('Your register contains no syntax errors');
    await checkSnapshot(page);
    await clickContinue(test, page);
  });

  // Resolve errors (logic) page
  await test.step('Resolve errors (logic) page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Resolve errors (logic)',
    );
    await expect(
      page.locator('#error-header-alert'),
      'Error alert is visible',
    ).toContainText(
      'Your register contains logic errorsThere is missing data, incorrect data, or conflicting information in your file. Make sure your register meets the requirements detailed in the filing instructions guide (section 4, "Data validation"), make the corrections, and upload a new file.',
    );
    await clickContinueNext(test, page);
    await expect(
      page.locator('#error-footer-alert'),
      'Footer alert is visible',
    ).toContainText(
      'You must resolve all errors to continue to the next step.',
    );
    await checkSnapshot(page);
    await test.step('Click: Upload new file', async () => {
      await page.getByRole('link', { name: 'Upload a new file' }).click();
    });
  });

  // Upload file with warnings
  await test.step('Upload warnings file', async () => {
    // Upload file
    await uploadFile({
      testUsed: test,
      pageUsed: page,
      newUpload: false,
      testTitle: 'Upload Warnings file',
      filePath: '../test-data/sample-sblar-files/logic-warnings_small.csv',
      resultMessage: ResultUploadMessage.warning,
    });
    await checkSnapshot(page);
    await clickContinueNext(test, page);
  });

  // Resolve errors (syntax) page
  await test.step('Resolve errors (syntax) page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Resolve errors (syntax)',
    );
    await expect(
      page.locator('.m-notification__success'),
      'Success message is visible',
    ).toContainText('Your register contains no syntax errors');
    await checkSnapshot(page);
    await clickContinue(test, page);
  });

  // Resolve errors (logic) page
  await test.step('Resolve errors (logic) page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Resolve errors (logic)',
    );
    await expect(
      page.locator('.m-notification__success'),
      'Success message is visible',
    ).toContainText('Your register contains no logic errors');
    await checkSnapshot(page);
    await clickContinueNext(test, page);
  });

  // Review warnings page
  await test.step('Review warnings page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Review warnings',
    );
    await checkSnapshot(page);
    await clickContinueNext(test, page);
    await expect(
      page.locator('#error-header-alert'),
      'Error alert is visible',
    ).toContainText(
      'You must correct or verify the accuracy of register values to continue to the next step.',
    );
    await test.step('Click: Verify checkbox', async () => {
      await page.getByText('I verify the accuracy of').check();
    });
    await checkSnapshot(page);
    await clickContinueNext(test, page);
  });

  // Filing details page
  await test.step('Filing details page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Provide filing details',
    );
    await checkSnapshot(page);

    // Submit Incomplete form
    await test.step('Submit Incomplete form', async () => {
      await clickContinueNext(test, page);
      await expect(
        page.locator('.m-notification__error'),
        'Error alert is visible',
      ).toContainText(
        'There was a problem updating your filing detailsIndicate your voluntary reporter statusEnter the first name of the point of contactEnter the last name of the point of contactEnter the phone number of the point of contactEnter the email address of the point of contactEnter the street address of the point of contactEnter the city of the point of contactSelect the state or territory of the point of contactEnter the ZIP code of the point of contact',
      );
      await checkSnapshot(page);
    });

    // Submit Completed form
    await test.step('Submit Completed form', async () => {
      await test.step('Complete form', async () => {
        await page.getByText('Voluntary reporter', { exact: true }).click();
        await page.getByLabel('First name').fill('Playwright');
        await page.getByLabel('Last name').fill('Test');
        await page.getByLabel('Phone number').fill('555-555-5555');
        await page
          .getByLabel('Phone extension (optional)')
          .fill(pointOfContactJson.phone_ext);
        await page.getByLabel('Email address').fill('playwright@test.com');
        await page.getByLabel('Street address line 1').fill('555 Main St.');
        await page.getByLabel('City').fill('Utah (U');
        await page.selectOption('select#state', 'UT');
        await page.getByLabel('Zip code').fill('55555');
        await checkSnapshot(page);
      });
    });

    // Continue to Sign and Submit
    await clickContinueNext(test, page);
  });

  // Sign and submit page
  await test.step('Sign and submit page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Sign and submit',
    );
    await checkSnapshot(page);
  });
});
