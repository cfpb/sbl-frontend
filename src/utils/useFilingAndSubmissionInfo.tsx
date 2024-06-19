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
// const staleTime = 0;

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
 * To create the Filing if it does not exist, set the `shouldCreateFiling` flag
 */
export const useFilingAndSubmissionInfo = ({
  lei,
  filingPeriod,
  shouldCreateFiling = false,
}: InstitutionDataType & {
  shouldCreateFiling?: boolean;
}): CombinedInfoType => {
  const auth = useSblAuth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allData = useQuery({
    queryKey: [`fetch-filing-submission`, lei, filingPeriod],
    queryFn: async (): Promise<CombinedDataType> => {
      // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      let filingResult = await fetchFiling(auth, lei, filingPeriod);

      if (shouldCreateFiling && !isObjectInitialized(filingResult)) {
        // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
        filingResult = await createFiling(auth, lei, filingPeriod);
      }

      // Submissions only exist if a Filing exists
      const submissionLatest = isObjectInitialized(filingResult)
        ? await fetchFilingSubmissionLatest({
            auth,
            // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
            lei,
            // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
            filingPeriod,
          })
        : undefined;

      return { filing: filingResult, submission: submissionLatest };
    },
    // staleTime,
  });

  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { error, isLoading, data, refetch } = allData;
  const { filing, submission } = data ?? {};

  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  return {
    error,
    filing,
    isLoading,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    submission: isObjectInitialized(submission)
      ? submission
      : { state: FileSubmissionState.SUBMISSION_STARTED },
    refetch,
  };
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
};
