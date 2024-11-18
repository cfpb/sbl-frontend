/* eslint-disable react/require-default-props */
import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { formatFederalRegulator } from 'utils/formatting';
import InstitutionDataLabels from '../formHelpers';
import { DisplayField, NOT_PROVIDED } from './DisplayField';

const defaultDescription = (
  <>
    If your financial institution has an RSSD ID, and you wish to update the
    following information, visit the <Links.FederalReserveBoard />. If your
    financial institution does not have an RSSD ID and you wish to make an
    update, submit a request to <Links.UpdateInstitutionProfile />.
  </>
);

export function IdentifyingInformation({
  data,
  heading = 'Financial institution identifying information',
  description = defaultDescription,
}: {
  data: InstitutionDetailsApiType;
  heading?: string;
  description?: ReactNode;
}): JSX.Element {
  // TODO: Asking Le about 'Other' institution type/detail in mock data and the ending period
  // https://github.com/cfpb/sbl-frontend/issues/137
  const institutionTypeNamesArray = data.sbl_institution_types?.map(
    institutionType => {
      let name = '';
      if (typeof institutionType === 'string') name = institutionType;
      else if (institutionType.sbl_type.name === 'Other') {
        return institutionType.details;
      } else {
        const { sbl_type: sblType } = institutionType;
        const { name: typeName } = sblType;
        name = typeName;
      }

      return name.replace(/\.$/, '');
    },
  );

  const institutionTypeNamesString = institutionTypeNamesArray?.join(', ');

  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>{description}</SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField
          label={InstitutionDataLabels.tin}
          value={data.tax_id}
          fallbackValue={NOT_PROVIDED}
          alertStatus='error'
        />
        <DisplayField label={InstitutionDataLabels.rssd} value={data.rssd_id} />
        <DisplayField
          label={InstitutionDataLabels.regName}
          value={formatFederalRegulator(data)}
        />
      </WellContainer>

      <SectionIntro className='u-mt45'>
        To update your type of financial institution, submit a request to{' '}
        <Links.UpdateInstitutionProfile />.
      </SectionIntro>
      <WellContainer className='u-mt30'>
        <DisplayField
          label={InstitutionDataLabels.fiType}
          value={institutionTypeNamesString}
          fallbackValue={NOT_PROVIDED}
          alertStatus='error'
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

export default IdentifyingInformation;
