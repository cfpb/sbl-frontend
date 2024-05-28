import { request, userFiApiClient } from 'api/axiosService';
import type { AuthContextProps } from 'react-oidc-context';
import type { UserProfileType } from 'types/filingTypes';

const fetchUserProfile = async (
  auth: AuthContextProps,
): Promise<UserProfileType> => {
  return request<undefined, UserProfileType>({
    axiosInstance: userFiApiClient,
    url: `/v1/admin/me/`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchUserProfile;
