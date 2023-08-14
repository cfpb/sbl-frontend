export interface OidcConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
}

export const oidcConfig: OidcConfig = {
  authority: 'http://localhost:8880/realms/sbl',
  client_id: 'sbl-client',
  redirect_uri: 'http://localhost:8881/filing'
};
