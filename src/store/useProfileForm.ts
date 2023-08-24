import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  step: number
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
    setStep: (by: number): void =>
      set((state) => {
        state.step = by
      }),
  }))
)



export default useProfileForm;