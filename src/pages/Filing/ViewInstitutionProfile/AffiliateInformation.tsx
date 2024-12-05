/* eslint-disable react/require-default-props */
import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { Divider, Heading, WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import InstitutionDataLabels from '../formHelpers';
import './AffiliateInformation.less';
import { DisplayField, NOT_APPLICABLE } from './DisplayField';

const defaultDescription = (
  <>
    If you wish to update the following data, contact your Local Operating Unit
    (LOU) or visit the <Links.FederalReserveBoard />. If you wish to provide
    only your parent entity’s name, where no LEI or RSSD ID exists, submit a
    request to <Links.UpdateInstitutionProfile />.
  </>
);

export function AffiliateInformation({
  data = {} as InstitutionDetailsApiType,
  heading = 'Parent entity information (if applicable)',
  description = defaultDescription,
}: {
  data?: InstitutionDetailsApiType;
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
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          value={data.parent_lei || NOT_APPLICABLE}
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
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          value={data.top_holder_lei || NOT_APPLICABLE}
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
