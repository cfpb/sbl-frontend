import Links from 'components/CommonLinks';
import { Heading, Paragraph, WellContainer } from 'design-system-react';
import type { ReactElement } from 'react';
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

export function FinancialInstitutionDetails({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  const domains = data.domains ?? [];
  const domainString = domains
    .map((domain: Domain) => domain.domain)
    .join(', ');

  return (
    <>
      <Heading type='3' className='u-mt45'>
        Financial institution details
      </Heading>
      <Paragraph>
        To make changes to your financial institution details data, visit{' '}
        <Links.GLIEF />. Email domain data is pulled from our financial
        institutions database.
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
        <DisplayField label='LEI' value={data.lei} />
        <DisplayField
          className='capitalize'
          label='LEI status'
          value={data.is_active?.toString()}
        />
        <DisplayField label='Email domain' value={domainString} />
      </WellContainer>
    </>
  );
}

export default FinancialInstitutionDetails;
