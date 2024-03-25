import type { StepType } from 'components/StepIndicator';
import { STEP_COMPLETE, STEP_INCOMPLETE } from 'components/StepIndicator';
import { One } from 'utils/constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  steps: StepType[];
  current: number;
}

interface Actions {
  markComplete: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const useProgressStore = create(
  immer<Actions & State>((set, get) => ({
    current: 0,
    steps: [
      { label: 'Upload file', status: STEP_INCOMPLETE },
      { label: 'Review errors', status: STEP_INCOMPLETE },
      { label: 'Resolve warnings', status: STEP_INCOMPLETE },
      { label: 'Provide point of contact', status: STEP_INCOMPLETE },
      { label: 'Sign and submit', status: STEP_INCOMPLETE },
    ],
    nextStep: (): void => set(state => ({ current: state.current + One })),
    prevStep: (): void => set(state => ({ current: state.current - One })),
    markComplete: (): void => {
      const { steps, current } = get();
      const newSteps = steps.map(step => ({ ...step }));
      newSteps[current].status = STEP_COMPLETE;
      set(() => ({ steps: newSteps }));
    },
  })),
);

export default { useProgressStore };
