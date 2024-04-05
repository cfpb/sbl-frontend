import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import createFiling from 'api/requests/filing/createFiling';
import { fetchFiling } from 'api/requests/filing/fetchFiling';
import fetchSubmissionLatest from 'api/requests/submission/fetchSubmissionLatest';
import useSblAuth from 'api/useSblAuth';
import type { FilingType, SubmissionType } from 'utils/types';

interface CombinedInfoType {
  error: UseQueryResult<FilingType | SubmissionType>['error'];
  filing: FilingType | string | undefined;
  isLoading: boolean;
  submission: Partial<SubmissionType> | string | undefined;
}

/*
 * Check if a Filing/Submission exists
 *
 * API will send an empty string when a Filing/Submission
 * is not yet created.
 */
const isObjectInitialized = (
  data: FilingType | SubmissionType | string | undefined,
): boolean => !!data && data !== '';

/*
 * Fetch both Filing and latest Submission info.
 * Create the Filing if it does not exist.
 */
const useFilingAndSubmissionInfo = ({
  lei,
  filingPeriod,
}: {
  lei: string;
  filingPeriod: string;
}): CombinedInfoType => {
  const auth = useSblAuth();

  const existingFiling = useQuery({
    queryKey: [`fetch-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      fetchFiling(auth, lei, filingPeriod),
  });

  const createdFiling = useQuery({
    queryKey: [`create-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      createFiling(auth, lei, filingPeriod),
    enabled:
      !existingFiling.isLoading && !isObjectInitialized(existingFiling.data),
  });

  const filing = createdFiling.data ?? existingFiling.data;

  const latestSubmission = useQuery({
    queryKey: [`fetch-submission-latest`, lei, filingPeriod],
    queryFn: async (): Promise<SubmissionType> =>
      fetchSubmissionLatest(auth, lei, filingPeriod),
    enabled: isObjectInitialized(filing),
  });

  const error =
    existingFiling.error || createdFiling.error || latestSubmission.error;

  const isLoading = existingFiling.isLoading || latestSubmission.isLoading;

  return {
    error,
    filing,
    isLoading,
    submission: isObjectInitialized(latestSubmission.data)
      ? latestSubmission.data
      : { state: 'SUBMISSION_STARTED' },
  };
};

export default useFilingAndSubmissionInfo;
