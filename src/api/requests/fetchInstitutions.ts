import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

const fetchInstitutions = async (auth: SblAuthProperties, domain?: string) => {
  return await request<InstitutionDetailsApiType[]>({ 
    url: `/v1/institutions${domain ? `?domain=${domain}` : '' }`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchInstitutions;