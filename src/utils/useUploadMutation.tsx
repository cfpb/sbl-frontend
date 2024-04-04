import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

interface UploadMutationProperties {
  file: File;
}

interface UseUploadMutationProperties {
  lei: InstitutionDetailsApiType['lei'];
  period_code: FilingPeriodType;
  // onSuccessCallback?: () => Promise<QueryObserverResult<SubmissionResponse>>;
  onSuccessCallback?: () => Promise<void>;
}

const useUploadMutation = ({
  lei,
  period_code,
  onSuccessCallback,
}: UseUploadMutationProperties): UseMutationResult<
  SubmissionResponse,
  AxiosError,
  UploadMutationProperties
> => {
  const auth = useSblAuth();
  // const queryClient = useQueryClient();
  return useMutation<SubmissionResponse, AxiosError, UploadMutationProperties>({
    mutationFn: async ({
      file,
    }: UploadMutationProperties): Promise<SubmissionResponse> => {
      return uploadCsvAxios(auth, file, lei, period_code);
    },
    onSuccess: data => {
      if (onSuccessCallback) void onSuccessCallback();
    },
    onError: error => {},
  });
};

export default useUploadMutation;
