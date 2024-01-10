import type { ValidationSchema } from 'pages/ProfileForm/types';
import { Scenario } from 'pages/ProfileForm/Step2Form/Step2FormHeader.data';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  step: number,
  profileData: ValidationSchema,
  selectedScenario: Scenario,
  step: number,
  enableMultiselect: boolean,
  isSalesforce: boolean,
}

interface Actions {
  setStep: (by: number) => void,
  setProfileData: (vObject: ValidationSchema) => void,
  setSelectedScenario: (scenario: Scenario) => void
}

/**
 * Controls which form is rendered in ProfileForm
 */
const useProfileForm = create(
  immer<Actions & State>((set) => ({
    step: 1,
    // Step 1 toggles
    enableMultiselect: false,
    isSalesforce: false,
    // Step 2 toggles
    selectedScenario: Scenario.Error1,
    // setters
    setStep: (by): void =>
      set((state: State) => {
        state.step = by
      }),
    setProfileData: (vObject): void =>
      set((state: State) => {
        state.profileData = vObject
      }),
    setSelectedScenario: (scenario): void =>
      set((state: State) => {
        state.selectedScenario = scenario
      }),
  }))
)



export default useProfileForm;