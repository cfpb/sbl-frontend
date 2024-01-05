import { Heading, WellContainer } from 'design-system-react';
import { DisplayField } from './DisplayField';
import type {
  Domain,
  InstitutionDetailsApiType,
} from './institutionDetails.type';

export function FinancialInstitutionDetails({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  const street2 = data.hq_address_street_2 ?? '';
  const domains = data.domains ?? [];
  const domainString = domains.map((domain: Domain) => domain.domain).join(', ');

  return (
    <>
      <Heading type='3' className='u-mt45'>
        Financial institution details
      </Heading>
      <p>
        The following information is pulled from GLEIF. For changes to your
        financial institution details please reach out to GLEIF. Email domain
        data is pulled from our financial institutions database.
      </p>

      <WellContainer className='u-mt30'>
        <DisplayField label='Financial institution name' value={data.name} />
        <DisplayField
          label='Headquarters address'
          value={
            <>
              {data.hq_address_street_1}
              <br />
              {street2.length > 0 ? (
                <>
                  data.hq_address_street_2.length
                  <br />
                </>
              ) : undefined}
              {data.hq_address_city}, {data.hq_address_state_code}{' '}
              {data.hq_address_zip}
            </>
          }
        />
        <DisplayField label='LEI' value={data.lei} />
        <DisplayField className="capitalize" label='LEI status' value={data.is_active?.toString()} />
        <DisplayField label='Email domain' value={domainString} />
      </WellContainer>
    </>
  );
}

export default FinancialInstitutionDetails;
