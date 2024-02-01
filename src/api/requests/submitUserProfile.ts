import { request } from 'api/axiosService';
import type { SubmitUserProfileObject } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';

const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: SubmitUserProfileObject,
): Promise<null> => {
  return request<null>({
    url: `/v1/admin/me/`,
    method: 'put',
    body: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitUserProfile;
