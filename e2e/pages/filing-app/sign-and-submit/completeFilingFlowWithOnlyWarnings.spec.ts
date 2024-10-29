import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';

test('Sign and submit: complete filing flow with only warnings', async ({
  page,
  navigateToSignAndSubmit,
}) => {
  navigateToSignAndSubmit;

  await test.step('Sign and submit: verify completion', async () => {
    await expect(
      page.getByText(
        'Congratulations! You have reached the end of the beta filing process.',
      ),
    ).toBeVisible();
  });
});
