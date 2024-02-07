/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  isSalesforce: boolean;
}

interface Actions {}

/**
 * Controls which form is rendered in ProfileForm
 */
const useAppState = create(
  immer<Actions & State>(set => ({
    isSalesforce: false,
  })),
);

export default useAppState;
