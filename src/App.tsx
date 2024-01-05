/* eslint-disable @typescript-eslint/no-misused-promises */
import { useQuery } from '@tanstack/react-query';
import fetchInstitutions from 'api/fetchInstitutions';
import fetchIsDomainAllowed from 'api/fetchIsDomainAllowed';
import type { UserProfileObject } from 'api/fetchUserProfile';
import fetchUserProfile from 'api/fetchUserProfile';
import useSblAuth from 'api/useSblAuth';
import classNames from 'classnames';
import LoadingOrError from 'components/LoadingOrError';
import { Button, FooterCfGov, Link, PageHeader } from 'design-system-react';
import 'design-system-react/style.css';
import ViewUserProfile from 'pages/Filing/ViewUserProfile';
import { Scenario } from 'pages/ProfileForm/Step2Form/Step2FormHeader.data';
import type { ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import useProfileForm from 'store/useProfileForm';
import './App.less';
import { sblHelpLink } from 'utils/common';


const FilingApp = lazy(async () => import('pages/Filing/FilingApp'));
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
    <Link {...{ href }} className={classNames(deriveClassname(href), className)}>
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

  if (userInfo && !(pathname === '/')) {
    // Logged in
    headerLinks.push(
      <span key='user-name'>
        <NavItem className="!font-normal " href="/user-profile" label={
          userInfo.profile.name ?? userInfo.profile.email ?? 'User profile'
        } />
      </span>,
      <span className='a-link nav-item auth-action' key='logout'>
        <Button label='LOG OUT' asLink onClick={auth.onLogout} />
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
  institutionsAssociatedWithUserEmailDomain: string[];
  isAnyAuthorizationLoading: boolean;
  isAuthenticated: boolean;
  isEmailDomainAllowed: boolean;
  isLoading: boolean;
  onLogin: () => Promise<void>;
  UserProfile: UserProfileObject;
  children: JSX.Element;
}

function ProtectedRoute({
  institutionsAssociatedWithUserEmailDomain,
  isAnyAuthorizationLoading,
  isAuthenticated,
  isEmailDomainAllowed,
  isLoading: isInitialAuthorizationLoading,
  onLogin,
  UserProfile,
  children,
}: ProtectedRouteProperties): JSX.Element | null {
  const ProfileFormState = useProfileForm;
  if (!isInitialAuthorizationLoading && !isAuthenticated) {
    void onLogin();
    return null;
  }

  if (isAnyAuthorizationLoading) return <LoadingOrError />;

  if (!isEmailDomainAllowed) {
    ProfileFormState.setState({ selectedScenario: Scenario.Error1, step: 2 });
    return <Navigate replace to="/profile-form" />;
  }

  const isUserEmailDomainAssociatedWithAnyInstitution = institutionsAssociatedWithUserEmailDomain.length > 0;
  if (!isUserEmailDomainAssociatedWithAnyInstitution){
    // TODO: replace this generic SBL Help link with a specific Salesforce form link, see:
    // https://github.com/cfpb/sbl-frontend/issues/109
    window.location.replace(
      sblHelpLink,
    );
    return null;
  }

  const institutionsAssociatedWithUserProfile = UserProfile.institutions;
  const isUserProfileAssociatedWithAnyInstitutions = institutionsAssociatedWithUserProfile.length > 0;
  if(!isUserProfileAssociatedWithAnyInstitutions) {
    ProfileFormState.setState({ step: 1 });
    return (<Navigate replace to="/profile-form" />);
  }
  return children;
}

export default function App(): ReactElement {
  const auth = useSblAuth();
  const emailAddress = auth.user?.profile.email;

  // TODO: incorporate this into useSblAuth, see:
  // https://github.com/cfpb/sbl-frontend/issues/134
  // eslint-disable-next-line unicorn/prefer-string-slice
  const emailDomain = emailAddress?.substring(emailAddress.lastIndexOf('@')+1);

  const { isLoading: isFetchInstitutionsLoading, data: institutionsAssociatedWithUserEmailDomain } = useQuery({
    queryKey:  [`fetch-institutions-${emailDomain}`, emailDomain],
    queryFn: async () => fetchInstitutions(auth, emailDomain),
    enabled: !!emailDomain,
  });
  const { isLoading: isEmailDomainAllowedLoading, data: isEmailDomainAllowed } = useQuery({
    queryKey:  [`is-domain-allowed-${emailDomain}`, emailDomain],
    queryFn: async () => fetchIsDomainAllowed(auth, emailDomain),
    enabled: !!emailDomain,
  });
  const { isLoading: isFetchUserProfileLoading, data: UserProfile } = useQuery({
    queryKey:  [`fetch-user-profile-${emailAddress}`, emailAddress],
    queryFn: async () => fetchUserProfile(auth),
    enabled: !!auth.isAuthenticated,
  });

  const loadingStates = [
    auth.isLoading,
    isFetchInstitutionsLoading,
    isEmailDomainAllowedLoading,
    isFetchUserProfileLoading
  ];
  const isAnyAuthorizationLoading = loadingStates.some(Boolean);
  const ProtectedRouteAuthorizations = {
    ...auth,
    isEmailDomainAllowed,
    institutionsAssociatedWithUserEmailDomain,
    UserProfile,
    isAnyAuthorizationLoading
  }

  // TODO: add more comprehensive error and loading state handling, see:
  // https://github.com/cfpb/sbl-frontend/issues/108
  if (auth.isLoading) return <LoadingOrError />;

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
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
          </Route>
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
