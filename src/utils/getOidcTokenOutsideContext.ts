import type { User } from 'oidc-client-ts';

/**
 * Retrieves the oidc token from the session storage outside of the AuthProvider context
 * @returns The oidc token as a string or null if it does not exist
 */
const getOidcTokenOutsideOfContext = (): string | null => {
  const oidcSessionStorageName = Object.keys(sessionStorage).find(
    key =>
      /*  gets the oidc session storage, and the current environment check is only needed if a
    a dev changes their .env file locally without closing the tab */
      key.startsWith('oidc.user') &&
      key.includes(import.meta.env.SBL_OIDC_AUTHORITY),
  );
  if (!oidcSessionStorageName) return null;

  const sessionStorageOidcString = sessionStorage.getItem(
    oidcSessionStorageName,
  );
  if (!sessionStorageOidcString) return null;

  const sessionStorageOidc = JSON.parse(sessionStorageOidcString) as User;
  const accessToken = `Bearer ${sessionStorageOidc.access_token}`;
  return accessToken;
};

export default getOidcTokenOutsideOfContext;
