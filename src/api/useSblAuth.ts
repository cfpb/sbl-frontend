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
      // Return user to the page that initiated the login
      // TODO: Redirect users to the authenticated landing page once it's available
      redirect_uri: window.location.href,
    });

  const onLogout = async (): Promise<void> =>
    auth.signoutRedirect({
      post_logout_redirect_uri: window.location.origin,
    });

  return {
    ...auth,
    onLogin,
    onLogout,
  };
};

export default useSblAuth;
