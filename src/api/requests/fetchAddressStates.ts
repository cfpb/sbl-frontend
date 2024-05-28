import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { StateFetchedType } from 'types/filingTypes';

export const fetchAddressStates = async (
  auth: SblAuthProperties,
): Promise<NonNullable<StateFetchedType[]>> => {
  return request<undefined, NonNullable<StateFetchedType[]>>({
    url: `/v1/institutions/address-states`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchAddressStates;
