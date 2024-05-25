import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchAddressStates from 'api/requests/fetchAddressStates';
import useSblAuth from 'api/useSblAuth';
import type { StateFetchedType } from 'types/filingTypes';
import type { FinancialInstitutionRS } from 'types/formTypes';
import { NegativeOne, One } from './constants';

const formatLabelValue = (
  fetchedAddressStates: StateFetchedType[],
): FinancialInstitutionRS[] =>
  fetchedAddressStates
    .map(stateObject => ({
      label: `${stateObject.name} (${stateObject.code})`,
      value: stateObject.code,
    }))
    // Alphabetical Sort
    .sort((a, b): number => {
      if (a.label < b.label) {
        return NegativeOne;
      }
      if (a.label > b.label) {
        return One;
      }
      return 0;
    });

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
