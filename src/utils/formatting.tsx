import { NOT_AVAILABLE } from 'pages/Filing/ViewInstitutionProfile/DisplayField';
import type { DomainType, InstitutionDetailsApiType } from 'types/formTypes';

export const buildEmailDomainString = (
  domains?: InstitutionDetailsApiType['domains'],
): string => {
  if (typeof domains === 'string') return domains;
  return (domains ?? []).map((domain: DomainType) => domain.domain).join(', ');
};

export const valueOrNotavailable = (value: string | null): string => {
  if (!value) return NOT_AVAILABLE;
  return value;
};
