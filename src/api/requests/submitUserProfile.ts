import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedUserProfileObjectType } from 'types/formTypes';

const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: FormattedUserProfileObjectType,
): Promise<null> => {
  return request<null>({
    url: `${BASE_URL}/v1/admin/me/`,
    method: 'put',
    body: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitUserProfile;
