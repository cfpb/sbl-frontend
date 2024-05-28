import { request, userFiApiClient } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const fetchInstitutionDetails = async (
  auth: SblAuthProperties,
  lei: string | undefined,
): Promise<InstitutionDetailsApiType> => {
  return request<undefined, InstitutionDetailsApiType>({
    axiosInstance: userFiApiClient,
    url: `/v1/institutions/${lei}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchInstitutionDetails;
