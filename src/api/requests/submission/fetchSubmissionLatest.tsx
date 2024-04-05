import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, SubmissionType } from '../../../utils/types';

export const fetchSubmissionLatest = async (
  auth: SblAuthProperties,
  lei: string,
  filingPeriod: FilingPeriodType,
): Promise<SubmissionType> => {
  return request<SubmissionType>({
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/latest`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchSubmissionLatest;
