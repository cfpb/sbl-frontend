import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchFilingSubmissionLatest from 'api/requests/fetchFilingSubmissionLatest';
import useSblAuth from 'api/useSblAuth';
import type { AxiosResponse } from 'axios';
import { useEffect, useMemo } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/max-params
): UseQueryResult<SubmissionResponse> => {
  // NOTE: Allows request cancellation upon component unmount
  const abortController = useMemo(() => new AbortController(), []);
  // const queryClient = useQueryClient();
  const { signal } = abortController;

  useEffect(() => {
    return () => {
      abortController.abort();
      // queryClient.resetQueries([`fetch-submission`, lei, filingPeriod]);
    };
  }, []);

  const auth = useSblAuth();

  return useQuery({
    queryKey: [`fetch-submission`, lei, filingPeriod],
    queryFn: async (): Promise<SubmissionResponse> =>
      fetchFilingSubmissionLatest(
        signal,
        auth,
        lei,
        filingPeriod,
        handleStartInterceptorCallback,
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    cacheTime: 0,
    staleTime: Number.POSITIVE_INFINITY,
    onSettled: (): void => {
      if (onSettledCallback) onSettledCallback();
    },
  });
};

export default useGetSubmissionLatest;
