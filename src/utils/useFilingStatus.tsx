import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchFiling from 'api/requests/fetchFiling';
import useSblAuth from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const useFilingStatus = (
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
): UseQueryResult<FilingType | string> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: [`fetch-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      fetchFiling(auth, lei, filingPeriod),
    refetchOnMount: true,
    staleTime: 0,
    cacheTime: 0,
  });
};

export default useFilingStatus;
