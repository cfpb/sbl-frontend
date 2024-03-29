import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

export const fetchFilingSubmissionLatest = async (
  auth: SblAuthProperties,
  institution: InstitutionDetailsApiType,
  filingPeriod: FilingPeriodType,
): Promise<InstitutionDetailsApiType[]> => {
  return request<InstitutionDetailsApiType[]>({
    url: `/v1/filing/institutions/${institution.lei}/filings/${filingPeriod}/submissions/latest`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default { fetchFilingSubmissionLatest };
