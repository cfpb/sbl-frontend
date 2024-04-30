import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseQueryResult,
} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFiling, fetchFiling } from 'api/requests';
import fetchFilingSubmissionLatest from 'api/requests/fetchFilingSubmissionLatest';
import useSblAuth from 'api/useSblAuth';
import type { InstitutionDataType } from 'pages/Filing/FilingApp/InstitutionCard.types';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';

// We want these queries to consistently update in order to keep the data in sync with the backend
// TODO: Would be more efficient to use the refetch functions, but need to determine when/where to call them
const staleTime = 0;

interface CombinedDataType {
  filing: FilingType | string | undefined;
  submission: Partial<SubmissionResponse> | string | undefined;
}

export interface CombinedInfoType extends CombinedDataType {
  error: UseQueryResult<FilingType | SubmissionResponse>['error'];
  isLoading: boolean;
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<CombinedDataType>>;
}

/*
 * Check if a Filing/Submission exists
 *
 * API will send an empty string when a Filing/Submission
 * is not yet created.
 */
const isObjectInitialized = (
  data: FilingType | Partial<SubmissionResponse> | string | undefined,
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

  const allData = useQuery({
    queryKey: [`fetch-filing-submission`, lei, filingPeriod],
    queryFn: async (): Promise<CombinedDataType> => {
      let filingResult = await fetchFiling(auth, lei, filingPeriod);

      if (!isObjectInitialized(filingResult)) {
        filingResult = await createFiling(auth, lei, filingPeriod);
      }

      const submissionLatest = await fetchFilingSubmissionLatest(
        auth,
        lei,
        filingPeriod,
      );

      return { filing: filingResult, submission: submissionLatest };
    },
    staleTime,
  });

  const { error, isLoading, data, refetch } = allData;
  const { filing, submission } = data ?? {};

  return {
    error,
    filing,
    isLoading,
    submission: isObjectInitialized(submission)
      ? submission
      : { state: FileSubmissionState.SUBMISSION_STARTED },
    refetch,
  };
};
