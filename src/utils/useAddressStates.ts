import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchAddressStates from 'api/requests/fetchAddressStates';
import useSblAuth from 'api/useSblAuth';
import type { StateFetchedType } from 'types/filingTypes';
import type { FinancialInstitutionRS } from 'types/formTypes';

const formatLabelValue = (
  fetchedAddressStates: StateFetchedType[],
): FinancialInstitutionRS[] =>
  fetchedAddressStates.map(object => ({
    label: object.name,
    value: object.code,
  }));

const useAddressStates = (): UseQueryResult<FinancialInstitutionRS[]> => {
  const auth = useSblAuth();

  return useQuery({
    queryKey: [`fetch-address-states`],
    queryFn: async (): Promise<FinancialInstitutionRS[]> => {
      const fetchedAddressStates = await fetchAddressStates(auth);
      return formatLabelValue(fetchedAddressStates);
    },
  });
};

export default useAddressStates;
