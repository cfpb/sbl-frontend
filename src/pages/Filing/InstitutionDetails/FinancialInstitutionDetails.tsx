import { Heading, WellContainer } from 'design-system-react';
import { DisplayField } from './DisplayField';

export function FinancialInstitutionDetails({ data }): JSX.Element {
  return (
    <>
      <Heading type='3' className='u-mt45'>
        Financial institution details
      </Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>

      <WellContainer className='u-mt30'>
        <DisplayField label='Financial institution name' value={data.name} />
        <DisplayField
          label='Headquarters address'
          value={
            <>
              {data.hq_address_street_1}
              <br />
              {data.hq_address_street_2.length > 0 ? (
                <>
                  data.hq_address_street_2.length
                  <br />
                </>
              ) : null}
              {data.hq_address_city}, {data.hq_address_state}{' '}
              {data.hq_address_zip}
            </>
          }
        />
        <DisplayField label='LEI' value={data.lei} />
        <DisplayField label='Email domain' value={data.domains.join(',')} />
      </WellContainer>
    </>
  );
}

export default FinancialInstitutionDetails