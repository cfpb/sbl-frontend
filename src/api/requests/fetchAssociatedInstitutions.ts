import { request, userFiApiClient } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { GetAssociatedApiType } from 'types/formTypes';

const fetchAssociatedInstitutions = async (
  auth: SblAuthProperties,
): Promise<GetAssociatedApiType[]> => {
  return request<undefined, GetAssociatedApiType[]>({
    axiosInstance: userFiApiClient,
    url: `/v1/institutions/associated`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchAssociatedInstitutions;
