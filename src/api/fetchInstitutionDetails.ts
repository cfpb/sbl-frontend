import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

export const fetchInstitutionDetails = async (
  auth: SblAuthProperties,
  lei: string | undefined,
): Promise<InstitutionDetailsApiType> => {
  const response = await fetch(`${BASE_URL}/v1/institutions/${lei}`, {
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });

  return response.json() as Promise<InstitutionDetailsApiType>;
};

export default fetchInstitutionDetails;
