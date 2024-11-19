import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedVoluntaryReporterStatusSchema } from 'types/formTypes';

interface Options {
  data: FormattedVoluntaryReporterStatusSchema;
  lei: string;
  filingPeriod: string;
}

const submitVoluntaryReporterStatus = async (
  auth: SblAuthProperties,
  options: Options,
): Promise<null> => {
  const { data, lei, filingPeriod } = options;

  return request<FormattedVoluntaryReporterStatusSchema, null>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/is-voluntary`,
    method: 'put',
    data,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitVoluntaryReporterStatus;
