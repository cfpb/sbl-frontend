import type { KeycloakConfig } from 'keycloak-js';
import Keycloak from 'keycloak-js';

const initOptions: KeycloakConfig = {
  url: 'http://localhost:8880',
  realm: 'sbl',
  clientId: 'sbl-client',
};

const keycloak = new Keycloak(initOptions);

export default keycloak;

// Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const mockKeycloak = (overrides = {}) => ({
  authenticated: true,
  tokenParsed: {
    name: 'Test User',
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    lei: process.env.REACT_APP_LEIS || 'FRONTENDTESTBANK9999',
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    exp: Date.now() + 18_000_000,
  },
  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, no-promise-executor-return, unicorn/prevent-abbreviations
  init: async () => new Promise(res => res(true)),
  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  updateToken: async () =>
    new Promise(resolve =>
      // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      // eslint-disable-next-line no-promise-executor-return
      resolve({
        success: () => {},
        error: () => false,
      }),
    ),
  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, no-return-assign
  logout: () => (window.location.href = '/filing'),
  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, no-return-assign
  login: () => (window.location.href += 'institutions'),
  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  hasResourceRole: () => true,
  ...overrides,
});
