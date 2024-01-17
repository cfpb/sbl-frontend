/* eslint-disable @typescript-eslint/no-misused-promises */
import { useQuery } from '@tanstack/react-query';
import fetchIsDomainAllowed from 'api/fetchIsDomainAllowed';
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
import { Scenario } from 'pages/ProfileForm/Step2Form/Step2FormHeader.data';
import type { ReactElement } from 'react';
import { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  NavLink as RouterNavLink,
  Routes,
  useLocation,
} from 'react-router-dom';
import useProfileForm, { StepTwo } from 'store/useProfileForm';
import { One } from 'utils/constants';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
      <RouterNavLink to={href}>{label}</RouterNavLink>
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
  isEmailDomainAllowed: boolean;
  isLoading: boolean;
  onLogin: () => Promise<void>;
  UserProfile: UserProfileObject;
  children: JSX.Element;
}

function ProtectedRoute({
  isAnyAuthorizationLoading,
  isAuthenticated,
  isLoading: isInitialAuthorizationLoading,
  isEmailDomainAllowed,
  onLogin,
  UserProfile,
  children,
}: ProtectedRouteProperties): JSX.Element | null {
  const ProfileFormState = useProfileForm;
  if (!isInitialAuthorizationLoading && !isAuthenticated) {
    void onLogin();
    return null;
  }

  if (isAnyAuthorizationLoading) return <LoadingContent />;

  if (!isEmailDomainAllowed) {
    ProfileFormState.setState({
      selectedScenario: Scenario.Error1,
      step: StepTwo,
    });

    return <Navigate replace to='/profile-form' />;
  }

  const isUserAssociatedWithAnyInstitution =
    UserProfile.institutions.length > 0;
  if (!isUserAssociatedWithAnyInstitution)
    return <Navigate replace to='/profile-form' />;

  return children;
}

export default function App(): ReactElement {
  const auth = useSblAuth();
  const emailAddress = auth.user?.profile.email;
  const emailDomain = emailAddress?.slice(
    Math.max(0, emailAddress.lastIndexOf('@') + One),
  );

  const { isLoading: isFetchUserProfileLoading, data: UserProfile } = useQuery({
    queryKey: [`fetch-user-profile-${emailAddress}`, emailAddress],
    queryFn: async () => fetchUserProfile(auth),
    enabled: !!auth.isAuthenticated,
  });

  const { isLoading: isEmailDomainAllowedLoading, data: isEmailDomainAllowed } =
    useQuery({
      queryKey: [`is-domain-allowed-${emailDomain}`, emailDomain],
      queryFn: async () => fetchIsDomainAllowed(auth, emailDomain),
      enabled: !!emailDomain,
    });

  const loadingStates = [
    auth.isLoading,
    isFetchUserProfileLoading,
    isEmailDomainAllowedLoading,
  ];
  const isAnyAuthorizationLoading = loadingStates.some(Boolean);
  const ProtectedRouteAuthorizations = {
    ...auth,
    UserProfile,
    isAnyAuthorizationLoading,
    isEmailDomainAllowed,
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
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
