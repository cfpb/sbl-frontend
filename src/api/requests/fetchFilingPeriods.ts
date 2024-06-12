import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodSchema } from 'types/filingTypes';

export const fetchFilingPeriods = async (
  auth: SblAuthProperties,
): Promise<FilingPeriodSchema[]> => {
  return request<undefined, FilingPeriodSchema[]>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/periods`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchFilingPeriods;
