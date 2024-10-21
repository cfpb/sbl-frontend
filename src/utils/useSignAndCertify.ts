import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import submitSignAndCertify from 'api/requests/submitSignAndCertify';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { SignAndSubmitType } from 'types/filingTypes';
import type { UseSubmitPointOfContactProperties } from './useSubmitPointOfContact';

export const useSignAndCertify = ({
  lei,
  filingPeriod,
}: UseSubmitPointOfContactProperties): UseMutationResult<
  SignAndSubmitType,
  AxiosError,
  null
> => {
  const auth = useSblAuth();
  const queryClient = useQueryClient();

  return useMutation<SignAndSubmitType, AxiosError, null>({
    mutationFn: async (): Promise<SignAndSubmitType> => {
      return submitSignAndCertify(auth, { lei, filingPeriod });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`fetch-filing-submission`, lei, filingPeriod],
      });
    },
  });
};

export default useSignAndCertify;
