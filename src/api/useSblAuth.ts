import type { AuthContextProps } from 'react-oidc-context';
import { useAuth } from 'react-oidc-context';

interface SblAuthProperties extends AuthContextProps {
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

const useSblAuth = (): SblAuthProperties => {
  const auth = useAuth();

  const onLogin = async (): Promise<void> => auth.signinRedirect();

  const onLogout = async (): Promise<void> =>
    auth.signoutRedirect({
      post_logout_redirect_uri: window.location.origin
    });

  return {
    ...auth,
    onLogin,
    onLogout
  };
};

export default useSblAuth;
