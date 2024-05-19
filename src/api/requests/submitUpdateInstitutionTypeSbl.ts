import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';

export const submitUpdateInstitutionTypeSbl = async (
  auth: SblAuthProperties,
  lei: string,
  newTypes: string,
): Promise<null> => {
  return request<string, null>({
    url: `${BASE_URL}/v1/institutions/${lei}/types/sbl`,
    method: 'put',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
    data: newTypes,
  });
};

export default submitUpdateInstitutionTypeSbl;
