import submitWarningsAccept from 'api/requests/submitWarningsVerified';
import useSblAuth from 'api/useSblAuth';
import FormButtonGroup from 'components/FormButtonGroup';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import {
  Alert,
  Button,
  Checkbox,
  Heading,
  List,
  ListLink,
  TextIntroduction,
  WellContainer,
} from 'design-system-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import { sblHelpMail } from 'utils/common';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FieldSummary from '../FieldSummary';
import { getErrorsWarningsSummary } from '../FilingErrors/FilingErrors.helpers';
import { NavigationPrevious } from '../FilingNavButtons';
import { FilingSteps } from '../FilingSteps';
import InstitutionHeading from '../InstitutionHeading';
import FilingWarningsAlerts, {
  InstitutionFetchFailAlert,
} from './FilingWarningsAlerts';

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
  } = useGetSubmissionLatest({ lei, filingPeriod: year });

  const {
    data: institution,
    isLoading: isInstitutionLoading,
    isError: errorInstitutionFetch,
  } = useInstitutionDetails(lei);

  const formattedData = useMemo(
    () => getErrorsWarningsSummary(submission),
    [submission],
  );

  if (isSubmissionLoading || isInstitutionLoading) return <LoadingContent />;

  /* 
    Derived data
  */
  const { logicWarningsMulti, logicWarningsSingle } = formattedData;

  const hasWarnings = [logicWarningsMulti, logicWarningsSingle].some(
    array => array.length > 0,
  );

  const isVerified =
    isSubmissionAccepted(submission) || boxChecked || !hasWarnings;

  const canContinue = !formSubmitLoading && !errorSubmissionFetch && isVerified;

  /* 
    Event handlers 
  */
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

    // TODO: Refactor to use useMutation
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

  const onUploadNewFile = (): void => navigate(`/filing/${year}/${lei}/upload`);

  return (
    <>
      <FilingSteps />
      <FormWrapper>
        <div className='u-mb30'>
          <InstitutionHeading
            eyebrow
            name={institution?.name}
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
              {!errorSubmissionFetch && (
                <div id='resolve-warnings-listlinks' className='mt-[1.875rem]'>
                  <List isLinks>
                    <ListLink href='#'>Download validation report</ListLink>
                    <Button
                      asLink
                      onClick={onUploadNewFile}
                      label='Upload a new file'
                    />
                  </List>
                </div>
              )}
            </>
          }
        />
        <InstitutionFetchFailAlert isVisible={errorInstitutionFetch} />
        <FilingWarningsAlerts
          {...{
            hasWarnings: hasWarnings && !isSubmissionAccepted(submission),
            hasSubmissionError: errorSubmissionFetch,
          }}
        />

        {!errorSubmissionFetch && hasWarnings ? (
          <div className='u-mt45'>
            {/* SINGLE-FIELD WARNINGS */}
            <FieldSummary
              id='single-field-warnings'
              heading={`Single-field warnings found: ${logicWarningsSingle.length}`}
              fieldArray={logicWarningsSingle}
              bottomMargin
            >
              Each single-field validation pertains to only one specific field
              in each record. These validations check that the data held in an
              individual field match the values that are expected.
            </FieldSummary>

            {/* MULTI-FIELD WARNINGS */}
            <FieldSummary
              id='multi-field-warnings'
              heading={`Multi-field warnings found: ${logicWarningsMulti.length}`}
              fieldArray={logicWarningsMulti}
              bottomMargin
            >
              Multi-field validations check that the values of certain fields
              make sense in combination with other values in the same record.
            </FieldSummary>

            <WellContainer className='u-mt30'>
              <Heading type='3'>Verify all warnings to continue</Heading>
              <Checkbox
                id='verify-warnings'
                label='All data are accurate, no corrections required. I have verified the accuracy of all data fields referenced by the warning validations.'
                onChange={onClickCheckbox}
                checked={isVerified}
                disabled={formSubmitLoading || isSubmissionAccepted(submission)}
              />
            </WellContainer>
          </div>
        ) : null}

        <Alert
          className='mb-[2.8125rem] mt-[1.875rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
          message='Unable to save your verification'
          status='error'
          isVisible={!!formSubmitError}
        >
          There was an issue saving your Submission verification. Please click
          the &quot;Save and continue&quot; button to try again. If this issue
          persists,
          <Link href={sblHelpMail}>contact our support staff</Link>.
        </Alert>

        <FormButtonGroup isFilingStep>
          <NavigationPrevious
            label='Go back to previous step'
            href={`/filing/${year}/${lei}/errors`}
          />
          <Button
            appearance='primary'
            className='mt-[1.875rem]'
            iconRight={formSubmitLoading ? 'updating' : 'right'}
            label='Save and continue'
            onClick={onFormSubmit}
            size='default'
            disabled={!canContinue || formSubmitLoading}
          />
        </FormButtonGroup>
      </FormWrapper>
    </>
  );
}

export default FilingWarnings;
