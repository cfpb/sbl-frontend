/* eslint-disable @typescript-eslint/no-misused-promises */
import { useQuery } from '@tanstack/react-query';
import type { UserProfileObject } from 'api/oidc';
import { fetchUserProfile } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import classNames from 'classnames';
import { Link } from 'components/Link';
import { LoadingApp, LoadingContent } from 'components/Loading';
import ScrollToTop from 'components/ScrollToTop';
import { FooterCfGov, PageHeader } from 'design-system-react';
import 'design-system-react/style.css';
import Error500 from 'pages/Error/Error500';
import { NotFound404 } from 'pages/Error/NotFound404';
import FileSubmission from 'pages/Filing/FilingApp/FileSubmission';
import FilingOverview from 'pages/Filing/FilingApp/FilingOverviewPage';
import UpdateFinancialProfile from 'pages/Filing/UpdateFinancialProfile';
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
import getIsRoutingEnabled, {
  setIsRoutingEnabled,
  toggleRouting,
} from 'utils/getIsRoutingEnabled';
import { useHeaderAuthLinks } from 'utils/useHeaderAuthLinks';

const FilingHome = lazy(async () => import('pages/Filing/FilingHome'));
const ProfileForm = lazy(async () => import('pages/ProfileForm'));
const AuthenticatedLanding = lazy(
  async () => import('pages/AuthenticatedLanding'),
);
const ViewInstitutionProfile = lazy(
  async () => import('pages/Filing/ViewInstitutionProfile'),
);
const PrivacyActNotice = lazy(async () => import('pages/Filing/PrivacyNotice'));
const PaperworkNotice = lazy(
  async () => import('pages/Filing/PaperworkNotice'),
);
const Summary = lazy(async () => import('pages/Summary/Summary'));
const PointOfContact = lazy(async () => import('pages/PointOfContact'));
const TypesFinancialInstitutions = lazy(
  async () => import('pages/TypesFinancialInstitutions'),
);

// allow developers to toggle routing in development
const isRoutingEnabled = getIsRoutingEnabled();
if (import.meta.env.DEV) {
  window.toggleRouting = toggleRouting;
  window.setIsRoutingEnabled = setIsRoutingEnabled;
}
// eslint-disable-next-line no-console
if (!isRoutingEnabled) console.warn('Routing is disabled!');

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

export function NavItem({
  href,
  label,
  className,
}: NavItemProperties): JSX.Element {
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
  const headerLinks = [...useHeaderAuthLinks()];

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <PageHeader links={headerLinks} />
      <Outlet />
      {/* Part of fix to the white space below the footer problem */}
      <div className='mt-auto'>
        <FooterCfGov />
      </div>
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
  const { pathname } = useLocation();
  const isProfileFormPath = pathname.includes('/profile/complete');

  if (!isRoutingEnabled) {
    return children;
  }

  if (!isInitialAuthorizationLoading && !isAuthenticated) {
    void onLogin();
    return null;
  }

  if (isAnyAuthorizationLoading) return <LoadingContent />;

  const isUserAssociatedWithAnyInstitution =
    UserProfile.institutions.length > 0;
  if (!isUserAssociatedWithAnyInstitution && !isProfileFormPath)
    return <Navigate replace to='/profile/complete' />;
  if (isProfileFormPath && isUserAssociatedWithAnyInstitution)
    return <Navigate replace to='/landing' />;
  return children;
}

export default function App(): ReactElement {
  const auth = useSblAuth();
  const {
    isAuthenticated: userIsAuthenticated,
    isLoading: isAuthLoading,
    emailAddress,
  } = auth;

  const { isLoading: isFetchUserProfileLoading, data: UserProfile } = useQuery({
    queryKey: ['fetch-user-profile', emailAddress],
    queryFn: async () => fetchUserProfile(auth),
    enabled: !!userIsAuthenticated,
  });

  const loadingStates = [isAuthLoading, isFetchUserProfileLoading];
  const isAnyAuthorizationLoading = loadingStates.some(Boolean);
  const ProtectedRouteAuthorizations = {
    ...auth,
    UserProfile,
    isAnyAuthorizationLoading,
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingApp />}>
        <Routes>
          <Route path='/' element={<BasicLayout />}>
            <Route path='/' element={<FilingHome />} />
            <Route
              path='/filing/:year/:lei/upload'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <FileSubmission />
                </ProtectedRoute>
              }
            />
            <Route
              path='/filing'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <FilingOverview />
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
                  <ViewInstitutionProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/institution/:lei/update'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <UpdateFinancialProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/view'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <ViewUserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/complete'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <ProfileForm />
                </ProtectedRoute>
              }
            />
            <Route
              path='/update-financial-profile'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <UpdateFinancialProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/point-of-contact'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <PointOfContact />
                </ProtectedRoute>
              }
            />
            <Route
              path='/types-financial-institutions'
              element={
                <ProtectedRoute {...ProtectedRouteAuthorizations}>
                  <TypesFinancialInstitutions />
                </ProtectedRoute>
              }
            />
            <Route path='/privacy-act-notice' element={<PrivacyActNotice />} />
            <Route
              path='/paperwork-reduction-act-notice'
              element={<PaperworkNotice />}
            />
            <Route path='/summary' element={<Summary />} />
            <Route path='/500/*' element={<Error500 />} />
            {/* TODO: Remove /loading route once testing is complete */}
            <Route path='/loading' element={<LoadingContent />} />
            <Route path='/*' element={<NotFound404 />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
