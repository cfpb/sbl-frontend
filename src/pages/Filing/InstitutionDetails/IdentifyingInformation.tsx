import Links from 'components/CommonLinks';
import { Heading, Paragraph, WellContainer } from 'design-system-react';
import { DisplayField } from './DisplayField';
import type { InstitutionDetailsApiType } from './institutionDetails.type';

export function IdentifyingInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  // TODO: Asking Le about 'Other' institution type/detail in mock data and the ending period
  // https://github.com/cfpb/sbl-frontend/issues/137
  const institutionTypeNamesArray = data.sbl_institution_types?.map(
    institutionType => {
      if (institutionType.sbl_type.name == 'Other') {
        return institutionType.details;
      }
      return institutionType.sbl_type.name.replace(/\.$/, '');
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
        institution does not have an RSSD ID, please complete the{' '}
        <Links.UpdateInstitutionProfile /> form to request changes.
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
