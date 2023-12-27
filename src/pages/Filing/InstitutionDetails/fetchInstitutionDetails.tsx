import type { SblAuthProperties } from '../../../api/useSblAuth';
import type { InstitutionDetailsApiType } from './institutionDetails.type';

export const fetchInstitutionDetails = async (
  auth: SblAuthProperties,
  lei: string | undefined,
): Promise<InstitutionDetailsApiType> => {
  const response = await fetch(`http://localhost:8881/v1/institutions/${lei}`, {
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });

  return response.json() as Promise<InstitutionDetailsApiType>;
};

export default fetchInstitutionDetails;
