import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchAssociatedInstitutions } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/ProfileForm/types';

export const useAssociatedInstitutions = (): UseQueryResult<
  InstitutionDetailsApiType[]
> => {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;

  return useQuery({
    queryKey: [`fetch-associated-institutions-${email}`, email],
    queryFn: async (): Promise<InstitutionDetailsApiType[]> =>
      fetchAssociatedInstitutions(auth),
  });
};

export default { useAssociatedInstitutions };
