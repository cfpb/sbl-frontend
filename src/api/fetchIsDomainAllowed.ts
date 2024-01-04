import type { SblAuthProperties } from 'api/useSblAuth';

export const fetchIsDomainAllowed = async (
  auth: SblAuthProperties,
  domain?: string,
): Promise<boolean> => {
  const response = await fetch(`/v1/institutions/domains/allowed?domain=${domain}`, {
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
  return response.json() as Promise<boolean>;
};

export default fetchIsDomainAllowed;
