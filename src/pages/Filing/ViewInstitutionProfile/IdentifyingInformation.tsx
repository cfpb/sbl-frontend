import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { WellContainer } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import InstitutionDataLabels from '../formHelpers';
import { DisplayField } from './DisplayField';

export function IdentifyingInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
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
  const institutionTypeNamesString = institutionTypeNamesArray.join(', ');

  return (
    <FormSectionWrapper>
      <SectionIntro heading='Identifying information'>
        If your financial institution has an RSSD ID, and you wish to update the
        following data, visit <Links.NIC />. If your financial institution does
        not have an RSSD ID and you wish to make an update, submit a request to{' '}
        <Links.UpdateInstitutionProfile />.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField label={InstitutionDataLabels.tin} value={data.tax_id} />
        <DisplayField label={InstitutionDataLabels.rssd} value={data.rssd_id} />
        <DisplayField
          label={InstitutionDataLabels.regName}
          value={`${data.primary_federal_regulator.name} (${data.primary_federal_regulator.id})`}
        />
        <DisplayField
          label={InstitutionDataLabels.fiType}
          value={institutionTypeNamesString}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

export default IdentifyingInformation;
