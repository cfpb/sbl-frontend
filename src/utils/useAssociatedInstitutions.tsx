import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchAssociatedInstitutions } from 'api/requests';
import useSblAuth from 'api/useSblAuth';

// TODO: How do I type this?
export const useAssociatedInstitutions = (): UseQueryResult => {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;

  return useQuery({
    queryKey: [`fetch-associated-institutions-${email}`, email],
    queryFn: async () => fetchAssociatedInstitutions(auth),
  });
};

export default { useAssociatedInstitutions };
