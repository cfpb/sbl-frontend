import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'utils/types';

export const fetchFiling = async (
  auth: SblAuthProperties,
  institution: string,
  filingPeriod: FilingPeriodType,
): Promise<FilingType> => {
  return request<FilingType>({
    url: `/v1/filing/institutions/${institution}/filings/${filingPeriod}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default { fetchFiling };
