import { config } from './authConstants';
import { kcAdminClient } from './createKeycloakUser';

interface DeleteKeycloakUserProperties {
  id: string;
}

export default async function deleteKeycloakUser({
  id,
}: DeleteKeycloakUserProperties): Promise<void> {
  // Authorize with username / password
  try {
    await kcAdminClient.auth({
      username: config.cli.username,
      clientId: config.cli.clientId,
      clientSecret: config.cli.clientSecret,
      grantType: config.cli.grantType,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      'error when attempting to auth into keycloak admin :>>',
      error,
    );
    throw error;
  }

  try {
    await kcAdminClient.users.del({
      id,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error when trying to delete a user in keycloak :>>', error);
    throw error;
  }
}
