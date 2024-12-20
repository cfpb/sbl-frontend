import { test } from '../../../fixtures/testFixture';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Warnings)';

const currentStepPath = '/warnings';

const userShouldNotAccess = ['/details', '/submit'];

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
    await checkSnapshot(page);
  },
);
