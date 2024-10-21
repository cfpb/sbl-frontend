import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { SignAndSubmitType } from 'types/filingTypes';
import type { UseSubmitPointOfContactProperties } from 'utils/useSubmitPointOfContact';

const submitSignAndCertify = async (
  auth: SblAuthProperties,
  { lei, filingPeriod }: UseSubmitPointOfContactProperties,
): Promise<SignAndSubmitType> => {
  if (![lei, filingPeriod].every(Boolean))
    throw new Error('submitSignAndCertify: Missing required parameter');

  return request<undefined, SignAndSubmitType>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/sign`,
    method: 'put',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitSignAndCertify;
