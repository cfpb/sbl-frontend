import type { AuthContextProps } from 'react-oidc-context';
import { useAuth } from 'react-oidc-context';
import { One, Thousand, Three } from 'utils/constants';
import { LOGOUT_REDIRECT_URL } from './common';

const tokenExpiresIn = (token: string | undefined): number | undefined => {
  if (!token) return undefined;
  const parts = token.split('.');
  if (parts.length !== Three) return undefined;
  const part = atob(parts[One]);
  if (!part) return undefined;
  const parsed = JSON.parse(part) as { exp: number };
  if (!parsed) return undefined;
  const expires = parsed.exp;
  if (!expires) return undefined;
  return (new Date(expires * Thousand).getTime() - Date.now()) / Thousand;
};

export interface SblAuthProperties extends AuthContextProps {
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  emailAddress: string | undefined;
  emailDomain: string | undefined;
}

const useSblAuth = (): SblAuthProperties => {
  const auth = useAuth();

  const onLogin = async (): Promise<void> =>
    auth.signinRedirect({
      redirect_uri: `${window.location.origin}/landing`,
    });

  const onLogout = async (): Promise<void> =>
    auth.signoutRedirect({
      post_logout_redirect_uri: LOGOUT_REDIRECT_URL,
    });

  const emailAddress = auth.user?.profile.email;
  const emailDomain = emailAddress?.slice(
    Math.max(0, emailAddress.lastIndexOf('@') + One),
  );

  // Note: This is placed here because after logging in with a non-domain email the app hard-forwards the user to sblHelp with no way of stopping this
  if (import.meta.env.DEV) {
    window.logout = onLogout;
  }

  if (!auth.isLoading) {
    const accessUntil = tokenExpiresIn(auth?.user?.access_token);
    const refreshUntil = tokenExpiresIn(auth?.user?.refresh_token);

    if (accessUntil !== undefined && (!refreshUntil || refreshUntil < 0)) {
      void onLogout();
    }
  }

  return {
    ...auth,
    onLogin,
    onLogout,
    emailAddress,
    emailDomain,
  };
};

export default useSblAuth;
