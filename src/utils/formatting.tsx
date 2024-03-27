import type { DomainType, InstitutionDetailsApiType } from 'types/formTypes';

export const buildEmailDomainString = (
  domains?: InstitutionDetailsApiType['domains'],
): string => {
  if (typeof domains === 'string') return domains;
  return (domains ?? []).map((domain: DomainType) => domain.domain).join(', ');
};

export default { buildEmailDomainString };
