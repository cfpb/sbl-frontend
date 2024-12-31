import { test } from '@playwright/test';
import { expectLinkOpensSameTab } from '../../../utils/openLink';

test('Unauthenticated homepage: Verify links open in expected target', async ({
  page,
}) => {
  await page.goto('/');

  await test.step('Alert: same tab', async () => {
    const emailSupport = await page.getByRole('link', {
      name: 'email our support staff',
      exact: true,
    });
    await expectLinkOpensSameTab(emailSupport);
  });

  await test.step('Login.gov: same tab', async () => {
    const loginGov = await page.getByRole('link', { name: 'Login.gov ' });
    await expectLinkOpensSameTab(loginGov);

    const createLoginGov = await page.getByRole('button', {
      name: 'Create an account with Login.gov',
    });
    await expectLinkOpensSameTab(createLoginGov);
  });

  await test.step('GLEIF: same tab', async () => {
    const gleif = await page.getByRole('link', {
      name: 'Global LEI Foundation (GLEIF)',
    });
    await expectLinkOpensSameTab(gleif);
  });

  await test.step('Get help: same tab', async () => {
    const getHelp = await page.getByRole('link', {
      name: 'Find answers to frequently asked questions',
    });
    await expectLinkOpensSameTab(getHelp);
    const emailSupport = await page.getByRole('link', {
      name: 'Email our support staff',
      exact: true,
    });
    await expectLinkOpensSameTab(emailSupport);
  });

  await test.step('Sidebar: same tab', async () => {
    const finalRule = await page.getByRole('link', { name: 'Final Rule' });
    const filingInstructionGuide = await page.getByRole('link', {
      name: 'Filing instructions guide',
    });
    const collectionReportingReqs = await page.getByRole('link', {
      name: 'Collection and reporting requirements',
    });
    const privacyNotice = await page.getByRole('link', {
      name: 'View Privacy Notice',
    });

    await expectLinkOpensSameTab(finalRule);
    await expectLinkOpensSameTab(filingInstructionGuide);
    await expectLinkOpensSameTab(collectionReportingReqs);
    await expectLinkOpensSameTab(privacyNotice);
  });
});
