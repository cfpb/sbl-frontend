import { create } from 'zustand'

// Initialize the store and define actions
export const useToggleStore = create((set) => ({
  clicked: false,

  // Action that derives new value from existing state
  toggle: () => set((state) => ({ clicked: !state.clicked })),

  // Action that sets state based on a provide value, 
  // so we see that Zustand is not restricted to operating as a state machine
  set: (newValue) => set(() => ({ clicked: newValue}))
}))

export default useToggleStore