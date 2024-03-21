import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';

const fetchIsDomainAllowed = async (
  auth: SblAuthProperties,
  domain?: string,
): Promise<boolean> => {
  return request<boolean>({
    url: `${BASE_URL}/v1/institutions/domains/allowed?domain=${domain}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchIsDomainAllowed;
