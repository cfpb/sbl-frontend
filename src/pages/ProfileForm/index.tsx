import useProfileForm from 'store/useProfileForm';

import ProfileFormWrapper from 'components/ProfileFormWrapper';
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
function StepForm(): JSX.Element {
  const step = useProfileForm(state => state.step);
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
