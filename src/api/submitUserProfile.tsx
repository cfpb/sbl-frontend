import type { SblAuthProperties } from 'api/useSblAuth';
import { BASE_URL } from 'api/common';

interface UserProfileObject {
  first_name: string;
  last_name: string;
  leis: string[];
}

export const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: UserProfileObject,
): Promise<any> => {
  const response = await fetch(`/v1/admin/me/`, {
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(userProfileObject),
  });

  return response.json() as Promise<any>;
};

export default submitUserProfile;
