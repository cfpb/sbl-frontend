/* eslint-disable no-param-reassign */
import type { ReactElement } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  error: ReactElement | string | null;
}

interface Actions {
  setError: (value: ReactElement | string) => void;
  clearError: () => void;
}

/**
 * Tracks the latest global error
 */
const useGlobalErrorState = create(
  immer<Actions & State>(set => ({
    error: null,
    setError: (value): void =>
      set((state: State) => {
        state.error = value;
      }),
    clearError: (): void =>
      set((state: State) => {
        state.error = null;
      }),
  })),
);

export default useGlobalErrorState;
