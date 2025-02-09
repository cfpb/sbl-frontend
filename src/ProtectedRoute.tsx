import useSblAuth from 'api/useSblAuth';
import { LoadingContent } from 'components/Loading';
import { Navigate, useLocation } from 'react-router-dom';
import type { UserProfileType } from 'types/filingTypes';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';

const isRoutingEnabled = getIsRoutingEnabled();

interface ProtectedRouteProperties {
  isLoading: boolean;
  UserProfile: UserProfileType | undefined;
  children: JSX.Element;
}

export default function ProtectedRoute({
  isLoading,
  UserProfile,
  children,
}: ProtectedRouteProperties): JSX.Element {
  const auth = useSblAuth();
  const { pathname } = useLocation();
  const isProfileFormPath = pathname.includes('/profile/complete');

  if (!isRoutingEnabled) {
    return children;
  }

  if (!auth.isLoading && !auth.isAuthenticated) {
    void auth.onLogin();
    return <></>;
  }

  if (auth.isLoading || isLoading) return <LoadingContent />;

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
