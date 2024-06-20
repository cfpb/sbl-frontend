import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, FilingType } from 'types/filingTypes';

export const createFiling = async (
  auth: SblAuthProperties,
  lei: string,
  filingPeriod: FilingPeriodType,
): Promise<FilingType> => {
  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  return request<FilingType>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}`,
    method: 'post',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    body: 'no-body',
  });
};

export default createFiling;
