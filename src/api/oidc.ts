import type { UserProfile } from 'oidc-client-ts';

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
  authority: import.meta.env.SBL_OIDC_AUTHORITY as string,
  client_id: import.meta.env.SBL_OIDC_CLIENT_ID as string,
  redirect_uri: import.meta.env.SBL_OIDC_REDIRECT_URI as string,
  automaticSilentRenew: true,
  onSigninCallback,
};

// TODO: Doublecheck this
// Type definition from:
// https://github.com/cfpb/regtech-user-fi-management/blob/main/src/entities/models/dto.py#L130
export interface UserProfileObject {
  claims: UserProfile;
  name: UserProfile['name'];
  username: UserProfile['username'];
  email: UserProfile['email'];
  id: string;
  institutions: string[];
}
