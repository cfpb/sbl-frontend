/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  isSalesforce: boolean;
}

// Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Actions {}

/**
 * Controls which form is rendered in ProfileForm
 */
const useAppState = create(
  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  immer<Actions & State>(set => ({
    isSalesforce: false,
  })),
);

export default useAppState;
