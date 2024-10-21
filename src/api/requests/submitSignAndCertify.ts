import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType, SignAndSubmitType } from 'types/filingTypes';

interface SubmitSignAndCertifyParameters {
  lei: string;
  filingPeriod: FilingPeriodType;
}

const submitSignAndCertify = async (
  auth: SblAuthProperties,
  { lei, filingPeriod }: SubmitSignAndCertifyParameters,
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
