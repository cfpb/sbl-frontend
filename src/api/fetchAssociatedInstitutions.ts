import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';
import { BASE_URL } from './common';

export const fetchAssociatedInstitutions = async (
  auth: SblAuthProperties,
): Promise<InstitutionDetailsApiType[]> => {
  const response = await fetch(`${BASE_URL}/v1/institutions/associated`, {
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });

  return response.json() as Promise<InstitutionDetailsApiType[]>;
};

export default fetchAssociatedInstitutions;
