import { request } from 'api/axiosService';

const fetchAssociatedInstitutions = async (auth: SblAuthProperties) => {
  return await request<InstitutionDetailsApiType[]>({ 
    url: `/v1/institutions/associated`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchAssociatedInstitutions;