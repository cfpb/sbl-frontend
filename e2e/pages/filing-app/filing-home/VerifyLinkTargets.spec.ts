import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { InstitutionCardTitle } from 'pages/Filing/FilingApp/InstitutionCard.helpers';
import { test } from '../../../fixtures/testFixture';
import { expectLinkOpensNewTab } from '../../../utils/openLink';
import {
  SelectorLinkText,
  expectAll,
  selectLinks,
} from '../../../utils/verifyLinkTargets';

/**
 * Helpers
 * */

// Verify a button with the given label is visible
const expectButtonVisible = async (page: Page, name: string) => {
  const button = page.getByRole('button', { name });
  await expect(button).toBeVisible();
};

// Labels for primary home page actions
const ActionLabel = {
  startFiling: 'Start filing',
  continueFiling: 'Continue filing',
};

// Verify we've navigated to the Filing homepage
const gotoFilingHome = async (page: Page) => {
  await page.goto('/filing');

  await expect(page.locator('h1')).toContainText(
    'File your small business lending data',
  );
};

/**
 * Tests - Verify the state of the Filing homepage at each stage of the Filing process
 * */

test('Start filing', async ({ page, navigateToFilingHome }) => {
  navigateToFilingHome;

  await expect(page.getByText(InstitutionCardTitle.start)).toBeVisible();

  const links = selectLinks(page, [
    SelectorLinkText.fig.long,
    SelectorLinkText.fig.readAboutFiling,
  ]);

  await expectAll(links, expectLinkOpensNewTab);

  await expectButtonVisible(page, ActionLabel.startFiling);
});

test('Provide type of financial institution', async ({
  page,
  navigateToProvideTypeOfFinancialInstitution,
}) => {
  navigateToProvideTypeOfFinancialInstitution;
  await gotoFilingHome(page);

  await expect(page.getByText(InstitutionCardTitle.start)).toBeVisible();

  const links = selectLinks(page, [
    SelectorLinkText.fig.long,
    SelectorLinkText.fig.readAboutFiling,
  ]);

  await expectAll(links, expectLinkOpensNewTab);
});

test('Upload file', async ({ page, navigateToUploadFile }) => {
  navigateToUploadFile;
  await gotoFilingHome(page);

  await expect(page.getByText(InstitutionCardTitle.upload)).toBeVisible();
  await expectButtonVisible(page, ActionLabel.continueFiling);

  const links = selectLinks(page, [
    SelectorLinkText.fig.long,
    SelectorLinkText.fig.readAboutFiling,
  ]);

  await expectAll(links, expectLinkOpensNewTab);
});

test('Logic errors', async ({
  page,
  navigateToLogicErrorsAfterLogicErrorsUpload,
}) => {
  navigateToLogicErrorsAfterLogicErrorsUpload;
  await gotoFilingHome(page);

  await expect(page.getByText(InstitutionCardTitle.errors)).toBeVisible();
  await expectButtonVisible(page, ActionLabel.continueFiling);

  const links = selectLinks(page, [
    SelectorLinkText.fig.long,
    SelectorLinkText.fig.readAboutValidations,
  ]);

  await expectAll(links, expectLinkOpensNewTab);
});

test('Syntax errors', async ({
  page,
  navigateToSyntaxErrorsAfterSyntaxErrorsUpload,
}) => {
  navigateToSyntaxErrorsAfterSyntaxErrorsUpload;
  await gotoFilingHome(page);

  await expect(page.getByText(InstitutionCardTitle.errors)).toBeVisible();
  await expectButtonVisible(page, ActionLabel.continueFiling);

  const links = selectLinks(page, [
    SelectorLinkText.fig.long,
    SelectorLinkText.fig.readAboutValidations,
  ]);

  await expectAll(links, expectLinkOpensNewTab);
});

test('Warnings', async ({
  page,
  navigateToReviewWarningsAfterOnlyWarningsUpload,
}) => {
  navigateToReviewWarningsAfterOnlyWarningsUpload;
  await gotoFilingHome(page);

  await expect(page.getByText(InstitutionCardTitle.warnings)).toBeVisible();
  await expectButtonVisible(page, ActionLabel.continueFiling);

  const links = selectLinks(page, [
    SelectorLinkText.fig.long,
    SelectorLinkText.fig.readAboutValidations,
  ]);

  await expectAll(links, expectLinkOpensNewTab);
});

test('Provide filing details', async ({
  page,
  navigateToProvideFilingDetails,
}) => {
  navigateToProvideFilingDetails;
  await gotoFilingHome(page);

  await expect(
    page.getByText(InstitutionCardTitle.provideDetails),
  ).toBeVisible();
  await expectButtonVisible(page, ActionLabel.continueFiling);

  const links = selectLinks(page, [SelectorLinkText.fig.long]);

  await expectAll(links, expectLinkOpensNewTab);
});

test('Sign and submit', async ({ page, navigateToSignAndSubmit }) => {
  navigateToSignAndSubmit;
  await gotoFilingHome(page);

  await expect(page.getByText(InstitutionCardTitle.signSubmit)).toBeVisible();
  await expectButtonVisible(page, ActionLabel.continueFiling);

  const links = selectLinks(page, [SelectorLinkText.fig.long]);

  await expectAll(links, expectLinkOpensNewTab);
});
