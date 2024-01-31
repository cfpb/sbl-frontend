import { request } from 'api/axiosService';

const fetchInstitutions = async (auth: SblAuthProperties, domain?: string) => {
  return await request<InstitutionDetailsApiType[]>({ 
    url: `/v1/institutions${domain ? `?domain=${domain}` : '' }`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchInstitutions;