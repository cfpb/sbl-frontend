import { test } from '../../../fixtures/testFixture';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Upload)';

const currentStepPath = '/upload';

const userShouldNotAccess = ['/errors', '/warnings', '/details', '/submit'];

const afterRedirectHeading = 'Upload file';
const afterRedirectURL = /.*\/upload$/;

test(testLabel, async ({ page, navigateToUploadFile }) => {
  navigateToUploadFile;

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
});
