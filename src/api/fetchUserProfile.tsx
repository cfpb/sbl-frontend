
import type { UserProfile } from 'oidc-client-ts';
import type { AuthContextProps } from 'react-oidc-context';
import { BASE_URL } from './common';

// Type definition from: 
// https://github.com/cfpb/regtech-user-fi-management/blob/main/src/entities/models/dto.py#L130
export interface UserProfileObject {
  claims: UserProfile,
  name: UserProfile["name"],
  username: UserProfile["username"],
  email: UserProfile["email"],
  id: string,
  institutions: string[],
}

export const getUserProfile = async (
  auth: AuthContextProps,
): Promise<UserProfile> => {
  const response = await fetch(`${BASE_URL}/v1/admin/me/`, {
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });

  return response.json() as Promise<UserProfile>;
};

export default getUserProfile;
