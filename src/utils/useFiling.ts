import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchFiling } from 'api/requests/fetchFiling';
import useSblAuth from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from './types';

const useFiling = (lei: string): UseQueryResult<FilingType | string> => {
  const auth = useSblAuth();
  const filingPeriod: FilingPeriodType = '2024';

  return useQuery({
    queryKey: [`fetch-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      fetchFiling(auth, lei, filingPeriod),
  });
};

export default useFiling;
