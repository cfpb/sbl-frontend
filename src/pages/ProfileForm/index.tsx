import CreateProfileForm from 'pages/ProfileForm/CreateProfileForm';
import Step1Form from 'pages/ProfileForm/Step1Form/Step1Form';

import { useQuery } from '@tanstack/react-query';
import { fetchInstitutions, fetchIsDomainAllowed } from 'api/requests';
import useSblAuth from 'api/useSblAuth';

import { LoadingContent } from 'components/Loading';
import Summary from 'pages/Summary/Summary';
import { Scenario } from 'pages/Summary/Summary.data';

import { useError500 } from 'pages/Error/Error500';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';

function CompleteUserProfileForm(): JSX.Element | null {
  let isCompleteForm = true;

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
    queryKey: [`fetch-institutions-${emailDomain}`, emailDomain],
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

  if (isRoutingEnabled && !isEmailDomainAllowed) {
    return <Summary scenario={Scenario.Error1} />;
  }

  const isUserEmailDomainAssociatedWithAnyInstitution =
    institutionsAssociatedWithUserEmailDomain?.length &&
    institutionsAssociatedWithUserEmailDomain.length > 0;

  if (
    isRoutingEnabled &&
    isEmailDomainAllowed &&
    !isUserEmailDomainAssociatedWithAnyInstitution
  ) {
    isCompleteForm = false;
  }

  const UserProfileForm = isCompleteForm ? Step1Form : CreateProfileForm;

  return (
    <section>
      <UserProfileForm />
    </section>
  );
}

export default CompleteUserProfileForm;
