import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import useSblAuth from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'utils/types';
import { createFiling } from './createFiling';

export const useCreateFiling = ({
  lei,
  filingPeriod = '2024',
  enabled = true,
}: {
  lei: string;
  filingPeriod?: FilingPeriodType;
  enabled?: boolean;
}): UseQueryResult<FilingType | string> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: [`create-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      createFiling(auth, lei, filingPeriod),
    enabled,
  });
};

export default useCreateFiling;
