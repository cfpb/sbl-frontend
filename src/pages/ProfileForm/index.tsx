import { useQuery } from '@tanstack/react-query';
import { fetchInstitutions, fetchIsDomainAllowed } from 'api/requests';
import useSblAuth from 'api/useSblAuth';

import { LoadingContent } from 'components/Loading';
import { scenarios } from 'pages/Summary/Summary.data';

import { useError500 } from 'pages/Error/Error500';
import { Navigate } from 'react-router-dom';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';

function CompleteUserProfileForm(): JSX.Element | null {
  const redirect500 = useError500();

  const auth = useSblAuth();
  const { emailDomain, isLoading: authIsLoading } = auth;

  // react=query types their error as any, so we need to accept what it gives us
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any, customMessage: string): void => {
    const errorMessage = `${customMessage || 'An error has occurred'}
  
  ${
    error instanceof Error
      ? `error: ${error.toString()}\n\n trace: ${error.stack}`
      : ''
  }
  `;
    redirect500({
      message: errorMessage,
    });
    throw error;
  };

  const {
    isLoading: isFetchInstitutionsLoading,
    data: institutionsAssociatedWithUserEmailDomain,
  } = useQuery({
    queryKey: ['fetch-institutions', emailDomain],
    queryFn: async () => fetchInstitutions(auth, emailDomain),
    enabled: !!emailDomain,
    onError: error =>
      handleError(
        error,
        `Unable to fetch institutions associated with email domain: ${emailDomain}`,
      ),
  });
  const { isLoading: isEmailDomainAllowedLoading, data: isEmailDomainAllowed } =
    useQuery({
      queryKey: [`is-domain-allowed-${emailDomain}`, emailDomain],
      queryFn: async () => fetchIsDomainAllowed(auth, emailDomain),
      enabled: !!emailDomain,
      onError: error =>
        handleError(
          error,
          `Unable to fetch if email is allowed with email domain: ${emailDomain}`,
        ),
    });

  const loadingStates = [
    authIsLoading,
    isFetchInstitutionsLoading,
    isEmailDomainAllowedLoading,
  ];
  const isAnyAuthorizationLoading = loadingStates.some(Boolean);

  if (isAnyAuthorizationLoading) return <LoadingContent />;

  const isRoutingEnabled = getIsRoutingEnabled();

  /* If the email is in the `denied_domain` list (e.g. personal email addresses) */
  if (isRoutingEnabled && !isEmailDomainAllowed) {
    // TODO: This check should happen in App.ts -- top-level
    return (
      <Navigate
        replace
        to='/profile/complete/summary/deniedDomain'
        state={{ scenario: scenarios.Error1 }}
      />
    );
  }

  const isUserEmailDomainAssociatedWithAnyInstitution =
    institutionsAssociatedWithUserEmailDomain?.length &&
    institutionsAssociatedWithUserEmailDomain.length > 0;

  const isNonAssociatedEmailDomain =
    isRoutingEnabled &&
    isEmailDomainAllowed &&
    !isUserEmailDomainAssociatedWithAnyInstitution;

  /* If there is no financial institutions associated with user's email domain, use the 'Add Financial Institution' form instead */
  if (isNonAssociatedEmailDomain) {
    return <Navigate replace to='/profile/complete/no-associations' />;
  }

  return <Navigate replace to='/profile/complete/with-associations' />;
}

export default CompleteUserProfileForm;
