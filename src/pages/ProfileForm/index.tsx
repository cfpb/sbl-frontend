import useProfileForm, { StepTwo } from 'store/useProfileForm';

import { useQuery } from '@tanstack/react-query';
import fetchInstitutions from 'api/fetchInstitutions';
import fetchIsDomainAllowed from 'api/fetchIsDomainAllowed';
import useSblAuth from 'api/useSblAuth';
import { LoadingContent } from 'components/Loading';
import ProfileFormWrapper from 'components/ProfileFormWrapper';
import { sblHelpLink } from 'utils/common';

import { useError500 } from 'pages/Error/Error500';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';
import Step1Form from './Step1Form/Step1Form';
import Step2Form from './Step2Form/Step2Form';
import { Scenario } from './Step2Form/Step2FormHeader.data';

/**
 * Given a step, will render the proper StepForm
 * @param step : number
 * @returns StepForm component
 */
function getStepForm(step = 1): () => JSX.Element {
  switch (step) {
    case 1: {
      return Step1Form;
    }
    case 2: {
      return Step2Form;
    }
    default: {
      return Step1Form;
    }
  }
}

/**
 *
 * @returns Chooses which StepForm to return based on the store value
 */
function StepForm(): JSX.Element | null {
  const ProfileFormState = useProfileForm;
  const redirect500 = useError500();

  const step = useProfileForm(state => state.step);
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
    ProfileFormState.setState({
      selectedScenario: Scenario.Error1,
      step: StepTwo,
    });
  }

  const isUserEmailDomainAssociatedWithAnyInstitution =
    institutionsAssociatedWithUserEmailDomain?.length &&
    institutionsAssociatedWithUserEmailDomain.length > 0;
  if (isRoutingEnabled && !isUserEmailDomainAssociatedWithAnyInstitution) {
    window.location.replace(sblHelpLink);
    return null;
  }

  const StepFormComponent = getStepForm(step);

  return (
    <section>
      <ProfileFormWrapper>
        <StepFormComponent />
      </ProfileFormWrapper>
    </section>
  );
}

export default StepForm;
