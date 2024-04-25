import { request } from 'api/axiosService';
import { FILING_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'types/filingTypes';

export const createFiling = async (
  auth: SblAuthProperties,
  lei: string,
  filingPeriod: FilingPeriodType,
): Promise<FilingType> => {
  return request<FilingType>({
    url: `${FILING_URL}/v1/filing/institutions/${lei}/filings/${filingPeriod}`,
    method: 'post',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
    body: 'no-body',
  });
};

export default createFiling;
