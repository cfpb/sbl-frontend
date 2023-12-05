import { Heading, WellContainer } from 'design-system-react';
import { DisplayField } from './DisplayField';

export function AffiliateInformation({ data }) {
  return (
    <>
      <Heading type='3' className='u-mt45'>
        Affiliate information
      </Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>

      <WellContainer className='u-mt30'>
        <Heading type='5'>Parent entity</Heading>
        <DisplayField
          label='Name'
          value={data.parent_legal_name}
          className='u-w33pct inline'
        />
        <DisplayField
          label='LEI'
          value={data.parent_lei}
          className='u-w33pct inline'
        />
        <DisplayField
          label='RSSD ID'
          value={data.parent_rssd_id}
          className='u-w33pct inline'
        />

        <Heading type='5' className='u-mt45'>
          Top Holder
        </Heading>
        <DisplayField
          label='Name'
          value={data.top_holder_legal_name}
          className='u-w33pct inline'
        />
        <DisplayField
          label='LEI'
          value={data.top_holder_lei}
          className='u-w33pct inline'
        />
        <DisplayField
          label='RSSD ID'
          value={data.top_holder_rssd_id}
          className='u-w33pct inline'
        />
      </WellContainer>
    </>
  );
}
 export default AffiliateInformation