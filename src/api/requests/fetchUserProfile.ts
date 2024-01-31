import { request } from 'api/axiosService';

const fetchUserProfile = async (auth: AuthContextProps) => {
  return await request<boolean>({ 
    url: `/v1/admin/me/`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default fetchUserProfile;