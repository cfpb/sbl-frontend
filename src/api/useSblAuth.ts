import type { AuthContextProps } from 'react-oidc-context';
import { useAuth } from 'react-oidc-context';

export interface SblAuthProperties extends AuthContextProps {
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

const useSblAuth = (): SblAuthProperties => {
  const auth = useAuth();

  const onLogin = async (): Promise<void> =>
    auth.signinRedirect({
      redirect_uri: `${window.location.origin}/landing`,
    });

  const onLogout = async (): Promise<void> =>
    auth.signoutRedirect({
      post_logout_redirect_uri: window.location.origin,
    });

  // Note: This is placed here because after logging in with a non-domain email the app hard-forwards the user to sblHelp with no way of stopping this
  if (import.meta.env.DEV) {
    window.logout = onLogout;
  }

  return {
    ...auth,
    onLogin,
    onLogout,
  };
};

export default useSblAuth;
