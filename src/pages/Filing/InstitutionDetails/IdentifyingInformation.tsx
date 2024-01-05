import { Heading, WellContainer } from 'design-system-react';
import { DisplayField } from './DisplayField';
import type { InstitutionDetailsApiType } from './institutionDetails.type';

export function IdentifyingInformation({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSX.Element {
  return (
    <>
      <Heading type='3' className='u-mt45'>
        Identifying information
      </Heading>
      <p>
        If you represent a non-depository institution you may add or update the
        information in the fields below. If you represent a depository
        institution, please reach out to NIC to make changes.
      </p>

      <WellContainer className='u-mt30'>
        <DisplayField
          label='Federal Taxpayer Identification Number (TIN)'
          value={data.tax_id}
        />
        <DisplayField
          label='Research, Statistics, Supervision, and Discount Identification
                (RSSD ID) number'
          value={data.rssd_id}
        />
        <DisplayField
          label='Federal prudential regulator'
          value={`${data.primary_federal_regulator.name} (${data.primary_federal_regulator.id})`}
        />
        <DisplayField
          label='Type of financial institution'
          // TODO: Ask Le about why this type name ends with a period, see:
          // https://github.com/cfpb/sbl-frontend/issues/137
          value={(data.sbl_institution_type.name).replace(/\.$/, "")}
        />
      </WellContainer>
    </>
  );
}

export default IdentifyingInformation;
