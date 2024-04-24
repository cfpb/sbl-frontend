import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from 'api/requests';
import useSblAuth from 'api/useSblAuth';

export interface UserProfileType {
  email: string;
  id: string;
  institutions: string[];
  name: string;
  username: string;
}

const useUserProfile = (): UseQueryResult<UserProfileType> => {
  const auth = useSblAuth();
  const emailAddress = auth.user?.profile.email;

  return useQuery({
    queryKey: ['fetch-user-profile', emailAddress],
    queryFn: async () => fetchUserProfile(auth),
    enabled: !!auth.isAuthenticated,
  });
};

export default useUserProfile;
