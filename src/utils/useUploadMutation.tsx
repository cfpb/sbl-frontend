import type {
  QueryObserverResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type {
  FilingPeriodType,
  SubmissionResponse,
  UploadResponse,
} from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

interface UploadMutationProperties {
  file: File;
}

interface UseUploadMutationProperties {
  lei: InstitutionDetailsApiType['lei'];
  period_code: FilingPeriodType;
  onSuccessCallback?: () => Promise<QueryObserverResult<SubmissionResponse>>;
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
      console.log('File uploaded successfully:', data);
      if (onSuccessCallback) void onSuccessCallback();
    },
    onError: error => {
      console.log('Error Uploading file:', error);
    },
  });
};

export default useUploadMutation;
