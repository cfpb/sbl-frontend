import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { submitUpdateFinancialProfile } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';

interface SubmitFinancialProfileProperties {
  financialProfileObject: Record<string, string>;
}

const useSubmitUpdateFinancialProfile = (): UseMutationResult<
  null,
  AxiosError,
  SubmitFinancialProfileProperties
> => {
  const auth = useSblAuth();
  return useMutation<null, AxiosError, SubmitFinancialProfileProperties>({
    mutationFn: async ({
      financialProfileObject,
    }: SubmitFinancialProfileProperties): Promise<null> => {
      return submitUpdateFinancialProfile(auth, financialProfileObject);
    },
    retry: UPLOAD_SUBMIT_MAX_RETRIES,
  });
};

export default useSubmitUpdateFinancialProfile;
