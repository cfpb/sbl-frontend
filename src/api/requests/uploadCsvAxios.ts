import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';

const uploadCsvAxios = async (
  auth: SblAuthProperties,
  formData: FormData,
): Promise<null> => {
  return request<null>({
    url: `/v1/filing/upload`,
    method: 'post',
    body: formData,
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default uploadCsvAxios;
