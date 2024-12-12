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
        state={{
          message: `${(associatedInstitutionsError as { message: string })
            ?.message}`,
        }}
      />
    );

  if (!isAssociated) return <Navigate to='/landing' />;

  return children;
}

export default InstitutionProtectedRoute;
