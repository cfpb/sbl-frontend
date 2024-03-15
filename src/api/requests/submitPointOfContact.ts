import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedPointOfContactSchema } from 'types/formTypes';

const submitPointOfContact = async (
  auth: SblAuthProperties,
  userProfileObject: FormattedPointOfContactSchema,
): Promise<null> => {
  return request<null>({
    url: `/v1/filing/institutions/{lei}/filings/{period_name}/contact-info`,
    method: 'post',
    body: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitPointOfContact;
