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
