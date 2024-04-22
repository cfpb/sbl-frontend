import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const fetchInstitutions = async (
  auth: SblAuthProperties,
  domain?: string,
): Promise<InstitutionDetailsApiType[]> => {
  return request({
    url: `/v1/institutions${domain ? `?domain=${domain}` : ''}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchInstitutions;
