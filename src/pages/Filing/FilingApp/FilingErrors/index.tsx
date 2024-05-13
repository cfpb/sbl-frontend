import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import { Button, TextIntroduction } from 'design-system-react';
import FieldSummary from 'pages/Filing/FilingApp/FieldSummary';
import { getErrorsWarningsSummary } from 'pages/Filing/FilingApp/FilingErrors/FilingErrors.helpers';
import FilingErrorsAlerts from 'pages/Filing/FilingApp/FilingErrors/FilingErrorsAlerts';
import { FilingSteps } from 'pages/Filing/FilingApp/FilingSteps';
import InstitutionHeading from 'pages/Filing/FilingApp/InstitutionHeading';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FilingFieldLinks from '../FilingFieldLinks';
import { InstitutionFetchFailAlert } from '../FilingWarnings/FilingWarningsAlerts';

function FilingErrors(): JSX.Element {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const {
    isFetching: isFetchingGetSubmissionLatest,
    error: errorGetSubmissionLatest,
    data: actualDataGetSubmissionLatest,
  } = useGetSubmissionLatest({ lei, filingPeriod: year });

  const {
    data: institution,
    isLoading: isLoadingInstitution,
    isError: isErrorInstitution,
  } = useInstitutionDetails(lei);

  const [isStep2, setIsStep2] = useState<boolean>(false);

  const formattedData = useMemo(
    () => getErrorsWarningsSummary(actualDataGetSubmissionLatest),
    [actualDataGetSubmissionLatest],
  );

  const {
    syntaxErrorsSingle,
    logicErrorsSingle,
    logicErrorsMulti,
    registerErrors,
  } = formattedData;

  // Determines Alert and if 'Save and continue' button is disabled
  const errorState =
    (!isStep2 && syntaxErrorsSingle.length > 0) ||
    (isStep2 &&
      [logicErrorsSingle, logicErrorsMulti, registerErrors].some(
        array => array.length > 0,
      ));

  const singleFieldErrorsUsed = isStep2
    ? logicErrorsSingle
    : syntaxErrorsSingle;

  if (isFetchingGetSubmissionLatest || isLoadingInstitution)
    return <LoadingContent />;

  console.log(
    `${lei}-${year} file/submit info:`,
    actualDataGetSubmissionLatest,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unnecessary-condition

  console.log(
    'errors warnings summary:',
    getErrorsWarningsSummary(actualDataGetSubmissionLatest),
  );

  const onPreviousClick = (): void => {
    if (isStep2) {
      setIsStep2(false);
    } else {
      navigate(`/filing/${year}/${lei}/upload`);
    }
  };

  const onNextClick = (): void => {
    if (isStep2) {
      navigate(`/filing/${year}/${lei}/warnings`);
    } else {
      setIsStep2(true);
    }
  };

  return (
    <div id='resolve-errors' className='min-h-[80vh]'>
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
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            heading={`Resolve errors (${isStep2 ? 2 : 1} of 2)`}
            subheading={
              isStep2 ? (
                <>
                  Next, our system checks your register to confirm that there
                  are no inconsistencies or mistakes in how the information is
                  organized or represented. Your register must pass these logic
                  checks to continue to the next step.
                </>
              ) : (
                <>
                  First, our system checks that each value in your register
                  meets data type and format requirements. We are unable to
                  accurately detect consequent errors or warnings until each
                  record in your register passes these syntax checks.
                </>
              )
            }
            description={
              <>
                If applicable, review the tables below or download the
                validation report to identify the specific issues that caused
                the validation to fail. Once you’ve identified the underlying
                problems, make the corrections to your register, and upload a
                new file.
                {!errorGetSubmissionLatest &&
                actualDataGetSubmissionLatest?.id ? (
                  <FilingFieldLinks
                    id='resolve-errors-listlinks'
                    lei={lei}
                    filingPeriod={year}
                    submissionId={actualDataGetSubmissionLatest.id}
                  />
                ) : null}
              </>
            }
          />
        </FormHeaderWrapper>
        <InstitutionFetchFailAlert isVisible={Boolean(isErrorInstitution)} />
        <FilingErrorsAlerts
          {...{
            isStep2,
            errorState,
            errorGetSubmissionLatest,
          }}
        />
        {!errorGetSubmissionLatest && (
          <>
            {/* SINGLE-FIELD ERRORS */}
            {errorState ? (
              <FieldSummary
                id='single-field-errors'
                heading={`Single-field errors found: ${singleFieldErrorsUsed.length}`}
                fieldArray={singleFieldErrorsUsed}
                bottomMargin={!!isStep2}
              >
                Each single-field error pertains to only one specific field in
                each record. These error validations check that the data held in
                an individual field match the values that are expected.
              </FieldSummary>
            ) : null}
            {isStep2 && errorState ? (
              <>
                {/* MULTI-FIELD ERRORS */}
                <FieldSummary
                  id='multi-field-errors'
                  heading={`Multi-field errors found: ${logicErrorsMulti.length}`}
                  fieldArray={logicErrorsMulti}
                  bottomMargin
                >
                  Multi-field error validations check that the values of certain
                  fields make sense in combination with other values in the same
                  record.
                </FieldSummary>
                {/* REGISTER-LEVEL ERRORS */}
                <FieldSummary
                  id='register-level-errors'
                  heading={`Register-level errors found: ${registerErrors.length}`}
                  fieldArray={registerErrors}
                >
                  This validation checks that the register does not contain
                  duplicate IDs.
                </FieldSummary>
              </>
            ) : null}
            {/* <FilingNavButtons
            hrefPrevious={`/filing/${year}/${lei}/upload`}
            hrefNext={`/filing/${year}/${lei}/warnings`}
            isStepComplete // TODO: Derive actual step status
          /> */}
            <FormButtonGroup isFilingStep>
              <Button
                appearance='secondary'
                iconLeft='left'
                label='Go back to previous step'
                onClick={onPreviousClick}
                size='default'
              />
              <Button
                appearance='primary'
                disabled={errorState}
                iconRight='right'
                label='Save and continue'
                onClick={onNextClick}
                size='default'
              />
            </FormButtonGroup>
            {/* NOTE: Will not show up in deployed */}
            {import.meta.env.DEV ? (
              <Button
                className='mt-[1.875rem]'
                appearance='primary'
                onClick={() => setIsStep2(step => !step)}
                label='Swap Step (debug only)'
                size='default'
                type='button'
              />
            ) : null}
          </>
        )}
      </FormWrapper>
    </div>
  );
}

export default FilingErrors;
