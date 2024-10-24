import { test } from '../../../fixtures/testFixture';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Upload)';

const currentStepPath = '/upload';

const userShouldNotAccess = ['/errors', '/warnings', '/contact', '/submit'];

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
});
