import { request } from 'api/axiosService';
import { FILING_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'types/filingTypes';

export const fetchFiling = async (
  auth: SblAuthProperties,
  institution: string,
  filingPeriod: FilingPeriodType,
): Promise<FilingType> => {
  return request<undefined, FilingType>({
    url: `${FILING_URL}/v1/filing/institutions/${institution}/filings/${filingPeriod}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchFiling;
