import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const fetchInstitutionDetails = async (
  auth: SblAuthProperties,
  lei: string | undefined,
): Promise<InstitutionDetailsApiType> => {
  return request<InstitutionDetailsApiType>({
    url: `${BASE_URL}/v1/institutions/${lei}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchInstitutionDetails;
