import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { GetAssociatedApiType } from 'types/formTypes';

const fetchAssociatedInstitutions = async (
  auth: SblAuthProperties,
): Promise<GetAssociatedApiType[]> => {
  return request<GetAssociatedApiType[]>({
    url: `${BASE_URL}/v1/institutions/associated`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchAssociatedInstitutions;
