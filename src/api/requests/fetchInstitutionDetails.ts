import { request } from 'api/axiosService';

const fetchInstitutionDetails = async (auth: SblAuthProperties, lei: string | undefined) => {
  return await request<InstitutionDetailsApiType>({ 
    url: `/v1/institutions/${lei}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchInstitutionDetails;