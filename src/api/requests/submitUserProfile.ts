import { request, userFiApiClient } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { FormattedUserProfileObjectType } from 'types/formTypes';

const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: FormattedUserProfileObjectType,
): Promise<null> => {
  return request<FormattedUserProfileObjectType, null>({
    axiosInstance: userFiApiClient,
    url: `/v1/admin/me/`,
    method: 'put',
    data: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default submitUserProfile;
