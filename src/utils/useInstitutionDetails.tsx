import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchInstitutionDetails } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import {
  CACHE_TIME,
  Five,
  One,
  STANDARD_TIMEOUT,
  Thirty,
  Two,
} from 'utils/constants';

/* Used for checking for Validations */
const useInstitutionDetails = (
  lei: InstitutionDetailsApiType['lei'],
): UseQueryResult<InstitutionDetailsApiType> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: [`fetch-institution`, lei],
    queryFn: async (): Promise<InstitutionDetailsApiType> =>
      fetchInstitutionDetails(auth, lei),
    staleTime: CACHE_TIME, // 10 minutes - Institution details do not change often
    cacheTime: CACHE_TIME,
    retry: Five,
    retryDelay: attempt =>
      Math.min(
        attempt > One ? Two ** attempt * STANDARD_TIMEOUT : STANDARD_TIMEOUT,
        Thirty * STANDARD_TIMEOUT,
      ),
  });
};

export default useInstitutionDetails;
