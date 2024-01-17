import './AffiliateInformation.less';

import Links from 'components/CommonLinks';
import { Heading, Paragraph, WellContainer } from 'design-system-react';

import { DisplayField } from './DisplayField';
import type { InstitutionDetailsApiType } from './institutionDetails.type';

const valueFallback = 'Not available';
const sharedClassnames = 'u-w33pct inline';

export function AffiliateInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  return (
    <div className='affiliate-information'>
      <Heading type='2' className='u-mt60'>
        Affiliate information
      </Heading>
      <Paragraph>
        To request changes to an affiliate&apos;s LEI, visit <Links.GLIEF />. To
        request changes an affiliate&apos;s RSSD ID, visit <Links.NIC />. If you
        wish to provide your affiliate&apos;s name, please complete the&nbsp;
        <Links.UpdateInstitutionProfile /> form.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <Heading type='5'>Parent entity</Heading>
        <DisplayField
          label='Name'
          value={data.parent_legal_name ?? valueFallback}
          className={sharedClassnames}
        />
        <DisplayField
          label='LEI'
          value={data.parent_lei ?? valueFallback}
          className={sharedClassnames}
        />
        <DisplayField
          label='RSSD ID'
          value={data.parent_rssd_id ?? valueFallback}
          className={sharedClassnames}
        />

        <Heading type='5' className='u-mt45'>
          Top Holder
        </Heading>
        <DisplayField
          label='Name'
          value={data.top_holder_legal_name ?? valueFallback}
          className={sharedClassnames}
        />
        <DisplayField
          label='LEI'
          value={data.top_holder_lei ?? valueFallback}
          className={sharedClassnames}
        />
        <DisplayField
          label='RSSD ID'
          value={data.top_holder_rssd_id ?? valueFallback}
          className={sharedClassnames}
        />
      </WellContainer>
    </div>
  );
}
export default AffiliateInformation;
