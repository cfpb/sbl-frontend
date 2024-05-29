import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchFilingPeriods from 'api/requests/fetchFilingPeriods';
import useSblAuth from 'api/useSblAuth';
import type { FilingPeriodSchema } from 'types/filingTypes';

export const useFilingPeriods = (): UseQueryResult<FilingPeriodSchema[]> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: ['fetch-filing-periods'],
    queryFn: async (): Promise<FilingPeriodSchema[]> =>
      fetchFilingPeriods(auth),
  });
};

export default { useAssociatedInstitutions: useFilingPeriods };
