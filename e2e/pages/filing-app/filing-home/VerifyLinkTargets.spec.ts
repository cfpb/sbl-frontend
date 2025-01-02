import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testFixture';
import { expectLinkOpensNewTab } from '../../../utils/openLink';

test('Start filing', async ({ page, navigateToFilingHome }) => {
  await navigateToFilingHome;

  const fig = await page.getByRole('link', {
    name: 'filing instructions guide for small business lending data',
  });
  await expectLinkOpensNewTab(fig);

  const readAboutFiling = await page.getByRole('link', {
    name: 'Read about the filing process',
  });
  await expectLinkOpensNewTab(readAboutFiling);
});

test('Upload file', async ({ page, navigateToUploadFile }) => {
  await navigateToUploadFile;
  await page.goto('/filing');

  await expect(page.locator('h1')).toContainText(
    'File your small business lending data',
  );

  const continueFiling = await page.getByRole('button', {
    name: 'Continue filing',
  });
  await expect(continueFiling).toBeEnabled();

  const fig = await page.getByRole('link', {
    name: 'filing instructions guide for small business lending data',
  });
  await expectLinkOpensNewTab(fig);

  const readAboutFiling = await page.getByRole('link', {
    name: 'Read about the filing process',
  });
  await expectLinkOpensNewTab(readAboutFiling);
});

test('Logic errors', async ({
  page,
  navigateToLogicErrorsAfterLogicErrorsUpload,
}) => {
  await navigateToLogicErrorsAfterLogicErrorsUpload;
  await page.goto('/filing');

  await expect(page.locator('h1')).toContainText(
    'File your small business lending data',
  );

  const continueFiling = await page.getByRole('button', {
    name: 'Continue filing',
  });
  await expect(continueFiling).toBeEnabled();

  const fig = await page.getByRole('link', {
    name: 'filing instructions guide for small business lending data',
  });
  await expectLinkOpensNewTab(fig);

  const readAboutFiling = await page.getByRole('link', {
    name: 'Read about data validations',
  });
  await expectLinkOpensNewTab(readAboutFiling);
});

test('Syntax errors', async ({
  page,
  navigateToSyntaxErrorsAfterSyntaxErrorsUpload,
}) => {
  await navigateToSyntaxErrorsAfterSyntaxErrorsUpload;
  await page.goto('/filing');

  await expect(page.locator('h1')).toContainText(
    'File your small business lending data',
  );

  const continueFiling = await page.getByRole('button', {
    name: 'Continue filing',
  });
  await expect(continueFiling).toBeEnabled();

  const fig = await page.getByRole('link', {
    name: 'filing instructions guide for small business lending data',
  });
  await expectLinkOpensNewTab(fig);

  const readAboutFiling = await page.getByRole('link', {
    name: 'Read about data validations',
  });
  await expectLinkOpensNewTab(readAboutFiling);
});

test('Warnings', async ({
  page,
  navigateToReviewWarningsAfterOnlyWarningsUpload,
}) => {
  await navigateToReviewWarningsAfterOnlyWarningsUpload;
  await page.goto('/filing');

  await expect(page.locator('h1')).toContainText(
    'File your small business lending data',
  );

  const continueFiling = await page.getByRole('button', {
    name: 'Continue filing',
  });
  await expect(continueFiling).toBeEnabled();

  const fig = await page.getByRole('link', {
    name: 'filing instructions guide for small business lending data',
  });
  await expectLinkOpensNewTab(fig);

  const readAboutFiling = await page.getByRole('link', {
    name: 'Read about data validations',
  });
  await expectLinkOpensNewTab(readAboutFiling);
});
