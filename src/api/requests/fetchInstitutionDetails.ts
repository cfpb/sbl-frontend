import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

const fetchInstitutionDetails = async (auth: SblAuthProperties, lei: string | undefined) => {
  return await request<InstitutionDetailsApiType>({ 
    url: `/v1/institutions/${lei}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchInstitutionDetails;