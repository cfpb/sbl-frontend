import submitWarningsAccept from 'api/requests/submitWarningsVerified';
import useSblAuth from 'api/useSblAuth';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Link } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import SectionIntro from 'components/SectionIntro';
import {
  Alert,
  Checkbox,
  Paragraph,
  TextIntroduction,
  WellContainer,
} from 'design-system-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import { sblHelpMail } from 'utils/common';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FieldSummary from '../FieldSummary';
import {
  getErrorsWarningsSummary,
  getRecordsAffected,
} from '../FilingErrors/FilingErrors.helpers';
import FilingFieldLinks from '../FilingFieldLinks';
import { FilingNavButtons } from '../FilingNavButtons';
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

  // Count rows with warnings per type (not total errors)
  const singleFieldRowWarningsCount =
    getRecordsAffected(logicWarningsSingle).size;
  const multiFieldRowWarningsCount =
    getRecordsAffected(logicWarningsMulti).size;

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

  const onPreviousClick = (): void => navigate(`/filing/${year}/${lei}/errors`);

  return (
    <>
      <FilingSteps />
      <FormWrapper>
        <FormHeaderWrapper>
          <div className='mb-[0.9375rem]'>
            <InstitutionHeading
              eyebrow
              name={institution?.name}
              filingPeriod={year}
            />
          </div>
          <TextIntroduction
            heading='Review warnings'
            subheading='Warning validations check for unexpected values that could indicate a mistake in your register. If applicable, review and verify the accuracy of all register values flagged by warning validations to continue to the next step.'
            description={
              <>
                <Paragraph>
                  If warnings were found, review the tables below or download
                  the validation report (CSV) to determine if the values flagged
                  with warning validations require action. If there are
                  underlying problems, make the corrections to your register,
                  and upload a new file.
                </Paragraph>
                {hasWarnings &&
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-optional-chain
                submission?.id ? (
                  <FilingFieldLinks
                    id='resolve-errors-listlinks'
                    lei={lei}
                    filingPeriod={year}
                    submissionId={submission.id}
                  />
                ) : null}
              </>
            }
          />
        </FormHeaderWrapper>
        <InstitutionFetchFailAlert isVisible={Boolean(errorInstitutionFetch)} />
        <FilingWarningsAlerts
          {...{
            hasWarnings,
            hasSubmissionAccepted: isSubmissionAccepted(submission),
            hasSubmissionError: errorSubmissionFetch,
          }}
        />
        {!errorSubmissionFetch && hasWarnings ? (
          <div className='u-mt45'>
            {/* SINGLE-FIELD WARNINGS */}
            <FieldSummary
              id='single-field-warnings'
              heading={`Single-field warnings: ${singleFieldRowWarningsCount.toLocaleString()} found`}
              fieldArray={logicWarningsSingle}
              bottomMargin
            >
              Each single-field validation pertains to only one specific field
              in each record. These validations check that the data held in an
              individual field match the values that are expected.
            </FieldSummary>

            {/* MULTI-FIELD WARNINGS */}
            <FieldSummary
              id='multi-field-warnings'
              heading={`Multi-field warnings: ${multiFieldRowWarningsCount.toLocaleString()} found`}
              fieldArray={logicWarningsMulti}
              bottomMargin
            >
              Multi-field validations check that the values of certain fields
              make sense in combination with other values in the same record.
            </FieldSummary>

            <SectionIntro
              className='mt-[2.8125rem]'
              heading='Verify flagged register values'
            >
              In order to continue, you must correct or verify the accuracy of
              register values flagged by warning validations.
            </SectionIntro>

            <WellContainer className='mt-[1.875rem] w-full'>
              <Checkbox
                className='box-border max-w-[41.875rem]'
                id='verify-warnings'
                label='I verify the accuracy of register values flagged by warning validations and no corrections are required.'
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
          <Paragraph>
            There was an issue saving your Submission verification. Please click
            the &quot;Save and continue&quot; button to try again. If this issue
            persists,
            <Link href={sblHelpMail}>contact our support staff</Link>.
          </Paragraph>
        </Alert>

        <FormButtonGroup
          className={hasWarnings ? '' : '-mt-[0.9375rem]'}
          isFilingStep
        >
          <FilingNavButtons
            classNameButtonContainer='u-mb0'
            onPreviousClick={onPreviousClick}
            onNextClick={onFormSubmit}
            isNextDisabled={!canContinue || formSubmitLoading}
            isLoading={formSubmitLoading}
          />
        </FormButtonGroup>
      </FormWrapper>
    </>
  );
}

export default FilingWarnings;
