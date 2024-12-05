import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getRetries } from 'api/common';
import submitPointOfContact from 'api/requests/submitPointOfContact';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType } from 'types/filingTypes';
import type {
  FormattedPointOfContactSchema,
  InstitutionDetailsApiType,
} from 'types/formTypes';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';

interface UseSubmitPointOfContactProperties {
  lei: InstitutionDetailsApiType['lei'];
  filingPeriod: FilingPeriodType;
}

interface SubmitPointOfContactMutationProperties {
  data: FormattedPointOfContactSchema;
}

const useSubmitPointOfContact = ({
  lei,
  filingPeriod,
}: UseSubmitPointOfContactProperties): UseMutationResult<
  null,
  AxiosError,
  SubmitPointOfContactMutationProperties
> => {
  const auth = useSblAuth();
  return useMutation<null, AxiosError, SubmitPointOfContactMutationProperties>({
    mutationFn: async ({
      data,
    }: SubmitPointOfContactMutationProperties): Promise<null> => {
      return submitPointOfContact(auth, { data, lei, filingPeriod });
    },

    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useSubmitPointOfContact;
