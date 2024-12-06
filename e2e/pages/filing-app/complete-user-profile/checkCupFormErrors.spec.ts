import { expect } from '@playwright/test';
import { DefaultInputCharLimit } from 'utils/constants';
import { test } from '../../../fixtures/testFixture';
import { assertTextInput } from '../../../utils/inputValidators';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { controlUnicode } from '../../../utils/unicodeConstants';

test('Complete the User Profile: Checking for form errors based on user input', async ({
  page,
}) => {
  await test.step('Complete the User Profile: Check that the error header render when no input is filled', async () => {
    await page.getByLabel('Submit User Profile').click();
    await expect(
      page.locator('#step1FormErrorHeader div').first(),
    ).toBeVisible();
    await checkSnapshot(page);
  });

  await test.step('Complete the User Profile: Check the first and last names for invalid input', async () => {
    await page.getByLabel('First name').fill('!@#$%^&*()');
    await page.getByLabel('Last name').fill('!@#$%^&*()');
    await page.getByLabel('Submit User Profile').click();
    await expect(page.locator('#step1FormErrorHeader')).toContainText(
      'Enter valid characters for your first name',
    );
    await expect(page.locator('#step1FormErrorHeader')).toContainText(
      'Enter valid characters for your last name',
    );
    await expect(page.locator('form')).toContainText(
      'Your first name must not contain invalid characters',
    );
    await expect(page.locator('form')).toContainText(
      'Your last name must not contain invalid characters',
    );
    await checkSnapshot(page);
  });
});

test('Complete the User Profile: Checking for input length restriction', async ({
  page,
}) => {
  await test.step('Complete the User Profile: Check that the error header render when no input is filled', async () => {
    await page.getByLabel('Submit User Profile').click();
    await expect(
      page.locator('#step1FormErrorHeader div').first(),
    ).toBeVisible();
    await checkSnapshot(page);
  });

  await test.step('Complete the User Profile: Check the first and last names for invalid input', async () => {
    const expectedValues = {
      firstField: controlUnicode.slice(0, DefaultInputCharLimit),
      lastField: controlUnicode.slice(0, DefaultInputCharLimit),
    };
    const unexpectedValues = {
      firstField: controlUnicode,
      lastField: controlUnicode,
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
    await checkSnapshot(page);
  });
});
