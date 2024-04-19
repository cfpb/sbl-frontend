import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { GetAssociatedApiType } from 'types/formTypes';

const fetchAssociatedInstitutions = async (
  auth: SblAuthProperties,
): Promise<GetAssociatedApiType[]> => {
  return request({
    url: `/v1/institutions/associated`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchAssociatedInstitutions;
