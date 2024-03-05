import type {
  DomainType,
  InstitutionDetailsApiType,
} from 'pages/ProfileForm/types';
import type { ReactElement } from 'react';

export const buildEmailDomainString = (
  domains?: InstitutionDetailsApiType['domains'],
): string => {
  if (typeof domains === 'string') return domains;
  return (domains ?? []).map((domain: DomainType) => domain.domain).join(', ');
};

export const formatAddressStreet = (
  street: string | undefined,
): ReactElement | undefined => {
  if (street?.length === 0) return undefined;
  return (
    <>
      {street}
      <br />
    </>
  );
};

export default { buildEmailDomainString, formatAddressStreet };
