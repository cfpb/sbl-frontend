import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchInstitutionDetails } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { Five, One, Thirty, Thousand, Two } from 'utils/constants';

/* Used for checking for Validations */
const useInstitutionDetails = (
  lei: InstitutionDetailsApiType['lei'],
): UseQueryResult<InstitutionDetailsApiType> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: [`fetch-institution`, lei],
    queryFn: async (): Promise<InstitutionDetailsApiType> =>
      fetchInstitutionDetails(auth, lei),
    retry: Five,
    retryDelay: attempt =>
      Math.min(
        attempt > One ? Two ** attempt * Thousand : Thousand,
        Thirty * Thousand,
      ),
  });
};

export default useInstitutionDetails;
