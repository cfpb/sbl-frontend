import { Button } from 'components/Button';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import { Paragraph, TextIntroduction } from 'design-system-react';
import FieldSummary from 'pages/Filing/FilingApp/FieldSummary';
import {
  getErrorsWarningsSummary,
  getRecordsAffected,
} from 'pages/Filing/FilingApp/FilingErrors/FilingErrors.helpers';
import FilingErrorsAlerts from 'pages/Filing/FilingApp/FilingErrors/FilingErrorsAlerts';
import { FilingSteps } from 'pages/Filing/FilingApp/FilingSteps';
import InstitutionHeading from 'pages/Filing/FilingApp/InstitutionHeading';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FilingFieldLinks from '../FilingFieldLinks';
import { FilingNavButtons } from '../FilingNavButtons';
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

  // Count rows with errors per type (not total errors)
  const singleFieldRowErrorsCount = getRecordsAffected(
    singleFieldErrorsUsed,
  ).size;
  const multiFieldRowErrorsCount = getRecordsAffected(logicErrorsMulti).size;
  const registerLevelRowErrorsCount = getRecordsAffected(registerErrors).size;

  if (isFetchingGetSubmissionLatest || isLoadingInstitution)
    return <LoadingContent />;

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
                  Your register successfully passed syntax checks. If
                  applicable, review and correct errors in your register related
                  to inconsistent or inaccurate values. Your register must pass
                  these logic checks to continue to the next step.
                </>
              ) : (
                <>
                  Your register was successfully uploaded and validation checks
                  were performed. If applicable, review and correct errors
                  related to data type and format. We are unable to detect
                  errors or warnings related to logic until your register passes
                  these syntax checks.
                </>
              )
            }
            description={
              <>
                {isStep2 ? (
                  <Paragraph>
                    If logic errors were found, review the tables below or
                    download the validation report to identify the specific
                    issues that caused the validations to fail. Once you’ve
                    identified the underlying problems, make the corrections to
                    your register, and upload a new file.
                  </Paragraph>
                ) : (
                  <Paragraph>
                    If syntax errors were found, review the tables below or
                    download the validation report to identify the specific
                    issues that caused the validations to fail. Once you’ve
                    identified the underlying problems, make the corrections to
                    your register, and upload a new file.
                  </Paragraph>
                )}
                {errorState && actualDataGetSubmissionLatest?.id ? (
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
                heading={`Single-field errors found: ${singleFieldRowErrorsCount}`}
                fieldArray={singleFieldErrorsUsed}
                bottomMargin={Boolean(isStep2)}
              >
                Each single-field validation pertains to only one specific field
                in each record. These validations check that the data held in an
                individual field match the values that are expected.
              </FieldSummary>
            ) : null}
            {isStep2 && errorState ? (
              <>
                {/* MULTI-FIELD ERRORS */}
                <FieldSummary
                  id='multi-field-errors'
                  heading={`Multi-field errors found: ${multiFieldRowErrorsCount}`}
                  fieldArray={logicErrorsMulti}
                  showTableBorders
                  bottomMargin
                >
                  Multi-field validations check that the values of certain
                  fields make sense in combination with other values in the same
                  record.
                </FieldSummary>
                {/* REGISTER-LEVEL ERRORS */}
                <FieldSummary
                  id='register-level-errors'
                  heading={`Register-level errors found: ${registerLevelRowErrorsCount}`}
                  fieldArray={registerErrors}
                >
                  This validation checks that the register does not contain
                  duplicate IDs.
                </FieldSummary>
              </>
            ) : null}
            <FormButtonGroup isFilingStep>
              <FilingNavButtons
                classNameButtonContainer='u-mb0'
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
                isNextDisabled={errorState}
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
        {/* {errorState ? (
          <>
            <AlertFieldLevel
              message={`You must resolve ${
                isStep2 ? 'logic errors' : 'syntax errors'
              } to continue with the filing process`}
              status='error'
            />
            <Alert
              className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
              message={`You must resolve ${
                isStep2 ? 'logic errors' : 'syntax errors'
              } to continue with the filing process`}
              status='error'
            />
          </>
        ) : null} */}
      </FormWrapper>
    </div>
  );
}

export default FilingErrors;
