import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import { controlUnicode } from '../../../utils/unicodeConstants';
import {
  assertTextInput,
  assertSelectInput,
} from '../../../utils/inputValidators';
import {
  DefaultInputCharLimit,
  PhoneInputCharLimit,
  EmailInputCharLimit,
  ZipInputCharLimit,
} from 'utils/constants';

test('Point of Contact: Checking for form errors based on user input', async ({
  page,
  navigateToProvidePointOfContact,
}) => {
  test.slow();

  navigateToProvidePointOfContact;

  await test.step('Point of Contact: Check that the error header render when no input is filled', async () => {
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(
      page.locator('#PointOfContactFormErrors div').first(),
    ).toBeVisible();
  });

  await test.step('Point of Contact: Check the first and last names for invalid input', async () => {
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await page.getByLabel('First name').click();
    await page.getByLabel('First name').fill('$!@#%^&*()');
    await page.getByLabel('Last name').click();
    await page.getByLabel('Last name').fill('$!@#%^&*()');
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(page.locator('form')).toContainText(
      'The first name must not contain invalid characters',
    );
    await expect(page.locator('form')).toContainText(
      'The last name must not contain invalid characters',
    );
    await expect(page.locator('#PointOfContactFormErrors')).toContainText(
      'The first name must not contain invalid characters',
    );
    await expect(page.locator('#PointOfContactFormErrors')).toContainText(
      'The last name must not contain invalid characters',
    );
  });
});

test('Point of Contact: Checking for unicode tolerance based on user input', async ({
  page,
  navigateToProvidePointOfContact,
}) => {
  test.slow();

  navigateToProvidePointOfContact;

  await test.step('Point of Contact: Check that the error header render when no input is filled', async () => {
    await page.getByRole('button', { name: 'Continue to next step' }).click();
    await expect(
      page.locator('#PointOfContactFormErrors div').first(),
    ).toBeVisible();
  });

  await test.step('Point of Contact: Check the first and last names for invalid input', async () => {
    const expectedValues = {
      firstField: controlUnicode.slice(0, DefaultInputCharLimit),
      lastField: controlUnicode.slice(0, DefaultInputCharLimit),
      phoneField: controlUnicode.slice(0, PhoneInputCharLimit),
      extensionField: controlUnicode.slice(0, DefaultInputCharLimit),
      emailField: controlUnicode.slice(0, EmailInputCharLimit),
      addressField1: controlUnicode.slice(0, DefaultInputCharLimit),
      addressField2: controlUnicode.slice(0, DefaultInputCharLimit),
      addressField3: controlUnicode.slice(0, DefaultInputCharLimit),
      addressField4: controlUnicode.slice(0, DefaultInputCharLimit),
      cityField: controlUnicode.slice(0, DefaultInputCharLimit),
      stateField: 'TX',
      zipField: controlUnicode.slice(0, ZipInputCharLimit),
    };
    const unexpectedValues = {
      firstField: controlUnicode,
      lastField: controlUnicode,
      phoneField: controlUnicode,
      extensionField: controlUnicode,
      emailField: controlUnicode,
      addressField1: controlUnicode,
      addressField2: controlUnicode,
      addressField3: controlUnicode,
      addressField4: controlUnicode,
      cityField: controlUnicode,
      stateField: '',
      zipField: controlUnicode,
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
    await assertTextInput(page, 'Phone number', {
      fill: controlUnicode,
      expected: expectedValues.phoneField,
      unexpected: unexpectedValues.phoneField,
    });
    await assertTextInput(page, 'Extension', {
      fill: controlUnicode,
      expected: expectedValues.extensionField,
      unexpected: unexpectedValues.extensionField,
    });
    await assertTextInput(page, 'Email address', {
      fill: controlUnicode,
      expected: expectedValues.emailField,
      unexpected: unexpectedValues.emailField,
    });
    await assertTextInput(page, 'Street address line 1', {
      fill: controlUnicode,
      expected: expectedValues.addressField1,
      unexpected: unexpectedValues.addressField1,
    });
    await assertTextInput(page, 'Street address line 2', {
      fill: controlUnicode,
      expected: expectedValues.addressField2,
      unexpected: unexpectedValues.addressField2,
    });
    await assertTextInput(page, 'Street address line 3', {
      fill: controlUnicode,
      expected: expectedValues.addressField3,
      unexpected: unexpectedValues.addressField3,
    });
    await assertTextInput(page, 'Street address line 4', {
      fill: controlUnicode,
      expected: expectedValues.addressField4,
      unexpected: unexpectedValues.addressField4,
    });
    await assertTextInput(page, 'City', {
      fill: controlUnicode,
      expected: expectedValues.cityField,
      unexpected: unexpectedValues.cityField,
    });
    await assertSelectInput(page, 'State or territory', {
      fill: { label: 'Texas (TX)' },
      expected: expectedValues.stateField,
      unexpected: unexpectedValues.stateField,
    });
    await assertTextInput(page, 'Zip code', {
      fill: controlUnicode,
      expected: expectedValues.zipField,
      unexpected: unexpectedValues.zipField,
    });

    await page.getByRole('button', { name: 'Continue to next step' }).click();

    await expect(page.locator('#PointOfContactFormErrors')).toContainText(
      'Enter a valid phone number',
    );
    await expect(page.locator('#PointOfContactFormErrors')).toContainText(
      'Enter a valid email address',
    );
    await expect(page.locator('#PointOfContactFormErrors')).toContainText(
      'Enter a valid ZIP code',
    );

    await expect(page.locator('form')).toContainText(
      'You must enter a valid phone number.',
    );
    await expect(page.locator('form')).toContainText(
      'You must enter a valid email address.',
    );
    await expect(page.locator('form')).toContainText(
      'You must enter a valid ZIP code.',
    );
  });
});
