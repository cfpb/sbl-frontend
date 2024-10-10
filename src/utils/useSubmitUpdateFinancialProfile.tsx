import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getRetries } from 'api/common';
import { submitUpdateFinancialProfile } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';

interface SubmitUpdateFinancialProfileProperties {
  financialProfileObject: Record<string, string>;
}

const useSubmitUpdateFinancialProfile = (): UseMutationResult<
  null,
  AxiosError,
  SubmitUpdateFinancialProfileProperties
> => {
  const auth = useSblAuth();
  return useMutation<null, AxiosError, SubmitUpdateFinancialProfileProperties>({
    mutationFn: async ({
      financialProfileObject,
    }: SubmitUpdateFinancialProfileProperties): Promise<null> => {
      return submitUpdateFinancialProfile(auth, financialProfileObject);
    },
    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useSubmitUpdateFinancialProfile;
