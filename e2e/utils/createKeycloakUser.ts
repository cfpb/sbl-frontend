import { KeycloakAdminClient } from '@s3pweb/keycloak-admin-client-cjs';

export class KeycloakService {
  private readonly kcAdminClient: KeycloakAdminClient;

  constructor() {
    this.kcAdminClient = new KeycloakAdminClient({
      baseUrl: 'http://localhost:8880/',
      realmName: 'regtech',
    });
  }
}

const kcAdminClient = new KeycloakAdminClient({
  baseUrl: 'http://localhost:8880/',
  realmName: 'regtech',
});

interface CreateKeycloakUserProperties {
  testUserEmail: string;
  testUsername: string;
  testFirstName: string;
  testLastName: string;
  testUserPassword: string;
}

// Allow developers to disable routing in development
export default async function createKeycloakUser({
  testUserEmail,
  testUsername,
  testFirstName,
  testLastName,
  testUserPassword,
}: CreateKeycloakUserProperties): Promise<void> {
  // Authorize with username / password
  try {
    await kcAdminClient.auth({
      username: 'admin',
      clientId: 'admin-cli',
      clientSecret: 'local_test_only',
      grantType: 'client_credentials',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error when attempting to auth into :>>', error);
    throw error;
  }

  try {
    await kcAdminClient.users.create({
      email: testUserEmail,
      username: testUsername,
      firstName: testFirstName,
      lastName: testLastName,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: testUserPassword,
        },
      ],
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error when trying to create a user in keycloak :>>', error);
    throw error;
  }
}
