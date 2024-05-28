import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'types/filingTypes';

export const fetchFiling = async (
  auth: SblAuthProperties,
  institution: string,
  filingPeriod: FilingPeriodType,
): Promise<FilingType> => {
  return request<undefined, FilingType>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${institution}/filings/${filingPeriod}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchFiling;
