import Links from 'components/CommonLinks';
import { Heading, Paragraph, WellContainer } from 'design-system-react';
import { DisplayField } from './DisplayField';
import type { InstitutionDetailsApiType } from './institutionDetails.type';

export function IdentifyingInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  // TODO: Ask Le about why this type name ends with a period, see:
  // https://github.com/cfpb/sbl-frontend/issues/137
  const institutionType = data.sbl_institution_type?.name.replace(/\.$/, '');

  return (
    <>
      <Heading type='3' className='u-mt45'>
        Identifying information
      </Heading>
      <Paragraph>
        If your financial institution has an RSSD ID, and you wish to make a
        change to the following data, visit <Links.NIC />. If not, please
        complete the <Links.UpdateInstitutionProfile /> form to request changes.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <DisplayField
          label='Federal Taxpayer Identification Number (TIN)'
          value={data.tax_id}
        />
        <DisplayField label='RSSD ID' value={data.rssd_id} />
        <DisplayField
          label='Federal prudential regulator'
          value={`${data.primary_federal_regulator?.name} (${data.primary_federal_regulator?.id})`}
        />
        <DisplayField
          label='Type of financial institution'
          value={institutionType}
        />
      </WellContainer>
    </>
  );
}

export default IdentifyingInformation;
