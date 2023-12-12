import type { ValidationSchema } from 'pages/ProfileForm/types';
import { Scenario } from 'pages/ProfileForm/Step2Form/Step2FormHeader.data';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  step: number,
  profileData: ValidationSchema,
  selectedScenario: Scenario
}

interface Actions {
  setStep: (qty: number) => void
}

/**
 * Controls which form is rendered in ProfileForm
 */
const useProfileForm = create(
  immer<Actions & State>((set) => ({
    step: 1,
    profileData: null,
    selectedScenario: Scenario.Warning1B,
    setStep: (by: number): void =>
      set((state: State) => {
        state.step = by
      }),
    setProfileData: (object: ValidationSchema): void =>
      set((state: State) => {
        state.profileData = object
      }),
    setSelectedScenario: (scenario: Scenario): void =>
      set((state: State) => {
        state.selectedScenario = scenario
      }),
  }))
)



export default useProfileForm;