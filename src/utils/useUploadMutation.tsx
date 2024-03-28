import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';

// { mutate, isLoading, isError, error, data }

interface UploadMutationProperties {
  file: File;
  lei: string;
  period_code: string;
}

const useUploadMutation = () => {
  const auth = useSblAuth();
  return useMutation({
    mutationFn: async ({
      file,
      lei,
      period_code,
    }: UploadMutationProperties): Promise<any> =>
      uploadCsvAxios(auth, file, lei, period_code),
    onSuccess: data => {
      console.log('File uploaded successfully:', data);
    },
    onError: error => {
      console.log('Error Uploading file:', error);
    },
  });
};

export default useUploadMutation;
