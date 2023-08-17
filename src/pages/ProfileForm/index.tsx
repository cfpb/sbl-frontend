import useProfileForm from "store/useProfileForm";
import Step1Form from "./Step1Form";

/**
 * Given a step, will render the proper StepForm
 * @param step : number
 * @returns StepForm component
 */
function getStepForm(step = 1): JSX.Element {
  switch (step) {
    case 1: {
      return Step1Form;
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
  const step = useProfileForm((state) => state.step);
  const StepFormComponent = getStepForm(step);

  return (<StepFormComponent />);
}

export default StepForm;

