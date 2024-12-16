import useSblAuth from 'api/useSblAuth';
import { Button } from 'design-system-react';
import type { ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AUTH_LINKS_EXCLUDED = new Set([
  '/',
  '/privacy-notice',
  '/paperwork-reduction-act-notice',
]);

export const useHeaderAuthLinks = (): ReactElement[] => {
  const { pathname } = useLocation();
  const auth = useSblAuth();

  const onLogout = (): void => {
    // Works well without waiting
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    auth.onLogout();
  };

  if (
    auth.isLoading ||
    !auth.isAuthenticated ||
    AUTH_LINKS_EXCLUDED.has(pathname)
  ) {
    return [];
  }

  const headerLinksFull = [
    <NavLink key='home' className='nav-item a-link' to='/landing'>
      Home
    </NavLink>,
    <NavLink key='filing' className='nav-item a-link' to='/filing'>
      Filing
    </NavLink>,
    <NavLink
      key='user-name'
      className='nav-item a-link profile snapshot-ignore'
      to='/profile/view'
    >
      <span>
        {auth.user?.profile.name ?? auth.user?.profile.email ?? 'User profile'}
      </span>
    </NavLink>,
  ];
  const headerLinksPartial = [
    <Button key='logout' label='LOG OUT' asLink onClick={onLogout} />,
  ];

  if (
    pathname.startsWith('/profile') &&
    !pathname.startsWith('/profile/view')
  ) {
    return headerLinksPartial;
  }

  return [...headerLinksFull, ...headerLinksPartial];
};

export default useHeaderAuthLinks;
