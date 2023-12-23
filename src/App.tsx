/* eslint-disable @typescript-eslint/no-misused-promises */
import { useQuery } from '@tanstack/react-query';
import useSblAuth from 'api/useSblAuth';
import LoadingOrError from 'components/LoadingOrError';
import { Button, FooterCfGov, Link, PageHeader } from 'design-system-react';
import 'design-system-react/style.css';
import type { ReactElement, ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

const FilingApp = lazy(async () => import('pages/Filing/FilingApp'));
const FilingHome = lazy(async () => import('pages/Filing/FilingHome'));
const ProfileForm = lazy(async () => import('pages/ProfileForm'));
const AuthenticatedLanding = lazy(
  async () => import('pages/AuthenticatedLanding')
);
const InstitutionDetails = lazy(
  async () => import('pages/Filing/InstitutionDetails/')
);

/**
 * Determine if the current provided URL (href) is the current page
 * @param href string
 * @returns string
 */
const deriveClassname = (href: string): string => {
  let cname = 'nav-item';
  const pattern = `${href}$`;

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
    <NavItem key='profile-form' href='/profile-form' label='PROFILE FORM' />,
    <NavItem
      key='institution-details'
      href='/institution/TESTBANK123'
      label='INSTITUTION DETAILS'
    />,
  ];

  const auth = useSblAuth();

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', auth.isAuthenticated],
    queryFn: async () => auth.user,
    enabled: !!auth.isAuthenticated,
  });

  if (userInfo) {
    // Logged in
    headerLinks.push(
      <span className='nav-item' key='user-name'>
        {userInfo.profile.name}
      </span>,
      <span className='a-link nav-item auth-action' key='logout'>
        <Button label='LOGOUT' asLink onClick={auth.onLogout} />
      </span>,
    );
  } else {
    // Logged out
    headerLinks.push(
      <span className='a-link nav-item auth-action' key='login'>
        <Button label='LOGIN' asLink onClick={auth.onLogin} />
      </span>,
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

interface ProtectedRouteProperties {
  isAuthenticated: boolean;
  children: ReactNode;
  onLogin: () => Promise<void>;
}

function ProtectedRoute({
  isAuthenticated,
  onLogin,
  children,
}: ProtectedRouteProperties): Promise<void> | ReactNode {
  if (!isAuthenticated) return onLogin();
  return children;
}

export default function App(): ReactElement {
  const auth = useSblAuth();

  if (auth.isLoading) {
    return <>Loading Auth...</>;
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Routes>
          <Route path='/' element={<BasicLayout />}>
            <Route path='/' element={<FilingHome />} />
            <Route
              path='/filing'
              element={
                <ProtectedRoute {...auth}>
                  <FilingApp />
                </ProtectedRoute>
              }
            />
            <Route
              path='/landing'
              element={
                <ProtectedRoute {...auth}>
                  <AuthenticatedLanding />
                </ProtectedRoute>
              }
            />
            <Route
              path='/institution/:lei'
              element={
                <ProtectedRoute {...auth}>
                  <InstitutionDetails />
                </ProtectedRoute>
              }
            />
            <Route path='/profile-form' element={<ProfileForm />} />
          </Route>
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
