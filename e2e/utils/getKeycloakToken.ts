import axios from 'axios';

export default async function getAdminKeycloakToken(): Promise<string> {
  const encodedParameters = new URLSearchParams();
  encodedParameters.set('username', 'admin1');
  encodedParameters.set('password', 'admin');
  encodedParameters.set('grant_type', 'password');
  encodedParameters.set('client_id', 'regtech-client');

  const optionsForGetAdminKeycloakToken = {
    method: 'POST',
    url: 'http://localhost:8880/realms/regtech/protocol/openid-connect/token',
    data: encodedParameters,
  };
  try {
    const { data } = await axios.request(optionsForGetAdminKeycloakToken);
    return data.access_token as string;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error when trying to fetch an admin token from keycloak :>> ', error);
    throw error;
  }
}
