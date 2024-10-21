import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { getRetries } from 'api/common';
import submitSignAndCertify from 'api/requests/submitSignAndCertify';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { SignAndSubmitType } from 'types/filingTypes';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';
import type { UseSubmitPointOfContactProperties } from './useSubmitPointOfContact';

const useSubmitUserProfile = ({
  lei,
  filingPeriod,
}: UseSubmitPointOfContactProperties): UseMutationResult<
  null,
  AxiosError,
  SignAndSubmitType
> => {
  const auth = useSblAuth();
  // const queryClient = useQueryClient();

  return useMutation<null, AxiosError, SignAndSubmitType>({
    mutationFn: async (): Promise<SignAndSubmitType> => {
      return submitSignAndCertify(auth, { lei, filingPeriod });
    },
    onSuccess: async () => {
      // await auth.signinSilent();
      // cache busting
      // await queryClient.invalidateQueries({
      //   queryKey: ['fetch-associated-institutions', email],
      // });
      // await queryClient.invalidateQueries({
      //   queryKey: ['fetch-user-profile', email],
      // });
    },
    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useSubmitUserProfile;
