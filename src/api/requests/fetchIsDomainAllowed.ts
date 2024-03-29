import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';

const fetchIsDomainAllowed = async (
  auth: SblAuthProperties,
  domain?: string,
): Promise<boolean> => {
  return request<boolean>({
    url: `/v1/institutions/domains/allowed?domain=${domain}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchIsDomainAllowed;
