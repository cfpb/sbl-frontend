import Links from 'components/CommonLinks';
import { Heading, Paragraph, WellContainer } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { DisplayField } from './DisplayField';

export function IdentifyingInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
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
    <>
      <Heading type='2' className='u-mt60'>
        Identifying information
      </Heading>
      <Paragraph>
        If your financial institution has an RSSD ID, and you wish to make a
        change to the following data, visit <Links.NIC />. If your financial
        institution does not have an RSSD ID and you wish to make a change,{' '}
        <Links.UpdateInstitutionProfile />.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <DisplayField
          label='Federal Taxpayer Identification Number (TIN)'
          value={data.tax_id}
        />
        <DisplayField
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          value={data.rssd_id}
        />
        <DisplayField
          label='Federal prudential regulator'
          value={`${data.primary_federal_regulator?.name} (${data.primary_federal_regulator?.id})`}
        />
        <DisplayField
          label='Type of financial institution'
          value={institutionTypeNamesString}
        />
      </WellContainer>
    </>
  );
}

export default IdentifyingInformation;
