import useSblAuth from 'api/useSblAuth';
import FooterCfGovWrapper from 'components/FooterCfGovWrapper';
import { Alert, PageHeader, SkipNav } from 'design-system-react';
import type { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useHeaderAuthLinks } from 'utils/useHeaderAuthLinks';

import release from './constants/release.json';

export default function BasicLayout(): ReactElement {
  const headerLinks = [...useHeaderAuthLinks()];
  const location = useLocation();
  const auth = useSblAuth();

  if (auth.error) {
    const errorMessage = auth.error.message;

    // Authentication service down
    if (errorMessage.includes('Failed to fetch')) {
      if (!location.pathname.includes('/500')) {
        return (
          <Navigate
            to='/500'
            state={{ message: 'The authentication service is unreachable.' }}
          />
        );
      }
    }
    // User's session has expired
    else if (
      errorMessage.includes("Session doesn't have required client") &&
      location.pathname !== '/'
    ) {
      void auth.onLogout();
      return <></>;
    }
  }

  return (
    <div className='flex flex-col bg-white'>
      <div>
        <SkipNav />
        {/* TODO: Move this component to the DSR for other teams' use */}
        {/* See: https://github.com/cfpb/design-system-react/issues/352 */}
        <div className='o-banner pl-[0.9375rem] pr-[0.9375rem]'>
          <div className='wrapper wrapper__match-content'>
            <Alert
              message='This is a beta for the Small Business Lending Data Filing Platform'
              status='warning'
            />
          </div>
        </div>
        <PageHeader links={headerLinks} />
        <Outlet />
      </div>
      <div>
        {/* Part of fix to the white space below the footer problem */}
        <FooterCfGovWrapper />
        <div className='mx-auto mt-[-30px] max-w-[1200px] px-[30px] pb-5'>
          {release.version}
        </div>
      </div>
    </div>
  );
}
