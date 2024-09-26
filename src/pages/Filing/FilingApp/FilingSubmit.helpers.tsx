import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { Checkbox, WellContainer } from 'design-system-react';
import type { ChangeEvent, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { formatDateTimeShort } from 'utils/formatDateTime';
import AddressStreetOptional from '../ViewInstitutionProfile/AddressStreetOptional';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';

export function getDescriptionForSignAndSubmitSection(
  type?: string,
): JSX.Element {
  const getLink = (): JSX.Element => {
    if (type === 'poc') return <Links.UpdatePointOfContact />;
    if (type === 'institution') return <Links.UpdateInstitutionProfile />;
    if (type === 'file')
      return (
        <>
          <Links.UploadANewFile /> and repeat the validation process
        </>
      );
    return <Links.UpdateInstitutionProfile />;
  };
  return (
    <>
      Check the box to confirm that the information is accurate and complete. If
      the information in this section is incorrect, {getLink()}.
    </>
  );
}

export function PointOfContactConfirm({
  data,
  heading = 'Confirm your filing point of contact',
  description = getDescriptionForSignAndSubmitSection('poc'),
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
        <DisplayField label='Work phone number' value={poc?.phone_number} />
        <DisplayField label='Extension' value={poc?.phone_ext} />
        <DisplayField
          label='Business address'
          value={
            poc ? (
              <>
                <AddressStreetOptional street={poc.hq_address_street_1} />
                <AddressStreetOptional street={poc.hq_address_street_2} />
                <AddressStreetOptional street={poc.hq_address_street_3} />
                <AddressStreetOptional street={poc.hq_address_street_4} />
                {poc.hq_address_city ? <>{poc.hq_address_city},&nbsp;</> : null}
                {poc.hq_address_state} {poc.hq_address_zip}
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
  heading = 'Confirm your register information',
  description = getDescriptionForSignAndSubmitSection('file'),
}: {
  data: SubmissionResponse;
  // eslint-disable-next-line react/require-default-props
  heading?: string;
  // eslint-disable-next-line react/require-default-props
  description?: ReactNode;
}): JSX.Element {
  const { year } = useParams();

  const warningCount = data.validation_results?.logic_warnings
    .total_count as number;

  const errorCount =
    (data.validation_results?.syntax_errors.total_count as number) +
    (data.validation_results?.logic_errors.total_count as number);

  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>{description}</SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField label='Filing year' value={year} />
        <DisplayField label='File name' value={data.filename} />
        <DisplayField label='Uploaded by' value={data.submitter.user_name} />
        <DisplayField
          label='Uploaded on'
          // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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
        Pursuant to <Links.RegulationB section='§ 1002.109(b)(10)' />, indicate
        whether your financial institution is voluntarily reporting covered
        applications from small businesses. Leave the box unchecked if you are
        not a voluntary reporter.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <Checkbox
          id='voluntary-reporting-status'
          label='My financial institution is voluntarily reporting covered applications from small businesses, and I am not required to file.'
          checked={value}
          onChange={onChange}
          disabled
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
      <SectionIntro heading='Sign and certify your filing'>
        <p>
          An authorized representative of your financial institution with
          knowledge of the data must certify the accuracy and completeness of
          the data reported pursuant to{' '}
          <Links.RegulationB section='§ 1002.109(a)(1)(ii)' />. To complete your
          official regulatory filing, check the box and submit your filing.
        </p>
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <Checkbox
          id='sign-and-certify'
          label={`I, ${name}, am an authorized representative of my financial institution with knowledge of the data and certify the accuracy and completeness of the data reported.`}
          checked={value}
          onChange={onChange}
          disabled
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}
