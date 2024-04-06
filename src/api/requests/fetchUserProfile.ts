import { request } from 'api/axiosService';
import type { AuthContextProps } from 'react-oidc-context';

const fetchUserProfile = async (auth: AuthContextProps): Promise<boolean> => {
  return request({
    url: `/v1/admin/me/`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchUserProfile;
