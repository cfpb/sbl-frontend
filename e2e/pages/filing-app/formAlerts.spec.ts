import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import uploadFile from '../../utils/uploadFile';

test('Form Alerts', async ({
  page,
  navigateToProvideTypeOfFinancialInstitution,
}) => {
  test.slow();

  // Type of financial institution page
  await test.step('Type of financial institution page', async () => {
    navigateToProvideTypeOfFinancialInstitution;
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Provide type of financial institution',
    );

    // Submit Incomplete form
    await test.step('Submit Incomplete form', async () => {
      await test.step('Click: Continue', async () => {
        await page.getByRole('button', { name: 'Continue' }).click();
      });
      await test.step('Error Alert is visible', async () => {
        await page.waitForSelector('#TypesFinancialInstitutionsErrors', {
          timeout: 10_000,
        });
        await expect(
          page.locator(
            '#TypesFinancialInstitutionsErrors div.m-notification_content',
          ),
          'Alert is visible',
        ).toContainText(
          'There was a problem updating your type of financial institution',
        );
      });
    });

    // Submit Completed Form
    await test.step('Submit Completed form', async () => {
      await test.step('Complete form', async () => {
        await page.getByText('Bank or savings association').check();
      });
      await test.step('Click: Continue', async () => {
        await page.getByRole('button', { name: 'Continue' }).click();
      });
    });
  });

  // Upload file with syntax errors
  await test.step('Upload syntax errors file', async () => {
    await uploadFile(page, true, 'syntax');

    // Continue to next page
    await test.step('Click: Continue', async () => {
      await page.waitForSelector('#nav-next');
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
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
    await test.step('Click: Continue', async () => {
      await page
        .getByRole('button', { name: 'Continue' })
        .click({ timeout: 500 });
    });

    await expect(
      page.locator('#error-footer-alert'),
      'Footer alert is visible',
    ).toContainText('You must resolve syntax errors to continue.');

    await test.step('Click: Upload new file', async () => {
      await page.getByRole('link', { name: 'Upload a new file' }).click();
    });
  });

  // Upload file with logic errors
  await test.step('Upload logic errors file', async () => {
    await uploadFile(page, false, 'logic');

    // Continue to next page
    await test.step('Click: Continue', async () => {
      await page.waitForSelector('#nav-next');
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
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
    await test.step('Click: Continue', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();
    });
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
    await test.step('Click: Continue', async () => {
      await page
        .getByRole('button', { name: 'Continue to next step' })
        .click({ timeout: 500 });
    });

    await expect(
      page.locator('#error-footer-alert'),
      'Footer alert is visible',
    ).toContainText(
      'You must resolve all errors to continue to the next step.',
    );
    await test.step('Click: Upload new file', async () => {
      await page.getByRole('link', { name: 'Upload a new file' }).click();
    });
  });

  // Upload file with warnings
  await test.step('Upload warnings file', async () => {
    await uploadFile(page, false, 'warning');

    await test.step('Click: Continue', async () => {
      await page
        .getByRole('button', { name: 'Continue to next step' })
        .click({ timeout: 5000 });
    });
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

    await test.step('Click: Continue', async () => {
      await page
        .getByRole('button', { name: 'Continue' })
        .click({ timeout: 5000 });
    });
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
    await test.step('Click: Continue', async () => {
      await page
        .getByRole('button', { name: 'Continue to next step' })
        .click({ timeout: 5000 });
    });
  });

  // Review warnings page
  await test.step('Review warnings page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Review warnings',
    );
    await test.step('Click: Continue', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
    await expect(
      page.locator('#error-header-alert'),
      'Error alert is visible',
    ).toContainText(
      'You must correct or verify the accuracy of register values to continue to the next step.',
    );
    await test.step('Click: Verify checkbox', async () => {
      await page.getByText('I verify the accuracy of').check({ timeout: 500 });
    });
    await test.step('Click: Continue', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Point of contact page
  await test.step('Point of contact page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Provide point of contact',
    );

    // Submit Incomplete form
    await test.step('Submit Incomplete form', async () => {
      await test.step('Click: Continue', async () => {
        await page
          .getByRole('button', { name: 'Continue to next step' })
          .click();
      });
      await expect(
        page.locator('.m-notification__error'),
        'Error alert is visible',
      ).toContainText(
        'There was a problem updating your point of contact informationEnter the first name of the point of contactEnter the last name of the point of contactEnter the phone number of the point of contactEnter the email address of the point of contactEnter the street address of the point of contactEnter the city of the point of contactSelect the state or territory of the point of contactEnter the ZIP code of the point of contact',
      );
    });

    // Submit Completed form
    await test.step('Submit Completed form', async () => {
      await test.step('Complete form', async () => {
        await page.getByLabel('First name').fill('Playwright');
        await page.getByLabel('Last name').fill('Test');
        await page.getByLabel('Work phone').fill('555-555-5555');
        await page.getByLabel('Email address').fill('playwright@test.com');
        await page.getByLabel('Street address line 1').fill('555 Main St.');
        await page.getByLabel('City').fill('Utah (U');
        await page.selectOption('select#state', 'UT');
        await page.getByLabel('Zip code').fill('55555');
      });
    });
    await test.step('Click: Continue', async () => {
      await page.getByRole('button', { name: 'Continue to next step' }).click();
    });
  });

  // Sign and submit page
  await test.step('Sign and submit page', async () => {
    await expect(page.locator('h1'), 'h1 is correct').toContainText(
      'Sign and submit',
    );
  });
});
