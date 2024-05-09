import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';

export const submitUpdateInstitutionTypeSbl = async (
  auth: SblAuthProperties,
  lei: string,
  newTypes: string,
): Promise<null> => {
  return request<string, null>({
    url: `/v1/institutions/${lei}/types/sbl`,
    method: 'put',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
    data: newTypes,
  });
};

export default submitUpdateInstitutionTypeSbl;
