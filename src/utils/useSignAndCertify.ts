import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { analyticsLog, analyticsSendEvent } from '@cfpb/cfpb-analytics';
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
      // Forces refetch of filing and submission objects on '/Submit' page
      await queryClient.invalidateQueries({
        queryKey: [`fetch-filing-submission`, lei, filingPeriod],
      });
      console.log('sending test analytics event');
      analyticsSendEvent({
        event: 'Filing Flow Events',
        action: 'Successfully submitted filing',
        label: lei,
      });
      analyticsLog('Log: event logged for successfully submitting filing');
    },
  });
};

export default useSignAndCertify;
