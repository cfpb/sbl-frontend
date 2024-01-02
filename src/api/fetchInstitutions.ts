import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

export const fetchInstitutions = async (
  auth: SblAuthProperties,
  domain?: string,
): Promise<InstitutionDetailsApiType[]> => {
  const response = await fetch(`/v1/institutions${domain ? `?domain=${domain}` : '' }`, {
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
  return response.json() as Promise<InstitutionDetailsApiType[]>;
};

export default fetchInstitutions;
