import { BASE_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';

interface UserProfileObject {
  first_name: string;
  last_name: string;
  leis: string[];
}

export const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: UserProfileObject,
): Promise<null> => {
  const response = await fetch(`${BASE_URL}/v1/admin/me/`, {
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(userProfileObject),
  });

  return response.json() as Promise<null>;
};

export default submitUserProfile;
