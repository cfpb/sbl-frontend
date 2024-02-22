import Links from 'components/CommonLinks';
import { Heading, Link, Paragraph, WellContainer } from 'design-system-react';
import type { ReactElement, ReactNode } from 'react';
import { sblHelpLink } from 'utils/common';
import { DisplayField } from './DisplayField';
import type {
  DomainType as Domain,
  InstitutionDetailsApiType,
} from './institutionDetails.type';

const formatAddressStreet = (street: string): ReactElement | undefined => {
  if (street.length === 0) return undefined;
  return (
    <>
      {street}
      <br />
    </>
  );
};

export const formatDomains = (domains?: Domain[]): string =>
  (domains ?? []).map((domain: Domain) => domain.domain).join(', ');

function FinancialInstitutionDetails({
  data,
  heading,
}: {
  data: InstitutionDetailsApiType;
  heading?: ReactNode;
}): JSX.Element {
  return (
    <>
      <Heading type='2' className='u-mt60'>
        {heading}
      </Heading>
      <Paragraph>
        To make a change to the email domains for your financial institution,{' '}
        <Link href={sblHelpLink}>contact our support staff</Link>. To make a
        change to any other data in this section, visit <Links.GLIEF />.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <DisplayField label='Financial institution name' value={data.name} />
        <DisplayField
          label='Headquarters address'
          value={
            <>
              {data.hq_address_street_1}
              <br />
              {formatAddressStreet(data.hq_address_street_2 ?? '')}
              {data.hq_address_city}, {data.hq_address_state_code}{' '}
              {data.hq_address_zip}
            </>
          }
        />
        <DisplayField label='Legal Entity Identifier (LEI)' value={data.lei} />
        <DisplayField
          label='LEI status'
          value={
            <span className='capitalize'>
              {data.is_active ? 'Active' : 'Inactive'}
            </span>
          }
        />
        <DisplayField
          label='Email domain(s)'
          value={formatDomains(data.domains)}
        />
      </WellContainer>
    </>
  );
}

FinancialInstitutionDetails.defaultProps = {
  heading: 'Financial institution details',
};

export default FinancialInstitutionDetails;
