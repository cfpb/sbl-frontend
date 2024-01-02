import type { SblAuthProperties } from 'api/useSblAuth';
import { BASE_URL } from 'api/common';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

export const fetchInstitutions = async (
  auth: SblAuthProperties,
): Promise<InstitutionDetailsApiType[]> => {
  const response = await fetch(`/v1/institutions`, {
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });

  return response.json() as Promise<InstitutionDetailsApiType[]>;
};

export default fetchInstitutions;
