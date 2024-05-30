import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedPointOfContactSchema } from 'types/formTypes';

interface Options {
  data: FormattedPointOfContactSchema;
  lei: string;
  filingPeriod: string;
}

const submitPointOfContact = async (
  auth: SblAuthProperties,
  options: Options,
): Promise<null> => {
  const { data, lei, filingPeriod } = options;

  return request<FormattedPointOfContactSchema, null>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/contact-info`,
    method: 'put',
    data,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitPointOfContact;
