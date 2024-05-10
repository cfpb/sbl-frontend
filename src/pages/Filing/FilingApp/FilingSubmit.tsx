import Links from 'components/CommonLinks';
import {
  Alert,
  Button,
  Checkbox,
  Grid,
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
import { FilingSteps } from './FilingSteps';
import {
  FileInformation,
  PointOfContactConfirm,
  SignCertify,
  VoluntaryReportingStatus,
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
    <div className='u-mb15 text-sm font-semibold uppercase tracking-[.063rem]'>
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
    return <div>Loading...</div>;

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

  const onClear = (): void => setCheckboxValues({ ...initState });
  const onSubmit = (): void => setSubmitted(!submitted);
  const onGoToUpload = (): void => navigate(`/filing/${year}/${lei}/upload`);

  return (
    <>
      <FilingSteps />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <InstitutionYearLabel name={institution.name} year={year} />
            <TextIntroduction
              heading='Sign and submit'
              subheading='Before you sign and submit, carefully review all the information provided in each of the following sections. For each section, check the box if the information is complete and accurate, or follow the instructions to make changes.'
              description='An authorized representative of your financial institution with knowledge of the data must certify the accuracy and completeness of the data reported pursuant to § 1002.109(a)(1)(ii).'
            />
            <Alert
              status='warning'
              message='You have reached the final step of our beta filing process'
            >
              <div className='max-w-[41.875rem]'>
                This indicates that you have successfully completed all previous
                steps, including file upload and validations. In this final
                step, all functionality has been disabled. We encourage you to
                familiarize yourself with this step as it will be a part of the
                official filing process. Note that all data uploaded to the
                platform is for testing purposes only and may be removed at any
                time. If you would like to continue testing the system,{' '}
                <Button
                  asLink
                  label='upload a new file'
                  onClick={onGoToUpload}
                />
                .
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
              heading='Confirm financial institution details'
              data={institution}
              isDomainsVisible={false}
              description={
                <>
                  If the information in this section is incorrect, visit{' '}
                  <Links.GLIEF /> to make updates. Otherwise, check the box to
                  confirm that the information is accurate and complete.
                </>
              }
            />
            <div className='u-mt30'>
              <Checkbox
                id='fi-details'
                label='The details for my financial institution are accurate and complete.'
                checked={checkboxValues.institution}
                onChange={onCheckboxUpdate('institution')}
              />
            </div>

            <IdentifyingInformation
              heading='Confirm your financial institution identifying information'
              data={institution}
              description={
                <>
                  If your financial institution has an RSSD ID, and you wish to
                  make an update, visit <Links.NIC />. If your financial
                  institution does not have an RSSD ID and you wish to make an
                  update, submit a request to <Links.UpdateInstitutionProfile />
                  . Otherwise, check the box to confirm that the information is
                  accurate and complete.
                </>
              }
            />
            <div className='u-mt30'>
              <Checkbox
                id='identifying-info'
                label='The identifying information for my financial institution is accurate and complete. '
                checked={checkboxValues.identifying}
                onChange={onCheckboxUpdate('identifying')}
              />
            </div>

            <AffiliateInformation
              heading='Confirm your parent entity information (if applicable)'
              data={institution}
              description={
                <>
                  To request an update to an LEI-based parent entity, visit{' '}
                  <Links.GLIEF />. To request an update to an RSSD ID-based
                  parent entity, visit <Links.NIC />. If you have parent
                  entities with no LEI or RSSD ID, submit a request to{' '}
                  <Links.UpdateInstitutionProfile />. Otherwise, check the box
                  to confirm that the information is accurate and complete.
                </>
              }
            />
            <div className='u-mt30'>
              <Checkbox
                id='affiliate-info'
                label='The parent entity information for my financial institution is accurate and complete, or my financial institution does not have a parent entity and therefore this section is not applicable.'
                checked={checkboxValues.affiliate}
                onChange={onCheckboxUpdate('affiliate')}
              />
            </div>

            <PointOfContactConfirm data={filing} />
            <div className='u-mt30'>
              <Checkbox
                id='poc'
                label='The filing point of contact information for my financial institution is accurate and complete. '
                checked={checkboxValues.poc}
                onChange={onCheckboxUpdate('poc')}
              />
            </div>

            <FileInformation data={submission} />
            <div className='u-mt30'>
              <Checkbox
                id='file-info'
                label='The register information for my financial institution is accurate and complete. '
                checked={checkboxValues.file}
                onChange={onCheckboxUpdate('file')}
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
          <Grid.Column width={8} className='u-mt15 u-mb60'>
            <Button
              label='Submit filing'
              type='submit'
              onClick={onSubmit}
              className='mr-5'
              // disabled={!isSubmitEnabled(checkboxValues)}
              disabled // TODO: Conditionally enable after MVP
            />
            <Button
              label='Clear form'
              asLink
              onClick={onClear}
              appearance='warning'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default FilingSubmit;
