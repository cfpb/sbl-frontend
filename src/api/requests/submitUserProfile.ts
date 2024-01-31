import { request } from 'api/axiosService';
import { SubmitUserProfileObject } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';

const submitUserProfile = async (auth: SblAuthProperties, userProfileObject: SubmitUserProfileObject) => {
  return await request<null>({ 
    url: `/v1/admin/me/`,
    method: 'put',
    body: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default submitUserProfile;