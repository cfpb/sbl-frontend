import { NavItem } from 'App';
import useSblAuth from 'api/useSblAuth';
import { Button } from 'design-system-react';
import type { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      <div className='user-actions'>
        <Link key='home' className='nav-item m-list_link' to='/landing'>
          Home
        </Link>
        <Link key='filing' className='nav-item m-list_link' to='/filing'>
          Filing
        </Link>
        <span key='user-name' className='mr-[3.75rem]'>
          <NavItem
            className='m-list_link !font-normal'
            href='/profile/view'
            label={
              auth.user?.profile.name ??
              auth.user?.profile.email ??
              'User profile'
            }
          />
        </span>
        <span className='a-link nav-item auth-action m-list_link' key='logout'>
          <Button label='LOG OUT' asLink onClick={onLogout} />
        </span>
      </div>,
    );
  }

  return headerLinks;
};

export default useHeaderAuthLinks;
