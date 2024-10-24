import { test } from '../../../fixtures/testFixture';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Warnings)';

const currentStepPath = '/warnings';

const userShouldNotAccess = ['/contact', '/submit'];

const afterRedirectHeading = 'Review warnings';
const afterRedirectURL = /.*\/warnings$/;

test(
  testLabel,
  async ({ page, navigateToReviewWarningsAfterOnlyWarningsUpload }) => {
    navigateToReviewWarningsAfterOnlyWarningsUpload;

    await verifyRedirects({
      afterRedirectHeading,
      afterRedirectURL,
      currentStepPath,
      page,
      test,
      testLabel,
      userShouldNotAccess,
    });
  },
);
