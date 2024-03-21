import { request } from 'api/axiosService';
import { BASE_URL } from 'api/common';
import type { AuthContextProps } from 'react-oidc-context';

const fetchUserProfile = async (auth: AuthContextProps): Promise<boolean> => {
  return request<boolean>({
    url: `${BASE_URL}/v1/admin/me/`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchUserProfile;
