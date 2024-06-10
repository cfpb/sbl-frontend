import Links from 'components/CommonLinks';
import { LoadingContent } from 'components/Loading';
import {
  Alert,
  Checkbox,
  Grid,
  Link,
  Paragraph,
  TextIntroduction,
} from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDateTimeShort } from 'utils/formatDateTime';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import useUserProfile from 'utils/useUserProfile';
import { AffiliateInformation } from '../ViewInstitutionProfile/AffiliateInformation';
import { FinancialInstitutionDetails } from '../ViewInstitutionProfile/FinancialInstitutionDetails';
import { IdentifyingInformation } from '../ViewInstitutionProfile/IdentifyingInformation';
import { FilingNavButtons } from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';
import {
  FileInformation,
  PointOfContactConfirm,
  SignCertify,
  VoluntaryReportingStatus,
  getDescriptionForSignAndSubmitSection,
} from './FilingSubmit.helpers';

const initState = {
  institution: false,
  affiliate: false,
  identifying: false,
  poc: false,
  file: false,
  certify: false,
  voluntary: false,
};

// TODO: Post-MVP - allow submit
// const isSubmitEnabled = (checkboxValues: typeof initState): boolean =>
//   checkboxValues.institution &&
//   checkboxValues.affiliate &&
//   checkboxValues.identifying &&
//   checkboxValues.poc &&
//   checkboxValues.file &&
//   checkboxValues.certify;

function InstitutionYearLabel({
  name,
  year,
}: {
  name: string | undefined;
  year: number | string | undefined;
}): JSX.Element {
  return (
    <div className='u-mb15 u-mt45 text-sm font-semibold uppercase tracking-[0.0625rem]'>
      {name ?? 'Unknown institution'} | {year ?? '2024'}
    </div>
  );
}

export function FilingSubmit(): JSX.Element {
  const { lei, year } = useParams();
  const [checkboxValues, setCheckboxValues] = useState({ ...initState });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    isError: userError,
    isLoading: userLoading,
    data: user,
  } = useUserProfile();

  const {
    data: institution,
    isLoading: institutionLoading,
    isError: institutionError,
  } = useInstitutionDetails(lei);

  const {
    filing,
    submission,
    isLoading: filingLoading,
    error,
  } = useFilingAndSubmissionInfo({
    lei,
    filingPeriod: year,
  });

  if (filingLoading || institutionLoading || userLoading)
    return <LoadingContent message='Loading submission summary...' />;

  if (error || userError || institutionError)
    return (
      <>
        <Alert status='error' message={userError} isVisible={!!userError} />
        <Alert
          status='error'
          message={institutionError}
          isVisible={!!institutionError}
        />
        <Alert status='error' message={error} isVisible={!!error} />
      </>
    );

  const onCheckboxUpdate =
    (id: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setCheckboxValues({ ...checkboxValues, [id]: event.target.checked });
    };

  // TODO: Post-MVP enable Clear form
  // const onClear = (): void => setCheckboxValues({ ...initState });
  const onSubmit = (): void => setSubmitted(!submitted);
  const onPreviousClick = (): void =>
    navigate(`/filing/${year}/${lei}/contact`);

  return (
    <>
      <FilingSteps />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt0'>
            <InstitutionYearLabel name={institution.name} year={year} />
            <TextIntroduction
              heading='Sign and submit'
              subheading='Before you sign and submit, carefully review all the information provided in each of the following sections. For each section, check the box to confirm that the information is accurate and complete, or follow the instructions to make changes.'
              description={
                <p>
                  An authorized representative of your financial institution
                  with knowledge of the data must certify the accuracy and
                  completeness of the data reported pursuant to{' '}
                  <Links.RegulationB section='§ 1002.109(a)(1)(ii)' />.
                </p>
              }
            />
            <Alert
              status='warning'
              message='You have reached the final step of the beta filing process'
              aria-live='polite'
            >
              <div className='max-w-[41.875rem]'>
                This indicates that you have successfully completed all previous
                steps, including file upload and validations. In this final
                step, all functionality has been disabled. We encourage you to
                familiarize yourself with this step as it will be a part of the
                official filing process. Note that all data uploaded to the
                platform is for testing purposes only and may be removed at any
                time. If you would like to continue testing the system,{' '}
                <Links.UploadANewFile />.
              </div>
            </Alert>
            {submitted ? (
              <Alert
                status='success'
                message={`You have successfully filed your small business lending data for ${year}`}
              >
                <div className='max-w-[41.875rem]'>
                  Your data and signature were received and recorded on{' '}
                  {formatDateTimeShort(submission.submission_time, 'fff')}. Your
                  receipt number for this submission is {submission.filename}.
                  Save this receipt number for future reference.
                </div>
              </Alert>
            ) : (
              ''
            )}
            <VoluntaryReportingStatus
              onChange={onCheckboxUpdate('voluntary')}
              value={checkboxValues.voluntary}
            />
            <FinancialInstitutionDetails
              heading='Confirm your financial institution details'
              data={institution}
              isDomainsVisible={false}
              description={getDescriptionForSignAndSubmitSection()}
            />
            <div className='u-mt30'>
              <Checkbox
                id='fi-details'
                label='The details for my financial institution are accurate and complete.'
                checked={checkboxValues.institution}
                onChange={onCheckboxUpdate('institution')}
                disabled
              />
            </div>

            <IdentifyingInformation
              heading='Confirm your financial institution identifying information'
              data={institution}
              description={getDescriptionForSignAndSubmitSection()}
            />
            <div className='u-mt30'>
              <Checkbox
                id='identifying-info'
                label='The identifying information for my financial institution is accurate and complete. '
                checked={checkboxValues.identifying}
                onChange={onCheckboxUpdate('identifying')}
                disabled
              />
            </div>

            <AffiliateInformation
              heading='Confirm your parent entity information (if applicable)'
              data={institution}
              description={getDescriptionForSignAndSubmitSection()}
            />
            <div className='u-mt30'>
              <Checkbox
                id='affiliate-info'
                label='The parent entity information for my financial institution is accurate and complete, or my financial institution does not have a parent entity so this section is not applicable.'
                checked={checkboxValues.affiliate}
                onChange={onCheckboxUpdate('affiliate')}
                disabled
              />
            </div>

            <PointOfContactConfirm data={filing} />
            <div className='u-mt30'>
              <Checkbox
                id='poc'
                label='The point of contact information for my financial institution is accurate and complete.'
                checked={checkboxValues.poc}
                onChange={onCheckboxUpdate('poc')}
                disabled
              />
            </div>

            <FileInformation data={submission} />
            <div className='u-mt30'>
              <Checkbox
                id='file-info'
                label='The register information for my financial institution is accurate and complete. '
                checked={checkboxValues.file}
                onChange={onCheckboxUpdate('file')}
                disabled
              />
            </div>

            <SignCertify
              name={user.name.length > 0 ? user.name : user.email}
              onChange={onCheckboxUpdate('certify')}
              value={checkboxValues.certify}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <FilingNavButtons
              classNameButtonContainer='mb-[2.313rem]'
              onPreviousClick={onPreviousClick}
              labelNext='Submit filing'
              onNextClick={onSubmit}
              isNextDisabled // TODO: Post-MVP - Enable when all other boxes checked
              // isNextDisabled={!isSubmitEnabled(checkboxValues)}
              // onClearClick={onClear} // TODO: Post-MVP - Only useful when there are enabled checkboxes
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt0 u-mb60'>
            <Alert
              status='success'
              message='Congratulations! You have reached the end of the beta filing process.'
            >
              <Paragraph>
                Thanks for participating. Your input will help us improve our
                platform. Please take a moment to{' '}
                <Link
                  href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Sign and submit: Feedback'
                  type='list'
                >
                  email our support staff
                </Link>{' '}
                with your feedback or <Links.UploadANewFile /> to continue
                testing.
              </Paragraph>
            </Alert>
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default FilingSubmit;
