/* eslint-disable no-param-reassign */
import { Scenario } from 'pages/ProfileForm/Step2Form/Step2FormHeader.data';
import type { ValidationSchema } from 'pages/ProfileForm/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const StepOne = 1;
export const StepTwo = 2;

interface State {
  step: number;
  profileData?: ValidationSchema;
  selectedScenario: Scenario;
  enableMultiselect: boolean;
  isSalesforce: boolean;
}

interface Actions {
  setStep: (by: number) => void;
  setProfileData: (vObject: ValidationSchema) => void;
  setSelectedScenario: (scenario: Scenario) => void;
}

/**
 * Controls which form is rendered in ProfileForm
 */
const useProfileForm = create(
  immer<Actions & State>(set => ({
    step: StepOne,
    // Step 1 toggles
    enableMultiselect: false,
    isSalesforce: false,
    // Step 2 toggles
    selectedScenario: Scenario.Error1,
    // setters
    setStep: (by): void =>
      set((state: State) => {
        state.step = by;
      }),
    setProfileData: (vObject): void =>
      set((state: State) => {
        state.profileData = vObject;
      }),
    setSelectedScenario: (scenario): void =>
      set((state: State) => {
        state.selectedScenario = scenario;
      }),
  })),
);

export default useProfileForm;
