import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { SubmissionResponse } from 'types/filingTypes';

interface Options {
  lei?: string;
  filingPeriod?: string;
  submissionId?: number;
}

const submitWarningsAccept = async (
  auth: SblAuthProperties,
  options: Options,
): Promise<null> => {
  const { lei, filingPeriod, submissionId } = options;

  /* Params are defined as optional because of TS complaining about content
     that gets fetched/loaded, but we need to ensure they all exist
  */
  if (![lei, filingPeriod, submissionId].every(Boolean)) {
    console.log(`submitWarningsAccept: Missing required parameter`, options);
    return new Promise(resolve => {
      resolve(null);
    });
  }

  return request<Partial<SubmissionResponse>, null>({
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/${submissionId}/accept`,
    method: 'put',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitWarningsAccept;
