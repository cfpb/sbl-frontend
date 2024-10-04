import { expect } from '@playwright/test';
import { test } from '../../fixtures/testFixture';
import { controlUnicode } from '../../utils/unicodeConstants';
import { assertTextInput } from '../../utils/inputValidators';
import { DefaultInputCharLimit, LeiInputCharLimit } from 'utils/constants';

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
      firstField: controlUnicode.slice(0, DefaultInputCharLimit),
      lastField: controlUnicode.slice(0, DefaultInputCharLimit),
      finField: controlUnicode.slice(0, DefaultInputCharLimit),
      leiField: controlUnicode.slice(0, LeiInputCharLimit),
    };
    const unexpectedValues = {
      firstField: controlUnicode,
      lastField: controlUnicode,
      finField: controlUnicode,
      leiField: controlUnicode,
    };

    await assertTextInput(page, 'First name', {
      fill: controlUnicode,
      expected: expectedValues.firstField,
      unexpected: unexpectedValues.firstField,
    });
    await assertTextInput(page, 'Last name', {
      fill: controlUnicode,
      expected: expectedValues.lastField,
      unexpected: unexpectedValues.lastField,
    });
    await assertTextInput(page, 'Financial institution name', {
      fill: controlUnicode,
      expected: expectedValues.finField,
      unexpected: unexpectedValues.finField,
    });
    await assertTextInput(page, 'Legal Entity Identifier (LEI)', {
      fill: controlUnicode,
      expected: expectedValues.leiField,
      unexpected: unexpectedValues.leiField,
    });
  });
});
