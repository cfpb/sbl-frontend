import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { Divider, Heading, WellContainer } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import InstitutionDataLabels from '../formHelpers';
import './AffiliateInformation.less';
import { DisplayField } from './DisplayField';

export function AffiliateInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  return (
    <FormSectionWrapper>
      <SectionIntro heading='Affiliate information'>
        To request changes to an LEI-based affiliate, visit <Links.GLIEF />. To
        request an update to an RSSD ID-based affiliate, visit <Links.NIC />. If
        you wish to provide only your affiliate&apos;s name, where no LEI or
        RSSD ID exists, submit a request to <Links.UpdateInstitutionProfile />.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <Heading type='5'>Parent entity</Heading>
        <DisplayField
          label={InstitutionDataLabels.name}
          value={data.parent_legal_name}
        />
        <DisplayField
          label={InstitutionDataLabels.lei}
          value={data.parent_lei}
        />
        <DisplayField
          label={InstitutionDataLabels.rssd}
          value={data.parent_rssd_id}
        />

        <Divider className='u-mt45' />
        <Heading type='5' className='u-mt45'>
          Top Holder
        </Heading>
        <DisplayField
          label={InstitutionDataLabels.name}
          value={data.top_holder_legal_name}
        />
        <DisplayField
          label={InstitutionDataLabels.lei}
          value={data.top_holder_lei}
        />
        <DisplayField
          label={InstitutionDataLabels.rssd}
          value={data.top_holder_rssd_id}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}
export default AffiliateInformation;
