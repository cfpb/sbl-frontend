import type { AuthContextProps } from 'react-oidc-context';
import { useAuth } from 'react-oidc-context';
import { One } from 'utils/constants';
import { LOGOUT_REDIRECT_URL } from './common';

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

  return {
    ...auth,
    onLogin,
    onLogout,
    emailAddress,
    emailDomain,
  };
};

export default useSblAuth;
