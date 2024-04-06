import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedUserProfileObjectType } from 'types/formTypes';

const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: FormattedUserProfileObjectType,
): Promise<null> => {
  return request({
    url: `/v1/admin/me/`,
    method: 'put',
    data: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitUserProfile;
