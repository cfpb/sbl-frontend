import { Heading, Link, WellContainer } from 'design-system-react';
import './AffiliateInformation.less';
import { DisplayField } from './DisplayField';
import type { InstitutionDetailsApiType } from './institutionDetails.type';

const valueFallback = 'Not available';

export function AffiliateInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  return (
    <div className='affiliate-information'>
      <Heading type='3' className='u-mt45'>
        Affiliate information
      </Heading>
      <p>
        Changes to the LEI of an affiliate are handled through GLEIF. Changes to
        the RSSD ID of an affiliate are handled through NIC. If you need to
        provide your affiliate&apos;s name but don&apos;t have their LEI or RSSD
        ID, please complete the{' '}
        {/* TODO: replace this generic SBL Help link with a specific Salesforce form link, see:
        https://github.com/cfpb/sbl-frontend/issues/109 */}
        <Link href="https://sblhelp.consumerfinance.gov/">
          update your financial institution profile
        </Link>{' '}
        form.
      </p>

      <WellContainer className='u-mt30'>
        <Heading type='5'>Parent entity</Heading>
        <DisplayField
          label='Name'
          value={data.parent_legal_name ?? valueFallback}
          className='u-w33pct inline'
        />
        <DisplayField
          label='LEI'
          value={data.parent_lei ?? valueFallback}
          className='u-w33pct inline'
        />
        <DisplayField
          label='RSSD ID'
          value={data.parent_rssd_id ?? valueFallback}
          className='u-w33pct inline'
        />

        <Heading type='5' className='u-mt45'>
          Top Holder
        </Heading>
        <DisplayField
          label='Name'
          value={data.top_holder_legal_name ?? valueFallback}
          className='u-w33pct inline'
        />
        <DisplayField
          label='LEI'
          value={data.top_holder_lei ?? valueFallback}
          className='u-w33pct inline'
        />
        <DisplayField
          label='RSSD ID'
          value={data.top_holder_rssd_id ?? valueFallback}
          className='u-w33pct inline'
        />
      </WellContainer>
    </div>
  );
}
export default AffiliateInformation;
