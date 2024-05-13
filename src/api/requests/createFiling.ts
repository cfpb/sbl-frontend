import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'types/filingTypes';

export const createFiling = async (
  auth: SblAuthProperties,
  lei: string,
  filingPeriod: FilingPeriodType,
): Promise<FilingType> => {
  return request<FilingType>({
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}`,
    method: 'post',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
    body: 'no-body',
  });
};

export default createFiling;
