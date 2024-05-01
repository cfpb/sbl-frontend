import { request } from 'api/axiosService';
import { FILING_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

export const fetchSubmissionLatest = async (
  auth: SblAuthProperties,
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
): Promise<SubmissionResponse> => {
  return request({
    url: `${FILING_URL}/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/latest`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchSubmissionLatest;
