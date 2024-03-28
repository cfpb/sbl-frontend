import Links from 'components/CommonLinks';
import {
  Divider,
  Heading,
  Paragraph,
  WellContainer,
} from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import './AffiliateInformation.less';
import { DisplayField } from './DisplayField';

const sharedClassnames = '';

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
        To request an update to an LEI-based affiliate, visit <Links.GLIEF />.
        To request an update to an RSSD ID-based affiliate, visit <Links.NIC />.
        If you wish to provide only your affiliate&apos;s name, where no LEI or
        RSSD ID exists, submit a request to <Links.UpdateInstitutionProfile />.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <Heading type='5'>Parent entity</Heading>
        <DisplayField
          label='Name'
          value={data.parent_legal_name}
          className={sharedClassnames}
        />
        <DisplayField
          label='Legal Entity Identifier (LEI)'
          value={data.parent_lei}
          className={sharedClassnames}
        />
        <DisplayField
          label='Research, Statistics, Supervision, Discount Identifier (RSSD ID)'
          value={data.parent_rssd_id}
          className={sharedClassnames}
        />

        <Divider className='u-mt45' />

        <Heading type='5' className='u-mt45'>
          Top Holder
        </Heading>
        <DisplayField
          label='Name'
          value={data.top_holder_legal_name}
          className={sharedClassnames}
        />
        <DisplayField
          label='Legal Entity Identifier (LEI)'
          value={data.top_holder_lei}
          className={sharedClassnames}
        />
        <DisplayField
          label='Research, Statistics, Supervision, Discount Identifier (RSSD ID)'
          value={data.top_holder_rssd_id}
          className={sharedClassnames}
        />
      </WellContainer>
    </div>
  );
}
export default AffiliateInformation;
