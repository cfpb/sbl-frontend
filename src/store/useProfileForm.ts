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
    // Step 1 needed items
    enableMultiselect: false,
    isSalesforce: false,
    // Step 2 needed items
    profileData: {
      firstName: "S",
      lastName: "T",
      email: "asdf@asdf.com",
      financialInstitutions: [{
      name: "Credit Union 2",
      lei: "8E1ODLE1JLaSVoBS1Bo2",
      taxID: "58-0838387",
      agencyCode: 4
    }],
  },
    selectedScenario: Scenario.Error2,
    // setters
    setStep: (by) =>
      set((state: State) => {
        state.step = by
      }),
    setProfileData: (vObject) =>
      set((state: State) => {
        state.profileData = vObject
      }),
    setSelectedScenario: (scenario) =>
      set((state: State) => {
        state.selectedScenario = scenario
      }),
  }))
)



export default useProfileForm;