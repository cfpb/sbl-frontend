import { LoadingContent } from 'components/Loading';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useInstitutionVerifyAssociation } from 'utils/useInstitutionVerifyAssociation';

interface InstitutionProtectedRouteProperties {
  children: JSX.Element;
}

/**
 * Filing route protection
 *
 * If a user attempts to directly access a Filing step that is beyond
 * where they've progressed in the process, we redirect them to the
 * page corresponding to their "next step".
 */
export function InstitutionProtectedRoute({
  children,
}: InstitutionProtectedRouteProperties): JSX.Element {
  const {
    isAssociated,
    error: associatedInstitutionsError,
    isLoading: associatedInstitutionsLoading,
  } = useInstitutionVerifyAssociation();

  if (associatedInstitutionsLoading) return <LoadingContent />;

  if (associatedInstitutionsError)
    return (
      <Navigate
        to='/500'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        state={{ message: associatedInstitutionsError.message }}
      />
    );

  if (!isAssociated) return <Navigate to='/landing' />;

  return children;
}

export default InstitutionProtectedRoute;
