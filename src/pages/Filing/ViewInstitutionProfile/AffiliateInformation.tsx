/* eslint-disable react/require-default-props */
import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { Divider, Heading, WellContainer } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { ReactNode } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import InstitutionDataLabels from '../formHelpers';
import './AffiliateInformation.less';
import { DisplayField, NOT_APPLICABLE } from './DisplayField';

const defaultDescription = (
  <>
    To update the following information, contact your Local Operating Unit (LOU)
    or visit the <Links.FederalReserveBoard />. If you have parent entities with
    no LEI or RSSD ID and need to provide their names, submit a request to{' '}
    <Links.UpdateInstitutionProfile />.
  </>
);

export function AffiliateInformation({
  data = {} as InstitutionDetailsApiType,
  heading = 'Parent entity information (if applicable)',
  description = defaultDescription,
}: {
  data: InstitutionDetailsApiType | undefined;
  heading?: string;
  description?: ReactNode;
}): JSXElement {
  if (!data) return null;

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
