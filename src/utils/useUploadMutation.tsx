import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingType } from 'types/filingTypes';

interface UploadMutationProperties {
  file: File;
  lei: string;
  period_code: string;
}

// TODO: Address the TypeScript errors here
const useUploadMutation = (): UseMutationResult<
  FilingType,
  AxiosError,
  UploadMutationProperties
> => {
  const auth = useSblAuth();
  return useMutation<FilingType, AxiosError, UploadMutationProperties>({
    mutationFn: async ({
      file,
      lei,
      period_code,
    }: UploadMutationProperties): Promise<FilingType> => {
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
