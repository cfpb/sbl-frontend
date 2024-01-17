import { NavItem } from 'App';
import useSblAuth from 'api/useSblAuth';
import { Button } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export const useHeaderAuthLinks = (): ReactElement[] => {
  const { pathname } = useLocation();
  const auth = useSblAuth();
  const headerLinks = [];

  const onLogout = (): void => {
    // TODO: Works without waiting, check if we need to await
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    auth.onLogout();
  };

  if (!(pathname === '/') && !(pathname === '/profile-form')) {
    // Logged in
    headerLinks.push(
      <span key='user-name'>
        <NavItem
          className='!font-normal '
          href='/user-profile'
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
