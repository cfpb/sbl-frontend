import { useQuery } from '@tanstack/react-query';
import { NavItem } from 'App';
import useSblAuth from 'api/useSblAuth';
import { Button } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export const useHeaderAuthLinks = (): ReactElement[] => {
  const { pathname } = useLocation();
  const auth = useSblAuth();
  const headerLinks = [];

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', auth.isAuthenticated],
    queryFn: async () => auth.user,
    enabled: !!auth.isAuthenticated,
  });

  const onLogout = (): void => {
    // TODO: Works without waiting, check if we need to await
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    auth.onLogout();
  };

  if (userInfo && !(pathname === '/') && !(pathname === '/profile-form')) {
    // Logged in
    headerLinks.push(
      <span key='user-name'>
        <NavItem
          className='!font-normal '
          href='/user-profile'
          label={
            userInfo.profile.name ?? userInfo.profile.email ?? 'User profile'
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
