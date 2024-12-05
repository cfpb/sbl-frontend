import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getRetries } from 'api/common';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import {
  FILE_SIZE_LIMIT_ERROR_MESSAGE,
  UPLOAD_SUBMIT_MAX_RETRIES,
} from './constants';

interface UploadMutationProperties {
  file: File;
  fileSizeTest: boolean;
}

interface UseUploadMutationProperties {
  lei: InstitutionDetailsApiType['lei'];
  period_code: FilingPeriodType;
  // onSuccessCallback?: () => Promise<QueryObserverResult<SubmissionResponse>>;
  onSuccessCallback?: (data: SubmissionResponse) => Promise<void>;
  onSettledCallback?: () => Promise<void>;
}

const useUploadMutation = ({
  lei,
  period_code,
  onSuccessCallback,
  onSettledCallback,
}: UseUploadMutationProperties): UseMutationResult<
  SubmissionResponse,
  AxiosError,
  UploadMutationProperties
> => {
  const auth = useSblAuth();
  return useMutation<SubmissionResponse, AxiosError, UploadMutationProperties>({
    mutationFn: async ({
      file,
      fileSizeTest,
    }: UploadMutationProperties): Promise<SubmissionResponse> => {
      if (fileSizeTest) throw new Error(FILE_SIZE_LIMIT_ERROR_MESSAGE);
      return uploadCsvAxios(auth, file, lei, period_code);
    },
    onSuccess: (data: SubmissionResponse) => {
      if (onSuccessCallback) void onSuccessCallback(data);
    },
    onSettled: () => {
      if (onSettledCallback) void onSettledCallback();
    },
    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useUploadMutation;
