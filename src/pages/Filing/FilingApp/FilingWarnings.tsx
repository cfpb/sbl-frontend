import submitWarningsAccept from 'api/requests/submitWarningsVerified';
import useSblAuth from 'api/useSblAuth';
import classnames from 'classnames';
import FormWrapper from 'components/FormWrapper';
import {
  Alert,
  Button,
  Checkbox,
  Heading,
  Icon,
  List,
  ListLink,
  TextIntroduction,
  WellContainer,
} from 'design-system-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import { NavigationPrevious } from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';
import InstitutionHeading from './InstitutionHeading';

const isSubmissionAccepted = (submission?: SubmissionResponse): boolean => {
  return submission?.state === FileSubmissionState.SUBMISSION_ACCEPTED;
};

function FilingWarnings(): JSX.Element {
  const navigate = useNavigate();
  const auth = useSblAuth();
  const { lei, year } = useParams();
  const [boxChecked, setBoxChecked] = useState(false);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(null);

  const {
    data: submission,
    isLoading: isSubmissionLoading,
    isError: errorSubmissionFetch,
  } = useGetSubmissionLatest(lei, year);

  const {
    data: institution,
    isLoading: isInstitutionLoading,
    isError: errorInstitutionFetch,
  } = useInstitutionDetails(lei);

  const institutionName = isInstitutionLoading
    ? 'Loading...'
    : errorInstitutionFetch
      ? ''
      : institution.name;

  const onClickCheckbox = (): void => {
    setBoxChecked(!boxChecked);
  };

  const onFormSubmit = async (): Promise<void> => {
    const nextPage = `/filing/${year}/${lei}/contact`;

    // Submission already accepted so no API call required, just navigate
    if (isSubmissionAccepted(submission)) {
      navigate(nextPage);
      return;
    }

    setFormSubmitError(null); // Clear previous errors
    setFormSubmitLoading(true); // Show loading indicator

    const response = await submitWarningsAccept(auth, {
      lei,
      filingPeriod: year,
      submissionId: submission?.id,
    });

    setFormSubmitLoading(false); // Clear loading indicator

    if (isSubmissionAccepted(response)) {
      setBoxChecked(true);
      navigate(nextPage);
    } else {
      setFormSubmitError(response); // Display error alert
    }
  };

  const isLoading = formSubmitLoading || isSubmissionLoading;

  const hasWarnings = submission?.validation_json?.logic_warnings?.count > 0;

  const isVerified =
    isSubmissionAccepted(submission) || boxChecked || !hasWarnings;

  const canContinue = !isLoading && isVerified;

  return (
    <>
      <FilingSteps />
      <FormWrapper>
        <div className='u-mb30'>
          <InstitutionHeading
            eyebrow
            name={institutionName}
            filingPeriod={year}
          />
        </div>
        <TextIntroduction
          heading='Review warnings'
          subheading='Warning validations check for unexpected values that could indicate a mistake in your register. You must verify the accuracy of all register values flagged by warning validations to continue to the next step.'
          description={
            <>
              If applicable, review the tables below or download the validation
              report to determine if the values flagged with warning validations
              require action. If there are underlying problems, make the
              corrections, and upload a new file.
              <div id='warnings-listlinks' className='mt-[1.875rem]'>
                <List isLinks>
                  <ListLink href='#'>Download validation report</ListLink>
                  <ListLink href={`/filing/${year}/${lei}/upload`}>
                    Upload a new file
                  </ListLink>
                </List>
              </div>
            </>
          }
        />
        {!hasWarnings || isSubmissionAccepted(submission) ? (
          <Alert
            className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
            message='All warnings have successfully been verified'
            status='success'
          />
        ) : null}
        {errorSubmissionFetch ? (
          <Alert
            className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
            message='Error fetching your submission data'
            status='error'
          >
            Please reload the page to try again.
          </Alert>
        ) : null}
        <div className='u-mt45 u-mb60'>
          &lt;&lt; PAGE CONTENT GOES HERE &gt;&gt;
        </div>
        {hasWarnings ? (
          <WellContainer className='u-mt30'>
            <Heading type='3'>Verify all warnings to continue</Heading>
            <Checkbox
              id='verify-warnings'
              label='All data are accurate, no corrections required. I have verified the accuracy of all data fields referenced by the warning validations.'
              onChange={onClickCheckbox}
              checked={isVerified}
              disabled={isLoading || isSubmissionAccepted(submission)}
              helperText={
                isSubmissionLoading ? (
                  <span className='mx-2'>
                    <Icon name='updating' className='mr-2' />
                    Loading...
                  </span>
                ) : null
              }
            />
          </WellContainer>
        ) : null}
        {formSubmitError ? (
          <Alert
            className='mb-[2.8125rem] mt-[1.875rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
            message='Unable to save your verification'
            status='error'
          >
            Please click the &quot;Save and continue&quot; button to try again.
          </Alert>
        ) : null}
        <div className='u-mb60'>
          <NavigationPrevious
            label='Go back to previous step'
            href={`/filing/${year}/${lei}/errors`}
          />
          <Button
            appearance='primary'
            className={classnames('mt-[1.875rem]')}
            iconRight={formSubmitLoading ? 'updating' : 'right'}
            label='Save and continue'
            onClick={onFormSubmit}
            size='default'
            disabled={!canContinue || formSubmitLoading}
          />
        </div>
      </FormWrapper>
    </>
  );
}

export default FilingWarnings;
