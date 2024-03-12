import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import useSblAuth from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/ProfileForm/types';

import { fetchFilingSubmissionLatest } from './fetchFilingSubmissionLatest';
import type { FilingPeriodType } from './types';

// TODO: Replace return type using InstitutionDetailsApiType with actual Filing status schema
const useFilingStatus = (
  institution: InstitutionDetailsApiType,
): UseQueryResult<InstitutionDetailsApiType | string> => {
  const auth = useSblAuth();
  const filingPeriod: FilingPeriodType = '2024';

  return useQuery({
    queryKey: [`fetch-filing-status-latest`, institution.lei, filingPeriod],
    queryFn: async (): Promise<InstitutionDetailsApiType[]> =>
      fetchFilingSubmissionLatest(auth, institution, filingPeriod),
  });
};

export default useFilingStatus;
