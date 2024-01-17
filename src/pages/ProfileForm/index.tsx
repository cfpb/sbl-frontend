import { useQuery } from '@tanstack/react-query';
import fetchInstitutions from 'api/fetchInstitutions';
import useSblAuth from 'api/useSblAuth';
import { LoadingContent } from 'components/Loading';
import ProfileFormWrapper from 'components/ProfileFormWrapper';
import useProfileForm from 'store/useProfileForm';
import { sblHelpLink } from 'utils/common';

import Step1Form from './Step1Form/Step1Form';
import Step2Form from './Step2Form/Step2Form';

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
  const { emailDomain } = auth;
  const {
    isLoading: isFetchInstitutionsLoading,
    data: institutionsAssociatedWithUserEmailDomain,
  } = useQuery({
    queryKey: [`fetch-institutions-${emailDomain}`, emailDomain],
    queryFn: async () => fetchInstitutions(auth, emailDomain),
    enabled: !!emailDomain,
  });

  const loadingStates = [auth.isLoading, isFetchInstitutionsLoading];
  const isAnyAuthorizationLoading = loadingStates.some(Boolean);

  if (isAnyAuthorizationLoading) return <LoadingContent />;

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
