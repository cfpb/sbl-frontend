import {
  NOT_APPLICABLE,
  NOT_AVAILABLE,
} from 'pages/Filing/ViewInstitutionProfile/DisplayField';
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

export const formatFederalRegulator = (
  data: InstitutionDetailsApiType,
): string =>
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  data.primary_federal_regulator
    ? `${data.primary_federal_regulator.name} (${data.primary_federal_regulator.id})`
    : NOT_APPLICABLE;

export const formatPipeSeparatedString = (
  content: (number | string | undefined)[],
): string => {
  return content.filter(Boolean).join(`${'\u00A0\u00A0'}|${'\u00A0\u00A0'}`);
};
