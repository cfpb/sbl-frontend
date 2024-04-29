import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFiling, fetchFiling } from 'api/requests';
import fetchSubmissionLatest from 'api/requests/fetchSubmissionLatest';
import useSblAuth from 'api/useSblAuth';
import type { InstitutionDataType } from 'pages/Filing/FilingApp/InstitutionCard.types';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';

// We want these queries to consistently update in order to keep the data in sync with the backend
// TODO: Would be more efficient to use the refetch functions, but need to determine when/where to call them
const staleTime = 0;

export interface CombinedInfoType {
  error: UseQueryResult<FilingType | SubmissionResponse>['error'];
  filing: FilingType | string | undefined;
  isLoading: boolean;
  submission: Partial<SubmissionResponse> | string | undefined;
  refetchFiling?: () => Promise<FilingType>;
  refetchSubmission?: () => Promise<SubmissionResponse>;
}

/*
 * Check if a Filing/Submission exists
 *
 * API will send an empty string when a Filing/Submission
 * is not yet created.
 */
const isObjectInitialized = (
  data: FilingType | SubmissionResponse | string | undefined,
): boolean => !!data && data !== '';

/*
 * Fetch both Filing and latest Submission info.
 * Create the Filing if it does not exist.
 */
export const useFilingAndSubmissionInfo = ({
  lei,
  filingPeriod,
}: InstitutionDataType): CombinedInfoType => {
  const auth = useSblAuth();

  const existingFiling = useQuery({
    queryKey: [`fetch-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> => {
      let filing = await fetchFiling(auth, lei, filingPeriod);
      if (!isObjectInitialized(filing)) {
        filing = await createFiling(auth, lei, filingPeriod);
      }
      return filing;
    },
    staleTime,
  });

  const latestSubmission = useQuery({
    queryKey: [`fetch-submission-latest`, lei, filingPeriod],
    queryFn: async (): Promise<SubmissionResponse> =>
      fetchSubmissionLatest(auth, lei, filingPeriod),
    enabled: isObjectInitialized(existingFiling),
    staleTime,
  });

  const error = [existingFiling.error, latestSubmission.error].some(Boolean);

  const isLoading = [existingFiling.isLoading, latestSubmission.isLoading].some(
    Boolean,
  );

  return {
    error,
    filing: existingFiling,
    isLoading,
    submission: isObjectInitialized(latestSubmission.data)
      ? latestSubmission.data
      : { state: 'SUBMISSION_STARTED', refetch: latestSubmission.refetch },
    refetchFiling: existingFiling.refetch,
    refetchSubmission: latestSubmission.refetch,
  };
};
