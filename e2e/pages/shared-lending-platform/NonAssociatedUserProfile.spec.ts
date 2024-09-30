import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { controlUnicode } from '../../utils/unicodeConstants';

const expectedNoAssociationsSummaryUrl =
  /\/profile\/complete\/summary\/submitted$/;

// Test with isNonAssociatedUser true
test.use({ isNonAssociatedUser: true });
test('Complete User Profile -- No Associations -- process', async ({
  page,
}) => {
  test.slow();

  await test.step('Fillout Complete User Profile (No Associations) and verify 24-48 hour summary message', async () => {
    await page.getByLabel('First name').click();
    await page.getByLabel('First name').fill('exampleFirstName');
    await page.getByLabel('Last name').click();
    await page.getByLabel('Last name').fill('exampleLastName');
    await page.getByLabel('Financial institution name').click();
    await page
      .getByLabel('Financial institution name')
      .fill('exampleFinancialInstitutionName');
    await page.getByLabel('Legal Entity Identifier (LEI)').click();
    await page
      .getByLabel('Legal Entity Identifier (LEI)')
      .fill('12345678901234567890');
    await page.getByLabel('Submit User Profile').click();

    // redirected to the summary page
    await expect(page).toHaveURL(expectedNoAssociationsSummaryUrl);
    await expect(page.locator('#Summary div').first()).toBeVisible();
  });
});

test('Complete User Profile with Bad Unicode -- No Associations -- process', async ({
  page,
}) => {
  test.slow();

  await test.step('Fillout Complete User Profile (No Associations) with bad unicode and verify values', async () => {
    const expectedValues = {
      firstField: controlUnicode.slice(0, 255),
      lastField: controlUnicode.slice(0, 255),
      // TODO: Update with correct value after char limit in place, see:
      // https://github.com/cfpb/sbl-frontend/issues/972
      finField: controlUnicode,
      // TODO: Update with correct value after char limit in place, see:
      // https://github.com/cfpb/sbl-frontend/issues/972
      leiField: controlUnicode,
    };
    const unexpectedValues = {
      firstField: controlUnicode,
      lastField: controlUnicode,
      // TODO: Change to controlUnicode after char limit in place, see:
      // https://github.com/cfpb/sbl-frontend/issues/972
      finField: '',
      // TODO: Change to controlUnicode after char limit in place, see:
      // https://github.com/cfpb/sbl-frontend/issues/972
      leiField: '',
    };

    await page.getByLabel('First name').click();
    await page.getByLabel('First name').fill(controlUnicode);

    await page.getByLabel('Last name').click();
    await page.getByLabel('Last name').fill(controlUnicode);

    await page.getByLabel('Financial institution name').click();
    await page.getByLabel('Financial institution name').fill(controlUnicode);

    await page.getByLabel('Legal Entity Identifier (LEI)').click();
    await page.getByLabel('Legal Entity Identifier (LEI)').fill(controlUnicode);

    await expect(page.getByLabel('First name')).not.toHaveValue(
      unexpectedValues.firstField,
    );
    await expect(page.getByLabel('Last name')).not.toHaveValue(
      unexpectedValues.lastField,
    );
    await expect(page.getByLabel('Financial institution name')).not.toHaveValue(
      unexpectedValues.finField,
    );
    await expect(
      page.getByLabel('Legal Entity Identifier (LEI)'),
    ).not.toHaveValue(unexpectedValues.leiField);

    await expect(page.getByLabel('First name')).toHaveValue(
      expectedValues.firstField,
    );
    await expect(page.getByLabel('Last name')).toHaveValue(
      expectedValues.lastField,
    );
    await expect(page.getByLabel('Financial institution name')).toHaveValue(
      expectedValues.finField,
    );
    await expect(page.getByLabel('Legal Entity Identifier (LEI)')).toHaveValue(
      expectedValues.leiField,
    );
  });
});
