import { test } from '../../../fixtures/testFixture';
import { verifyRedirects } from './_shared';

const testLabel = 'Filing step routing (Point of Contact)';

const currentStepPath = '/contact';

const userShouldNotAccess = ['/submit'];

const afterRedirectHeading = 'Provide filing details';
const afterRedirectURL = /.*\/contact$/;

test(testLabel, async ({ page, navigateToProvidePointOfContact }) => {
  test.slow();

  navigateToProvidePointOfContact;

  await verifyRedirects({
    testLabel,
    currentStepPath,
    userShouldNotAccess,
    afterRedirectHeading,
    afterRedirectURL,
    page,
    test,
  });
});
