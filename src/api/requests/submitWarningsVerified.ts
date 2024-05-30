import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { SubmissionResponse } from 'types/filingTypes';

interface Parameters {
  lei: string;
  filingPeriod: string;
  submissionId: number;
}

const submitWarningsAccept = async (
  auth: SblAuthProperties,
  { lei, filingPeriod, submissionId }: Parameters,
): Promise<null> => {
  if (![lei, filingPeriod, submissionId].every(Boolean))
    throw new Error('submitWarningsAccept: Missing required parameter');

  return request<Partial<SubmissionResponse>, null>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/${submissionId}/accept`,
    method: 'put',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitWarningsAccept;
