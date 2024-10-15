import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { getRetries } from 'api/common';
import { submitUserProfileFi } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { ValidationSchemaCPF } from 'types/formTypes';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';

interface SubmitUserProfileFiProperties {
  formFieldsObject: ValidationSchemaCPF;
}

const useSubmitUserProfileFi = (): UseMutationResult<
  null,
  AxiosError,
  SubmitUserProfileFiProperties
> => {
  const auth = useSblAuth();

  return useMutation<null, AxiosError, SubmitUserProfileFiProperties>({
    mutationFn: async ({
      formFieldsObject,
    }: SubmitUserProfileFiProperties): Promise<null> => {
      return submitUserProfileFi(auth, formFieldsObject);
    },
    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useSubmitUserProfileFi;
