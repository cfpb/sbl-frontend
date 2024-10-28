import { test } from '../../../fixtures/testFixture';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Errors: Logic)';

const currentStepPath = '/error';

const userShouldNotAccess = ['/warnings', '/contact', '/submit'];

const afterRedirectHeading = 'Resolve errors (syntax)';
const afterRedirectURL = /.*errors\/errors-syntax$/;

test(
  testLabel,
  async ({ page, navigateToLogicErrorsAfterLogicErrorsUpload }) => {
    navigateToLogicErrorsAfterLogicErrorsUpload;

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
