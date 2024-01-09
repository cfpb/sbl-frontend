import type { ValidationSchema } from 'pages/ProfileForm/types';
import { Scenario } from 'pages/ProfileForm/Step2Form/Step2FormHeader.data';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  step: number;
  profileData: ValidationSchema;
  selectedScenario: Scenario;
  enableMultiselect: boolean;
}

/**
 * Controls which form is rendered in ProfileForm
 */
const useProfileForm = create(
  immer<State>(set => ({
    step: 1,
    // Step 1 toggles
    enableMultiselect: false,
    // Step 2 toggles
    selectedScenario: Scenario.Error1,
  })),
);

export default useProfileForm;
