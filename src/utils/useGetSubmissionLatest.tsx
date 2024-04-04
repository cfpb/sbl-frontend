import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchFilingSubmissionLatest from 'api/requests/fetchFilingSubmissionLatest';
import useSblAuth from 'api/useSblAuth';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

/* Used for checking for Validations */
const useGetSubmissionLatest = (
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
): UseQueryResult<SubmissionResponse> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: [`fetch-submission`, lei, filingPeriod],
    queryFn: async (): Promise<SubmissionResponse> =>
      fetchFilingSubmissionLatest(auth, lei, filingPeriod),
    retry: false,
    // retry: Five,
    // retryDelay: attempt =>
    //   Math.min(
    //     attempt > One ? Two ** attempt * Thousand : Thousand,
    //     Thirty * Thousand,
    //   ),
  });
};

export default useGetSubmissionLatest;
