import { KeycloakAdminClient } from '@s3pweb/keycloak-admin-client-cjs';
import { config } from './authConstants';

export class KeycloakService {
  private readonly kcAdminClient: KeycloakAdminClient;

  public constructor() {
    this.kcAdminClient = new KeycloakAdminClient({
      baseUrl: config.target,
      realmName: config.realm,
    });
  }
}

export const kcAdminClient = new KeycloakAdminClient({
  baseUrl: config.target,
  realmName: config.realm,
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
}: CreateKeycloakUserProperties): Promise<string> {
  let result = '';

  // Authorize with username / password
  try {
    await kcAdminClient.auth({
      username: config.cli.username,
      clientId: config.cli.clientId,
      clientSecret: config.cli.clientSecret,
      grantType: config.cli.grantType,
    });
  } catch (error) {
    console.error(
      'error when attempting to auth into keycloak admin :>>',
      error,
    );
    throw error;
  }

  try {
    const response = await kcAdminClient.users.create({
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
    result = response?.id ?? '';
  } catch (error) {
    console.error('error when trying to create a user in keycloak :>>', error);
    throw error;
  }
  return result;
}
