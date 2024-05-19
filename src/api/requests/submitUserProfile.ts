import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedUserProfileObjectType } from 'types/formTypes';

const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: FormattedUserProfileObjectType,
): Promise<null> => {
  return request<FormattedUserProfileObjectType, null>({
    url: `${BASE_URL}/v1/admin/me/`,
    method: 'put',
    data: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitUserProfile;
