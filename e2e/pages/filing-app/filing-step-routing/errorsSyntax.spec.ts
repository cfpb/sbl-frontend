import { test } from '../../../fixtures/testFixture';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Errors: Syntax)';

const currentStepPath = '/error';

const userShouldNotAccess = [
  '/errors/errors-logic',
  '/warnings',
  '/contact',
  '/submit',
];

const afterRedirectHeading = 'Resolve errors (syntax)';
const afterRedirectURL = /.*errors\/errors-syntax$/;

test(
  testLabel,
  async ({ page, navigateToSyntaxErrorsAfterSyntaxErrorsUpload }) => {
    test.slow();

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
  },
);
