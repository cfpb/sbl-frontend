import Links from 'components/CommonLinks';
import { Heading, Paragraph, WellContainer } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import InstitutionDataLabels from '../formHelpers';
import './AffiliateInformation.less';
import { DisplayField } from './DisplayField';

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
        To request changes to an LEI-based affiliate, visit <Links.GLIEF />. To
        request changes to an RSSD ID- based affiliate, visit <Links.NIC />. If
        you wish to provide only your affiliate&apos;s name, where no LEI or
        RSSD ID exists, <Links.UpdateInstitutionProfile />.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <Heading type='5'>Parent entity</Heading>
        <DisplayField
          label={InstitutionDataLabels.name}
          value={data.parent_legal_name}
          className={sharedClassnames}
        />
        <DisplayField
          label={InstitutionDataLabels.lei}
          value={data.parent_lei}
          className={sharedClassnames}
        />
        <DisplayField
          label={InstitutionDataLabels.rssd}
          value={data.parent_rssd_id}
          className={sharedClassnames}
        />

        <Heading type='5' className='u-mt45'>
          Top Holder
        </Heading>
        <DisplayField
          label={InstitutionDataLabels.name}
          value={data.top_holder_legal_name}
          className={sharedClassnames}
        />
        <DisplayField
          label={InstitutionDataLabels.lei}
          value={data.top_holder_lei}
          className={sharedClassnames}
        />
        <DisplayField
          label={InstitutionDataLabels.rssd}
          value={data.top_holder_rssd_id}
          className={sharedClassnames}
        />
      </WellContainer>
    </div>
  );
}
export default AffiliateInformation;
