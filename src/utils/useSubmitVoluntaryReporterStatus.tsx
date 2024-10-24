import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getRetries } from 'api/common';
import submitVoluntaryReporterStatus from 'api/requests/submitVoluntaryReporterStatus';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FilingPeriodType } from 'types/filingTypes';
import type {
  FormattedVoluntaryReporterStatusSchema,
  InstitutionDetailsApiType,
} from 'types/formTypes';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';

interface UseSubmitVoluntaryReporterStatusProperties {
  lei: InstitutionDetailsApiType['lei'];
  filingPeriod: FilingPeriodType;
}

interface SubmitVoluntaryReporterStatusMutationProperties {
  data: FormattedVoluntaryReporterStatusSchema;
}

const useSubmitVoluntaryReporterStatus = ({
  lei,
  filingPeriod,
}: UseSubmitVoluntaryReporterStatusProperties): UseMutationResult<
  null,
  AxiosError,
  SubmitVoluntaryReporterStatusMutationProperties
> => {
  const auth = useSblAuth();
  return useMutation<
    null,
    AxiosError,
    SubmitVoluntaryReporterStatusMutationProperties
  >({
    mutationFn: async ({
      data,
    }: SubmitVoluntaryReporterStatusMutationProperties): Promise<null> => {
      return submitVoluntaryReporterStatus(auth, { data, lei, filingPeriod });
    },

    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useSubmitVoluntaryReporterStatus;
