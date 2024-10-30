import type { GrantTypes } from '@keycloak/keycloak-admin-client/lib/utils/auth';

export interface KeycloakCLIConfig {
  username: string;
  clientId: string;
  clientSecret: string;
  grantType: GrantTypes;
}

export interface KeycloakAdminConfig {
  username: string;
  password: string;
  clientId: string;
  grantType: GrantTypes;
}

export interface KeycloakConfig {
  target: string;
  realm: string;
  admin: KeycloakAdminConfig;
  cli: KeycloakCLIConfig;
}

export const config: KeycloakConfig = {
  target: process.env.SBL_PLAYWRIGHT_TEST_KC_TARGET ?? 'http://localhost:8880/',
  realm: process.env.SBL_PLAYWRIGHT_TEST_KC_REALM ?? 'regtech',
  admin: {
    username: process.env.SBL_PLAYWRIGHT_TEST_KC_ADMIN_USERNAME ?? 'admin1',
    password: process.env.SBL_PLAYWRIGHT_TEST_KC_ADMIN_PASSWORD ?? 'admin',
    clientId:
      process.env.SBL_PLAYWRIGHT_TEST_KC_ADMIN_CLIENT_ID ?? 'regtech-client',
    grantType: (process.env.SBL_PLAYWRIGHT_TEST_KC_ADMIN_GRANT_TYPE ??
      'password') as GrantTypes,
  },
  cli: {
    username: process.env.SBL_PLAYWRIGHT_TEST_KC_CLI_USERNAME ?? 'admin',
    clientSecret:
      process.env.SBL_PLAYWRIGHT_TEST_KC_CLI_CLIENT_SECRET ?? 'local_test_only',
    clientId: process.env.SBL_PLAYWRIGHT_TEST_KC_CLI_CLIENT_ID ?? 'admin-cli',
    grantType: (process.env.SBL_PLAYWRIGHT_TEST_KC_CLI_GRANT_TYPE ??
      'client_credentials') as GrantTypes,
  },
};
