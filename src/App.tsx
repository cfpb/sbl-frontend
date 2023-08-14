import { useQuery } from '@tanstack/react-query';
import useSblAuth from 'api/useSblAuth';
import LoadingOrError from 'components/LoadingOrError';
import { Button, FooterCfGov, Link, PageHeader } from 'design-stories';
import 'design-stories/style.css';
import FilingApp from 'pages/Filing/FilingApp';
import FilingHome from 'pages/Filing/FilingHome';
import ProfileForm from 'pages/ProfileForm/ProfileForm';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';

/**
 * Determine if the current provided URL (href) is the current page
 * @param href string
 * @returns string
 */
const deriveClassname = (href: string): string => {
  let cname = 'nav-item';
  let pattern = `${href}`;
  if (href === '/') pattern += '$';

  const regex = new RegExp(pattern);
  if (regex.test(window.location.href)) {
    cname += ' selected';
  }

  return cname;
};

interface NavItemProperties {
  label: string;
  href: string;
}

function NavItem({ href, label }: NavItemProperties): JSX.Element {
  return (
    <Link {...{ href }} className={deriveClassname(href)}>
      {label}
    </Link>
  );
}

function BasicLayout(): ReactElement {
  const headerLinks = [
    <NavItem key='home' href='/' label='HOME' />,
    <NavItem key='filing' href='/filing' label='FILING' />,
    <NavItem key='profile-form' href='/profile-form' label='PROFILE FORM' />
  ];

  const auth = useSblAuth();

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', auth.isAuthenticated],
    queryFn: async () => auth.user,
    enabled: !!auth.isAuthenticated
  });

  if (userInfo) {
    // Logged in
    headerLinks.push(
      <span className='nav-item' key='user-name'>
        {userInfo.profile.name}
      </span>,
      <span className='a-link nav-item auth-action' key='logout'>
        <Button label='LOGOUT' asLink onClick={auth.onLogout} />
      </span>
    );
  } else {
    // Logged out
    headerLinks.push(
      <span className='a-link nav-item auth-action' key='login'>
        <Button label='LOGIN' asLink onClick={auth.onLogin} />
      </span>
    );
  }

  return (
    <>
      <PageHeader links={headerLinks} />
      <Outlet />
      <FooterCfGov />
    </>
  );
}

export default function App(): ReactElement {
  const auth = useSblAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Routes>
          <Route path='/' element={<BasicLayout />}>
            <Route index element={<Navigate to='/filing' />} />
          </Route>
          <Route path='/filing' element={<BasicLayout />}>
            <Route
              index
              element={auth.isAuthenticated ? <FilingApp /> : <FilingHome />}
            />
          </Route>
           <Route path='/profile-form' element={<ProfileForm />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
