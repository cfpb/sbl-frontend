/* eslint-disable @typescript-eslint/no-misused-promises */
import { useQuery } from '@tanstack/react-query';
import { MarkdownText } from 'MarkdownTest';
import { fetchUserProfile } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import classNames from 'classnames';
import FooterCfGovWrapper from 'components/FooterCfGovWrapper';
import { Link } from 'components/Link';
import { LoadingApp, LoadingContent } from 'components/Loading';
import ScrollToTop from 'components/ScrollToTop';
import { Alert, PageHeader, SkipNav } from 'design-system-react';
import 'design-system-react/style.css';
import Error500 from 'pages/Error/Error500';
import { NotFound404 } from 'pages/Error/NotFound404';
import FileSubmission from 'pages/Filing/FilingApp/FileSubmission';
import FilingComplete from 'pages/Filing/FilingApp/FilingComplete';
import FilingContact from 'pages/Filing/FilingApp/FilingContact';
import FilingErrors from 'pages/Filing/FilingApp/FilingErrors';
import FilingOverview from 'pages/Filing/FilingApp/FilingOverviewPage';
import FilingProtectedRoute from 'pages/Filing/FilingApp/FilingProtectedRoute';
import FilingSubmit from 'pages/Filing/FilingApp/FilingSubmit';
import FilingWarnings from 'pages/Filing/FilingApp/FilingWarnings';
import InstitutionProtectedRoute from 'pages/Filing/FilingApp/InstitutionProtectedRoute';
import UpdateFinancialProfile from 'pages/Filing/UpdateFinancialProfile';
import ViewUserProfile from 'pages/Filing/ViewUserProfile';
import { SummaryRoutesList } from 'pages/Summary/SummaryRoutes';
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
import type { UserProfileType } from 'types/filingTypes';
import getIsRoutingEnabled, {
  setIsRoutingEnabled,
  toggleRouting,
} from 'utils/getIsRoutingEnabled';
import { useHeaderAuthLinks } from 'utils/useHeaderAuthLinks';

import ErrorFallback from 'ErrorFallback';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ErrorBoundary } from 'react-error-boundary';

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
const TypesFinancialInstitutions = lazy(
  async () => import('pages/TypesFinancialInstitutions'),
);
const FilingCreate = lazy(
  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  async () => import('pages/Filing/FilingApp/FilingCreate'),
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

function BasicLayout(): Promise<void> | ReactElement {
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
      return auth.onLogout();
    }
  }

  return (
    <div className='flex flex-col bg-white'>
      <div>
        <SkipNav />
        {/* TODO: Move this component to the DSR for other teams' use */}
        {/* See: https://github.com/cfpb/design-system-react/issues/352 */}
        <div className='o-banner'>
          <div className='wrapper wrapper__match-content'>
            <Alert
              message='This is a beta for the small business lending data submission platform'
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
      </div>
    </div>
  );
}

interface ProtectedRouteProperties {
  isAnyAuthorizationLoading: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  onLogin: () => Promise<void>;
  UserProfile: UserProfileType;
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ScrollToTop />
        <Suspense fallback={<LoadingApp />}>
          <Routes>
            <Route path='/' element={<BasicLayout />}>
              <Route path='/' element={<FilingHome />} />
              {import.meta.env.DEV ? (
                <Route
                  path='/markdown'
                  element={
                    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                    <ProtectedRoute {...ProtectedRouteAuthorizations}>
                      <MarkdownText />
                    </ProtectedRoute>
                  }
                />
              ) : null}
              <Route
                path='/filing/:year/:lei/create'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <FilingCreate />
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/filing/:year/:lei/upload'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <FilingProtectedRoute>
                        <FileSubmission />
                      </FilingProtectedRoute>
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              {[
                '/filing/:year/:lei/errors',
                '/filing/:year/:lei/errors/errors-syntax',
                '/filing/:year/:lei/errors/errors-logic',
              ].map((path, index) => (
                <Route
                  path={path}
                  element={
                    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                    <ProtectedRoute {...ProtectedRouteAuthorizations}>
                      <InstitutionProtectedRoute>
                        <FilingProtectedRoute>
                          <FilingErrors />
                        </FilingProtectedRoute>
                      </InstitutionProtectedRoute>
                    </ProtectedRoute>
                  }
                  key={index}
                />
              ))}
              <Route
                path='/filing/:year/:lei/warnings'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <FilingProtectedRoute>
                        <FilingWarnings />
                      </FilingProtectedRoute>
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/filing/:year/:lei/contact'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <FilingProtectedRoute>
                        <FilingContact />
                      </FilingProtectedRoute>
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/filing/:year/:lei/submit'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <FilingProtectedRoute>
                        <FilingSubmit />
                      </FilingProtectedRoute>
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/filing/:year/:lei/done'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <FilingProtectedRoute>
                        <FilingComplete />
                      </FilingProtectedRoute>
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/filing'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <FilingOverview />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/landing'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <AuthenticatedLanding />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/institution/:lei'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <ViewInstitutionProfile />
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/institution/:lei/update'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <UpdateFinancialProfile />
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile/view'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <ViewUserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile/complete'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <ProfileForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/update-financial-profile'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <UpdateFinancialProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/institution/:lei/type'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <TypesFinancialInstitutions />
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/institution/:lei/type/:year'
                element={
                  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <TypesFinancialInstitutions />
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route path='/privacy-notice' element={<PrivacyActNotice />} />
              <Route
                path='/paperwork-reduction-act-notice'
                element={<PaperworkNotice />}
              />
              {SummaryRoutesList.map(path => {
                return (
                  <Route
                    key={path}
                    path={path}
                    element={<Summary UserProfile={UserProfile} />}
                  />
                );
              })}
              <Route path='/500/*' element={<Error500 />} />
              {/* TODO: Remove /loading route once testing is complete */}
              <Route path='/loading' element={<LoadingContent />} />
              <Route path='/*' element={<NotFound404 />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
