import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import { Checkbox, WellContainer } from 'design-system-react';
import type { ChangeEvent, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { formatDateTimeShort } from 'utils/formatDateTime';
import AddressStreetOptional from '../ViewInstitutionProfile/AddressStreetOptional';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';

const pocDefaultDescription = (
  <>
    If the information in this section is incorrect{' '}
    <Links.UpdatePointOfContact />. Otherwise, check the box to confirm that the
    information is accurate and complete.
  </>
);

export function PointOfContactConfirm({
  data,
  heading = 'Confirm your filing point of contact',
  description = pocDefaultDescription,
}: {
  data: FilingType;
  // eslint-disable-next-line react/require-default-props
  heading?: string;
  // eslint-disable-next-line react/require-default-props
  description?: ReactNode;
}): JSX.Element {
  const poc = data.contact_info;

  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>{description}</SectionIntro>

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

const fileInfoDefaultDescription = (
  <>
    If the information in this section is incorrect <Links.UploadANewFile /> and
    continue through the validation process. Otherwise, check the box to confirm
    that the information is accurate and complete.
  </>
);

export function FileInformation({
  data,
  heading = 'Confirm your register information',
  description = fileInfoDefaultDescription,
}: {
  data: SubmissionResponse;
  // eslint-disable-next-line react/require-default-props
  heading?: string;
  // eslint-disable-next-line react/require-default-props
  description?: ReactNode;
}): JSX.Element {
  const { year } = useParams();

  const warningCount = data.validation_results?.logic_warnings.count as number;

  const errorCount =
    ((data.validation_results?.syntax_errors.count as number) || 0) +
    ((data.validation_results?.logic_errors.count as number) || 0);

  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>{description}</SectionIntro>

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

export function VoluntaryReportingStatus({
  onChange,
  value,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}): JSX.Element {
  return (
    <FormSectionWrapper className='u-mt45'>
      <SectionIntro heading='Indicate voluntary reporting status'>
        Pursuant to{' '}
        <Link href='https://www.federalregister.gov/documents/2023/05/31/2023-07230/small-business-lending-under-the-equal-credit-opportunity-act-regulation-b#p-4322'>
          § 1002.109(b)(10)
        </Link>
        , indicate whether your financial institution is voluntarily reporting
        covered applications from small businesses. Leave the box unchecked if
        you are not a voluntary reporter.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <Checkbox
          id='voluntary-reporting-status'
          label='My financial institution is voluntarily reporting covered applications from small businesses, and I am not required to file.'
          checked={value}
          onChange={onChange}
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
        An authorized representative of your financial institution with
        knowledge of the data must certify the accuracy and completeness of the
        data reported pursuant to{' '}
        <Link href='https://www.federalregister.gov/documents/2023/05/31/2023-07230/small-business-lending-under-the-equal-credit-opportunity-act-regulation-b#p-4302'>
          § 1002.109(a)(1)(ii)
        </Link>
        . To complete your official regulatory submission, check the box and
        submit your filing.
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
