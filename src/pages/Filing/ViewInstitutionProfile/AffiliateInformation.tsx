/* eslint-disable react/require-default-props */
import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { Divider, Heading, WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import InstitutionDataLabels from '../formHelpers';
import './AffiliateInformation.less';
import { DisplayField } from './DisplayField';

const defaultDescription = (
  <>
    To request an update to an LEI-based affiliate, visit <Links.GLIEF />. To
    request an update to an RSSD ID-based affiliate, visit <Links.NIC />. If you
    have parent entities with no LEI or RSSD ID, provide the names of those
    institutions in the form below.
  </>
);

export function AffiliateInformation({
  data,
  heading = 'Affiliate information',
  description = defaultDescription,
}: {
  data: InstitutionDetailsApiType;
  heading?: string;
  description?: ReactNode;
}): JSX.Element {
  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>{description}</SectionIntro>

      <WellContainer className='u-mt30'>
        <Heading type='3' className='h5'>
          Immediate Parent entity
        </Heading>
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

        <Divider className='u-mt30 u-mb30' />
        <Heading type='3' className='h5'>
          Top-Holding Parent Entity
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
