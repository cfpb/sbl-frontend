import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchFiling } from 'api/requests/filing/fetchFiling';
import useSblAuth from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from '../../../utils/types';

const useFetchFiling = (
  lei: string,
  filingPeriod: FilingPeriodType,
): UseQueryResult<FilingType | string> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: [`fetch-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      fetchFiling(auth, lei, filingPeriod),
  });
};

export default useFetchFiling;
