import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFiling } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const throwMissingParameter = (parameterName: string): void => {
  throw new Error(`[useCreateFiling] Missing required param: ${parameterName}`);
};

const useCreateFiling = (
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
): UseQueryResult<FilingType> => {
  const auth = useSblAuth();

  if (!lei) throwMissingParameter('lei');
  if (!filingPeriod) throwMissingParameter('filingPeriod');

  return useQuery({
    queryKey: [`create-filing`, lei, filingPeriod],
    queryFn: async (): Promise<FilingType> =>
      createFiling(auth, lei, filingPeriod),
  });
};

export default useCreateFiling;
