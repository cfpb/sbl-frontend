import { NavItem } from 'App';
import useSblAuth from 'api/useSblAuth';
import { Button } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

const AUTH_LINKS_EXCLUDED = new Set(['/', '/profile/complete', '/summary']);

export const useHeaderAuthLinks = (): ReactElement[] => {
  const { pathname } = useLocation();
  const auth = useSblAuth();
  const headerLinks = [];

  const onLogout = (): void => {
    // Works well without waiting
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    auth.onLogout();
  };

  if (auth.isLoading || !auth.isAuthenticated) return [];

  if (!AUTH_LINKS_EXCLUDED.has(pathname)) {
    // Logged in
    headerLinks.push(
      <span key='user-name'>
        <NavItem
          className='!font-normal '
          href='/profile/view'
          label={
            auth.user?.profile.name ??
            auth.user?.profile.email ??
            'User profile'
          }
        />
      </span>,
      <span className='a-link nav-item auth-action' key='logout'>
        <Button label='LOG OUT' asLink onClick={onLogout} />
      </span>,
    );
  }

  return headerLinks;
};

export default useHeaderAuthLinks;
