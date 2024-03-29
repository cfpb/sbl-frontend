import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType, UploadResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

interface UploadMutationProperties {
  file: File;
  lei: InstitutionDetailsApiType['lei'];
  period_code: FilingPeriodType;
}

// TODO: Address the TypeScript errors here
const useUploadMutation = (): UseMutationResult<
  UploadResponse,
  AxiosError,
  UploadMutationProperties
> => {
  const auth = useSblAuth();
  return useMutation<UploadResponse, AxiosError, UploadMutationProperties>({
    mutationFn: async ({
      file,
      lei,
      period_code,
    }: UploadMutationProperties): Promise<UploadResponse> => {
      return uploadCsvAxios(auth, file, lei, period_code);
    },
    onSuccess: data => {
      console.log('File uploaded successfully:', data);
    },
    onError: error => {
      console.log('Error Uploading file:', error);
    },
  });
};

export default useUploadMutation;
