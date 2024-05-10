import FormSectionWrapper from 'components/FormSectionWrapper';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import { Checkbox, WellContainer } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { formatDateTimeShort } from 'utils/formatDateTime';
import AddressStreetOptional from '../ViewInstitutionProfile/AddressStreetOptional';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';

export function PointOfContactConfirm({
  data,
}: {
  data: FilingType;
}): JSX.Element {
  const poc = data.contact_info;

  return (
    <FormSectionWrapper>
      <SectionIntro heading='Confirm your filing point of contact'>
        To make a change to your financial institution point of contact for this
        filing return to Provide point of contact.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField label='First name' value={poc?.first_name} />
        <DisplayField label='Last name' value={poc?.last_name} />
        <DisplayField label='Email address' value={poc?.email} />
        <DisplayField label='Phone number' value={poc?.phone} />
        <DisplayField
          label='Business address'
          value={
            poc ? (
              <>
                {poc.hq_address_street_1}
                {poc.hq_address_street_1 ? <br /> : null}
                <AddressStreetOptional street={poc.hq_address_street_2} />
                {poc.hq_address_city ? <>{poc.hq_address_city},&nbsp;</> : null}
                {poc.hq_address_state_code} {poc.hq_address_zip}
              </>
            ) : null
          }
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

export function FileInformation({
  data,
}: {
  data: SubmissionResponse;
}): JSX.Element {
  const { year, lei } = useParams();

  const warningCount = data.validation_results?.logic_warnings.count as number;

  const errorCount =
    ((data.validation_results?.syntax_errors.count as number) || 0) +
    ((data.validation_results?.logic_errors.count as number) || 0);

  return (
    <FormSectionWrapper>
      <SectionIntro heading='Confirm your register information'>
        To make a change to your official file return to{' '}
        <Link href={`/filing/${year}/${lei}/upload`}>Upload file.</Link>
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField label='Filing year' value={year} />
        <DisplayField label='File name' value={data.filename} />
        <DisplayField label='Uploaded by' value={data.submitter.user_name} />
        <DisplayField
          label='Uploaded on'
          value={formatDateTimeShort(data.submission_time ?? '', 'fff')}
        />
        <DisplayField label='Total errors' value={errorCount} />
        <DisplayField
          label={
            warningCount > 0 ? 'Total verified warnings' : 'Total warnings'
          }
          value={warningCount}
        />
        <DisplayField
          label='Total loans/applications'
          value={data.total_records}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

export function SignCertify({
  name,
  onChange,
  value,
}: {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}): JSX.Element {
  return (
    <FormSectionWrapper>
      <SectionIntro heading='Sign and certify'>
        To complete your official regulatory submission, select the checkbox
        below to certify the accuracy and completeness of the data submitted,
        then, click the “Submit filing” button.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <Checkbox
          id='sign-and-certify'
          label={`I, ${name}, am an authorized representative of my institution with knowledge of the data submitted and I am certifying the accuracy and completeness of the data submitted.`}
          checked={value}
          onChange={onChange}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}
