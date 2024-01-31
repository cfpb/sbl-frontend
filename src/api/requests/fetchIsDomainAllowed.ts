import { request } from 'api/axiosService';

const fetchIsDomainAllowed = async (auth: SblAuthProperties, domain?: string) => {
  return await request<boolean>({ 
    url: `/v1/institutions${domain ? `?domain=${domain}` : '' }`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchIsDomainAllowed;