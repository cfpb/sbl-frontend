import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getRetries } from 'api/common';
import submitWarningsAccept from 'api/requests/submitWarningsAccept';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';

interface UseSubmitWarningsAcceptProperties {
  lei: InstitutionDetailsApiType['lei'];
  filingPeriod: FilingPeriodType;
}

interface SubmitWarningsAcceptProperties {
  submissionId: number | undefined;
}

const useSubmitWarningsAccept = ({
  lei,
  filingPeriod,
}: UseSubmitWarningsAcceptProperties): UseMutationResult<
  null,
  AxiosError,
  SubmitWarningsAcceptProperties
> => {
  const auth = useSblAuth();
  return useMutation<null, AxiosError, SubmitWarningsAcceptProperties>({
    mutationFn: async ({
      submissionId,
    }: SubmitWarningsAcceptProperties): Promise<null> => {
      if (![lei, filingPeriod, submissionId].every(Boolean))
        throw new Error('submitWarningsAccept: Missing required parameter');
      return submitWarningsAccept(auth, { submissionId, lei, filingPeriod });
    },
    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useSubmitWarningsAccept;
