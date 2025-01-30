import { useQuery } from '@tanstack/react-query';
import { MarkdownText } from 'MarkdownTest';
import { fetchUserProfile } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import FooterCfGovWrapper from 'components/FooterCfGovWrapper';
import { LoadingApp, LoadingContent } from 'components/Loading';
import ScrollToTop from 'components/ScrollToTop';
import { Alert, PageHeader, SkipNav } from 'design-system-react';
import 'design-system-react/style.css';
import Error500 from 'pages/Error/Error500';
import { NotFound404 } from 'pages/Error/NotFound404';
import FileSubmission from 'pages/Filing/FilingApp/FileSubmission';
import FilingComplete from 'pages/Filing/FilingApp/FilingComplete';
import FilingDetails from 'pages/Filing/FilingApp/FilingDetails';
import FilingErrors from 'pages/Filing/FilingApp/FilingErrors';
import FilingOverview from 'pages/Filing/FilingApp/FilingOverviewPage';
import FilingProtectedRoute from 'pages/Filing/FilingApp/FilingProtectedRoute';
import FilingSubmit from 'pages/Filing/FilingApp/FilingSubmit';
import FilingWarnings from 'pages/Filing/FilingApp/FilingWarnings';
import InstitutionProtectedRoute from 'pages/Filing/FilingApp/InstitutionProtectedRoute';
import UpdateFinancialProfile from 'pages/Filing/UpdateFinancialProfile';
import ViewUserProfile from 'pages/Filing/ViewUserProfile';
import CreateProfileFormNoAssoc from 'pages/ProfileForm/CreateProfileForm';
import CreateProfileFormWAssoc from 'pages/ProfileForm/Step1Form/Step1Form';
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
import release from './constants/release.json';

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
  async () => import('pages/Filing/FilingApp/FilingCreate'),
);

// allow developers to toggle routing in development
const isRoutingEnabled = getIsRoutingEnabled();
if (import.meta.env.DEV) {
  window.toggleRouting = toggleRouting;
  window.setIsRoutingEnabled = setIsRoutingEnabled;
}
if (!isRoutingEnabled) console.warn('Routing is disabled!');

function BasicLayout(): ReactElement {
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

interface ProtectedRouteProperties {
  isAnyAuthorizationLoading: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  onLogin: () => Promise<void>;
  UserProfile: UserProfileType | undefined;
  children: JSX.Element;
}

function ProtectedRoute({
  isAnyAuthorizationLoading,
  isAuthenticated,
  isLoading: isInitialAuthorizationLoading,
  onLogin,
  UserProfile,
  children,
}: ProtectedRouteProperties): JSX.Element {
  const { pathname } = useLocation();
  const isProfileFormPath = pathname.includes('/profile/complete');

  if (!isRoutingEnabled) {
    return children;
  }

  if (!isInitialAuthorizationLoading && !isAuthenticated) {
    void onLogin();
    return <></>;
  }

  if (isAnyAuthorizationLoading) return <LoadingContent />;

  if (!UserProfile) {
    throw new Error('User Profile does not exist');
  }

  const isUserAssociatedWithAnyInstitution =
    (UserProfile?.institutions?.length ?? 0) > 0;
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
                    <ProtectedRoute {...ProtectedRouteAuthorizations}>
                      <MarkdownText />
                    </ProtectedRoute>
                  }
                />
              ) : null}
              <Route
                path='/filing/:year/:lei/create'
                element={
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
              ].map(path => (
                <Route
                  path={path}
                  element={
                    <ProtectedRoute {...ProtectedRouteAuthorizations}>
                      <InstitutionProtectedRoute>
                        <FilingProtectedRoute>
                          <FilingErrors />
                        </FilingProtectedRoute>
                      </InstitutionProtectedRoute>
                    </ProtectedRoute>
                  }
                  key={`error-route${path.replaceAll(/[/:]+/gi, '-')}`}
                />
              ))}
              <Route
                path='/filing/:year/:lei/warnings'
                element={
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
                path='/filing/:year/:lei/details'
                element={
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <InstitutionProtectedRoute>
                      <FilingProtectedRoute>
                        <FilingDetails />
                      </FilingProtectedRoute>
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/filing/:year/:lei/submit'
                element={
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
                    <InstitutionProtectedRoute>
                      <ViewInstitutionProfile />
                    </InstitutionProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/institution/:lei/update'
                element={
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
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <ViewUserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile/complete/no-associations'
                element={
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <main id='main'>
                      <CreateProfileFormNoAssoc />
                    </main>
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile/complete/with-associations'
                element={
                  <ProtectedRoute {...ProtectedRouteAuthorizations}>
                    <main id='main'>
                      <CreateProfileFormWAssoc />
                    </main>
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
                path='/institution/:lei/type'
                element={
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
