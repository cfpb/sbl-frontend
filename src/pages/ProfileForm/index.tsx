import { useQuery } from '@tanstack/react-query';
import fetchInstitutions from 'api/fetchInstitutions';
import useSblAuth from 'api/useSblAuth';
import { LoadingContent } from 'components/Loading';
import ProfileFormWrapper from 'components/ProfileFormWrapper';
import useProfileForm, { StepTwo } from 'store/useProfileForm';
import { sblHelpLink } from 'utils/common';

import fetchIsDomainAllowed from 'api/fetchIsDomainAllowed';
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
  const step = useProfileForm(state => state.step);
  const auth = useSblAuth();
  const ProfileFormState = useProfileForm;
  const { emailDomain } = auth;
  const {
    isLoading: isFetchInstitutionsLoading,
    data: institutionsAssociatedWithUserEmailDomain,
  } = useQuery({
    queryKey: [`fetch-institutions-${emailDomain}`, emailDomain],
    queryFn: async () => fetchInstitutions(auth, emailDomain),
    enabled: !!emailDomain,
  });

  const { isLoading: isEmailDomainAllowedLoading, data: isEmailDomainAllowed } =
    useQuery({
      queryKey: [`is-domain-allowed-${emailDomain}`, emailDomain],
      queryFn: async () => fetchIsDomainAllowed(auth, emailDomain),
      enabled: !!emailDomain,
    });

  const loadingStates = [
    auth.isLoading,
    isFetchInstitutionsLoading,
    isEmailDomainAllowedLoading,
  ];
  const isAnyAuthorizationLoading = loadingStates.some(Boolean);

  if (isAnyAuthorizationLoading) return <LoadingContent />;

  if (!isEmailDomainAllowed) {
    ProfileFormState.setState({
      selectedScenario: Scenario.Error1,
      step: StepTwo,
    });
  }

  const isUserEmailDomainAssociatedWithAnyInstitution =
    institutionsAssociatedWithUserEmailDomain?.length &&
    institutionsAssociatedWithUserEmailDomain.length > 0;
  if (!isUserEmailDomainAssociatedWithAnyInstitution) {
    // TODO: replace this generic SBL Help link with a specific Salesforce form link, see:
    // https://github.com/cfpb/sbl-frontend/issues/109
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
