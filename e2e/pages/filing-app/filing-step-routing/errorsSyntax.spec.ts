import { test } from '../../../fixtures/testFixture';
import { checkSnapshot } from '../../../utils/snapshotTesting';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Errors: Syntax)';

const currentStepPath = '/error';

const userShouldNotAccess = [
  '/errors/errors-logic',
  '/warnings',
  '/details',
  '/submit',
];

const afterRedirectHeading = 'Resolve errors (syntax)';
const afterRedirectURL = /.*errors\/errors-syntax$/;

test(
  testLabel,
  async ({ page, navigateToSyntaxErrorsAfterSyntaxErrorsUpload }) => {
    navigateToSyntaxErrorsAfterSyntaxErrorsUpload;

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
