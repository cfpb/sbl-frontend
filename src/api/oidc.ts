export interface OidcConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
}

export const oidcConfig: OidcConfig = {
  authority: import.meta.env.SBL_OIDC_AUTHORITY as string,
  client_id: import.meta.env.SBL_OIDC_CLIENT_ID as string,
  redirect_uri: import.meta.env.SBL_OIDC_REDIRECT_URI as string
};
