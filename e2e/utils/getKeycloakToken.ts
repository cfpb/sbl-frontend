import axios from 'axios';
import { config } from './authConstants';

export default async function getAdminKeycloakToken(): Promise<string> {
  const encodedParameters = new URLSearchParams();
  encodedParameters.set('username', config.admin.username);
  encodedParameters.set('password', config.admin.password);
  encodedParameters.set('grant_type', config.admin.grantType);
  encodedParameters.set('client_id', config.admin.clientId);

  const optionsForGetAdminKeycloakToken = {
    method: 'POST',
    url: `${config.target}/realms/${config.realm}/protocol/openid-connect/token`,
    data: encodedParameters,
  };
  try {
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await axios.request(optionsForGetAdminKeycloakToken);
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return data.access_token as string;
  } catch (error) {
    console.error(
      'error when trying to fetch an admin token from keycloak :>>',
      error,
    );
    throw error;
  }
}
