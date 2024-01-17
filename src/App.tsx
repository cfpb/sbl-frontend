/* eslint-disable @typescript-eslint/no-misused-promises */
import { useQuery } from '@tanstack/react-query';
import type { UserProfileObject } from 'api/fetchUserProfile';
import fetchUserProfile from 'api/fetchUserProfile';
import useSblAuth from 'api/useSblAuth';
import classNames from 'classnames';
import { LoadingApp, LoadingContent } from 'components/Loading';
import { Button, FooterCfGov, Link, PageHeader } from 'design-system-react';
import 'design-system-react/style.css';
import Error500 from 'pages/Error/Error500';
import { NotFound404 } from 'pages/Error/NotFound404';
import FilingApp from 'pages/Filing/FilingApp';
import ViewUserProfile from 'pages/Filing/ViewUserProfile';
import type { ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

const FilingHome = lazy(async () => import('pages/Filing/FilingHome'));
const ProfileForm = lazy(async () => import('pages/ProfileForm'));
const AuthenticatedLanding = lazy(
  async () => import('pages/AuthenticatedLanding'),
);
const InstitutionDetails = lazy(
  async () => import('pages/Filing/InstitutionDetails/'),
);
const PrivacyActNotice = lazy(async () => import('pages/Filing/PrivacyNotice'));
const PaperworkNotice = lazy(
  async () => import('pages/Filing/PaperworkNotice'),
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
  className: string;
  href: string;
  label: string;
}

function NavItem({ href, label, className }: NavItemProperties): JSX.Element {
  return (
    <Link
      {...{ href }}
      className={classNames(deriveClassname(href), className)}
    >
      {label}
    </Link>
  );
}

function BasicLayout(): ReactElement {
  const { pathname } = useLocation();
  const auth = useSblAuth();
  const headerLinks = [];

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', auth.isAuthenticated],
    queryFn: async () => auth.user,
    enabled: !!auth.isAuthenticated,
  });

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
        <Button label='LOG OUT' asLink onClick={auth.onLogout} />
      </span>,
    );
  }

  return (
    <div className='h-dvh'>
      <PageHeader links={headerLinks} />
      <Outlet />
      <FooterCfGov />
    </div>
  );
}

interface ProtectedRouteProperties {
  isAnyAuthorizationLoading: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  onLogin: () => Promise<void>;
  UserProfile: UserProfileObject;
  children: JSX.Element;
}

function ProtectedRoute({
  isAnyAuthorizationLoading,
  isAuthenticated,
  isLoading: isInitialAuthorizationLoading,
  onLogin,
  UserProfile,
  children,
}: ProtectedRouteProperties): JSX.Element | null {
  if (!isInitialAuthorizationLoading && !isAuthenticated) {
    void onLogin();
    return null;
  }

  if (isAnyAuthorizationLoading) return <LoadingContent />;

  const isUserAssociatedWithAnyInstitution =
    UserProfile.institutions.length > 0;
  if (!isUserAssociatedWithAnyInstitution)
    return <Navigate replace to='/profile-form' />;

  return children;
}

export default function App(): ReactElement {
  const auth = useSblAuth();
  const emailAddress = auth.user?.profile.email;

  const { isLoading: isFetchUserProfileLoading, data: UserProfile } = useQuery({
    queryKey: [`fetch-user-profile-${emailAddress}`, emailAddress],
    queryFn: async () => fetchUserProfile(auth),
    enabled: !!auth.isAuthenticated,
  });

  const loadingStates = [auth.isLoading, isFetchUserProfileLoading];
  const isAnyAuthorizationLoading = loadingStates.some(Boolean);
  const ProtectedRouteAuthorizations = {
    ...auth,
    UserProfile,
    isAnyAuthorizationLoading,
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingApp />}>
        <Routes>
          <Route path='/' element={<BasicLayout />}>
            <Route path='/' element={<FilingHome />} />
            <Route
              path='/filing'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <FilingApp />
                </ProtectedRoute>
              }
            />
            <Route
              path='/landing'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <AuthenticatedLanding />
                </ProtectedRoute>
              }
            />
            <Route
              path='/institution/:lei'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <InstitutionDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path='/user-profile/'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <ViewUserProfile />
                </ProtectedRoute>
              }
            />
            <Route path='/profile-form' element={<ProfileForm />} />
            <Route path='/privacy-act-notice' element={<PrivacyActNotice />} />
            <Route
              path='/paperwork-reduction-act-notice'
              element={<PaperworkNotice />}
            />
            <Route path='/500/*' element={<Error500 />} />
            <Route path='/*' element={<NotFound404 />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
