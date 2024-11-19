import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FilingPeriodType } from 'types/filingTypes';

interface SubmitWarningsAcceptParameters {
  lei: string;
  filingPeriod: FilingPeriodType;
  counter: number | undefined;
}

const submitWarningsAccept = async (
  auth: SblAuthProperties,
  { lei, filingPeriod, counter }: SubmitWarningsAcceptParameters,
): Promise<null> => {
  if (![lei, filingPeriod, counter].every(Boolean))
    throw new Error('submitWarningsAccept: Missing required parameter');

  return request<undefined, null>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/${counter}/accept`,
    method: 'put',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitWarningsAccept;
