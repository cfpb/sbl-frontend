import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodsType } from 'types/filingTypes';

export const fetchFilingPeriods = async (
  auth: SblAuthProperties,
): Promise<FilingPeriodsType[]> => {
  return request<undefined, FilingPeriodsType[]>({
    url: `/v1/filing/periods`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchFilingPeriods;
