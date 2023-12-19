import type { KeycloakConfig } from 'keycloak-js';
import Keycloak from 'keycloak-js';

const initOptions: KeycloakConfig = {
  url: 'http://localhost:8880',
  realm: 'sbl',
  clientId: 'sbl-client',
};

const keycloak = new Keycloak(initOptions);

export default keycloak;

export const mockKeycloak = (overrides = {}) => ({
  authenticated: true,
  tokenParsed: {
    name: 'Test User',
    lei: process.env.REACT_APP_LEIS || 'FRONTENDTESTBANK9999',
    exp: Date.now() + 18_000_000,
  },
  init: async () => new Promise(res => res(true)),
  updateToken: async () =>
    new Promise(resolve =>
      resolve({
        success: () => {},
        error: () => false,
      }),
    ),
  logout: () => (window.location.href = '/filing'),
  login: () => (window.location.href += 'institutions'),
  hasResourceRole: () => true,
  ...overrides,
});
