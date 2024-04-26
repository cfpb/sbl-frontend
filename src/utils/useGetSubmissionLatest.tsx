import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchFilingSubmissionLatest from 'api/requests/fetchFilingSubmissionLatest';
import useSblAuth from 'api/useSblAuth';
import type { AxiosResponse } from 'axios';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

/* Used for checking for Validations */
const useGetSubmissionLatest = (
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
  onSettledCallback?: () => void,
  handleStartInterceptorCallback?: (
    response: AxiosResponse<SubmissionResponse>,
  ) => void,
  signal?: AbortSignal,
  // eslint-disable-next-line @typescript-eslint/max-params
): UseQueryResult<SubmissionResponse> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: ['fetch-submission-latest', lei, filingPeriod],
    queryFn: async (): Promise<SubmissionResponse> =>
      fetchFilingSubmissionLatest(
        auth,
        lei,
        filingPeriod,
        handleStartInterceptorCallback,
        signal,
      ),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    cacheTime: 0,
    staleTime: 0,
    // NOTE: Tanstack React-Query V5 cacheTime will be gcTime
    // https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5#rename-cachetime-to-gctime
    // gcTime: 0,
    onSettled: (): void => {
      if (onSettledCallback) onSettledCallback();
    },
  });
};

export default useGetSubmissionLatest;
