import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFiling, fetchFiling } from 'api/requests';
import fetchSubmissionLatest from 'api/requests/fetchSubmissionLatest';
import useSblAuth from 'api/useSblAuth';
import type { InstitutionDataType } from 'pages/Filing/FilingApp/InstitutionCard.types';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';

// We want these queries to consistently update in order to keep the data in sync with the backend
// TODO: Would be more efficient to use the refetch functions, but need to determine when/where to call them
const staleTime = 5000; // 5 seconds

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
    queryFn: async (): Promise<FilingType> =>
      fetchFiling(auth, lei, filingPeriod),
    staleTime,
  });

  const createdFiling = useQuery({
    queryKey: [`create-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      createFiling(auth, lei, filingPeriod),
    enabled:
      !existingFiling.isLoading && !isObjectInitialized(existingFiling.data),
    staleTime,
  });

  const filing = createdFiling.data ?? existingFiling.data;

  const latestSubmission = useQuery({
    queryKey: [`fetch-submission-latest`, lei, filingPeriod],
    queryFn: async (): Promise<SubmissionResponse> =>
      fetchSubmissionLatest(auth, lei, filingPeriod),
    enabled: isObjectInitialized(filing),
    staleTime,
  });

  const error =
    existingFiling.error || createdFiling.error || latestSubmission.error;

  const isLoading =
    existingFiling.isLoading ||
    (createdFiling.isLoading && createdFiling.isFetching) ||
    latestSubmission.isLoading;

  return {
    error,
    filing,
    isLoading,
    submission: isObjectInitialized(latestSubmission.data)
      ? latestSubmission.data
      : { state: 'SUBMISSION_STARTED', refetch: latestSubmission.refetch },
    refetchFiling: existingFiling.refetch,
    refetchSubmission: latestSubmission.refetch,
  };
};
