import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedPointOfContactSchema } from 'types/formTypes';

const submitPointOfContact = async (
  auth: SblAuthProperties,
  userProfileObject: FormattedPointOfContactSchema,
): Promise<null> => {
  return request<null>({
    // This will eventually be `/v1/filing/institutions/{lei}/filings/{period_name}/contact-info`
    // CURRENTLY HARDCODED
    url: `/v1/filing/institutions/123456789TESTBANK123/filings/2024/contact-info`,
    method: 'put',
    data: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitPointOfContact;
