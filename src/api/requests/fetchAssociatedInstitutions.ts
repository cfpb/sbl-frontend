import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

const fetchAssociatedInstitutions = async (auth: SblAuthProperties) => {
  return await request<InstitutionDetailsApiType[]>({ 
    url: `/v1/institutions/associated`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchAssociatedInstitutions;