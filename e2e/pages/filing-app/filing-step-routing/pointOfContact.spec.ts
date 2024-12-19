import { test } from '../../../fixtures/testFixture';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Point of Contact)';

const currentStepPath = '/details';

const userShouldNotAccess = ['/submit'];

const afterRedirectHeading = 'Provide filing details';
const afterRedirectURL = /.*\/details$/;

test(testLabel, async ({ page, navigateToProvideFilingDetails }) => {
  navigateToProvideFilingDetails;

  await verifyRedirects({
    testLabel,
    currentStepPath,
    userShouldNotAccess,
    afterRedirectHeading,
    afterRedirectURL,
    page,
    test,
  });
  await checkSnapshot(page);
});
