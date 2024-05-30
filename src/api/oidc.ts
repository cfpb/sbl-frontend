export interface OidcConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
  automaticSilentRenew: boolean;
  onSigninCallback: () => void;
}

const onSigninCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

export const oidcConfig: OidcConfig = {
  authority: import.meta.env.SBL_OIDC_AUTHORITY,
  client_id: import.meta.env.SBL_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.SBL_OIDC_REDIRECT_URI,
  automaticSilentRenew: true,
  onSigninCallback,
};
