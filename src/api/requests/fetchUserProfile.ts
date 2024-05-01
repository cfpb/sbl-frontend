import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { AuthContextProps } from 'react-oidc-context';
import type { UserProfileType } from 'types/filingTypes';

const fetchUserProfile = async (
  auth: AuthContextProps,
): Promise<UserProfileType> => {
  return request<undefined, UserProfileType>({
    url: `${BASE_URL}/v1/admin/me/`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchUserProfile;
