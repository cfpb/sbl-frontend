import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedUserProfileObjectType } from 'pages/ProfileForm/types';

const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: FormattedUserProfileObjectType,
): Promise<null> => {
  return request<null>({
    url: `/v1/admin/me/`,
    method: 'put',
    body: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitUserProfile;
