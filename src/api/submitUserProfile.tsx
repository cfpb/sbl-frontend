import type { SblAuthProperties } from 'api/useSblAuth';

interface UserProfileObject {
  first_name: string;
  last_name: string;
  leis: string[];
}

export const submitUserProfile = async (
  auth: SblAuthProperties,
  userProfileObject: UserProfileObject,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const response = await fetch(`/v1/admin/me/`, {
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(userProfileObject),
  });

  return response.json() ;
};

export default submitUserProfile;
