import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const fetchAssociatedInstitutions = async (
  auth: SblAuthProperties,
): Promise<InstitutionDetailsApiType[]> => {
  return request<InstitutionDetailsApiType[]>({
    url: `/v1/institutions/associated`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchAssociatedInstitutions;
