import type { ValidationSchema } from 'pages/ProfileForm/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
interface ProfileData {
  
}
interface State {
  step: number,
  profileData: ValidationSchema
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
    setStep: (by: number): void =>
      set((state: State) => {
        state.step = by
      }),
    setProfileData: (obj: ValidationSchema): void =>
      set((state: State) => {
        state.profileData = obj
      }),
  }))
)



export default useProfileForm;