/* eslint-disable react/require-default-props */
import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { formatFederalRegulator, valueOrNotavailable } from 'utils/formatting';
import InstitutionDataLabels from '../formHelpers';
import { DisplayField, NOT_APPLICABLE } from './DisplayField';

const defaultDescription = (
  <>
    If your financial institution does not have an RSSD ID and you wish to
    provide your TIN, <Links.UpdateInstitutionProfile isCallToAction={false} />.
    If your institution has an RSSD ID but &quot;Not applicable&quot; is shown,
    contact your primary federal regulator, state regulator, or reserve bank to
    link your LEI to your RSSD ID. Once updated in NIC, we will reflect the data
    in our system.
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
  const institutionTypeNamesArray = data.sbl_institution_types.map(
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

  const institutionTypeNamesString = valueOrNotavailable(
    institutionTypeNamesArray.join(', '),
  );

  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>{description}</SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField label={InstitutionDataLabels.tin} value={data.tax_id} />
        <DisplayField
          label={InstitutionDataLabels.rssd}
          value={data.rssd_id}
          fallbackValue={NOT_APPLICABLE}
        />
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
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

export default IdentifyingInformation;
