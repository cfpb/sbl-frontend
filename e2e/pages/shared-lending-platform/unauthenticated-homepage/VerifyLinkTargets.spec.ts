import { test } from '@playwright/test';
import { expectLinkOpensSameTab } from '../../../utils/openLink';
import {
  SelectorLinkText,
  expectAll,
  selectLink,
} from '../../../utils/verifyLinkTargets';

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
    const gleif = selectLink(page, SelectorLinkText.gleif.long);
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
    const finalRule = selectLink(page, SelectorLinkText.sidebar.finalRule);
    const filingInstructionGuide = selectLink(
      page,
      SelectorLinkText.sidebar.collection,
    );
    const collectionReportingReqs = selectLink(
      page,
      SelectorLinkText.sidebar.collection,
    );
    const privacyNotice = selectLink(page, SelectorLinkText.privacyNotice);

    await expectAll(
      [
        finalRule,
        filingInstructionGuide,
        collectionReportingReqs,
        privacyNotice,
      ],
      expectLinkOpensSameTab,
    );
  });
});
