import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType, UploadResponse } from 'types/filingTypes';
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
  UploadResponse,
  AxiosError,
  UploadMutationProperties
> => {
  const auth = useSblAuth();
  // const queryClient = useQueryClient();
  return useMutation<UploadResponse, AxiosError, UploadMutationProperties>({
    mutationFn: async ({
      file,
    }: UploadMutationProperties): Promise<UploadResponse> => {
      return uploadCsvAxios(auth, file, lei, period_code);
    },
    onSuccess: data => {
      if (onSuccessCallback) void onSuccessCallback();
    },
    onError: error => {},
  });
};

export default useUploadMutation;
