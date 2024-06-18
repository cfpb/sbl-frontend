import { LoadingContent } from 'components/Loading';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useInstitutionVerifyAssociation } from 'utils/useInstitutionVerifyAssociation';

interface InstitutionProtectedRouteProperties {
  children: JSX.Element;
}

/**
 * Institution route protection
 *
 * Ensure a user is associated with the Institution they are trying to access.
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
