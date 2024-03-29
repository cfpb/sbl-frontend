import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType, UploadResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

interface UploadMutationProperties {
  file: File;
}

const useUploadMutation = (
  lei: InstitutionDetailsApiType['lei'],
  period_code: FilingPeriodType,
): UseMutationResult<UploadResponse, AxiosError, UploadMutationProperties> => {
  const auth = useSblAuth();
  const queryClient = useQueryClient();
  return useMutation<UploadResponse, AxiosError, UploadMutationProperties>({
    mutationFn: async ({
      file,
    }: UploadMutationProperties): Promise<UploadResponse> => {
      return uploadCsvAxios(auth, file, lei, period_code);
    },
    onSuccess: async data => {
      console.log('File uploaded successfully:', data);
      // NOTE: Forces the getSubmissionLatest request to run again
      await queryClient.invalidateQueries({
        queryKey: [`fetch-submission`, lei, period_code],
      });
    },
    onError: error => {
      console.log('Error Uploading file:', error);
    },
  });
};

export default useUploadMutation;
