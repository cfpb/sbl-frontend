import WrapperPageContent from 'WrapperPageContent';
import { Button } from 'components/Button';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import { Paragraph, TextIntroduction } from 'design-system-react';
import FieldSummary from 'pages/Filing/FilingApp/FieldSummary';
import { getErrorsWarningsSummary } from 'pages/Filing/FilingApp/FilingErrors/FilingErrors.helpers';
import FilingErrorsAlerts, {
  FilingErrorsAlertsFooter,
} from 'pages/Filing/FilingApp/FilingErrors/FilingErrorsAlerts';
import { FilingSteps } from 'pages/Filing/FilingApp/FilingSteps';
import InstitutionHeading from 'pages/Filing/FilingApp/InstitutionHeading';
import { scrollToElement } from 'pages/ProfileForm/ProfileFormUtils';
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
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  } = useGetSubmissionLatest({ lei, filingPeriod: year });

  const {
    data: institution,
    isLoading: isLoadingInstitution,
    isError: isErrorInstitution,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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

  // Determines Alert and if 'Continue to next step' button is disabled
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
  const singleFieldCategory = isStep2 ? 'logic_errors' : 'syntax_errors';
  const singleFieldRowErrorsCount =
    actualDataGetSubmissionLatest?.validation_results?.[singleFieldCategory]
      .single_field_count ?? 0;
  const multiFieldRowErrorsCount =
    actualDataGetSubmissionLatest?.validation_results?.[singleFieldCategory]
      .multi_field_count ?? 0;
  const registerLevelRowErrorsCount =
    actualDataGetSubmissionLatest?.validation_results?.[singleFieldCategory]
      .register_count ?? 0;

  const onPreviousClick = (): void => {
    if (isStep2) {
      setIsStep2(false);
    } else {
      navigate(`/filing/${year}/${lei}/upload`);
    }
  };
  const [showFooterAlerts, setShowFooterAlerts] = useState(false);

  const onNextClick = (): void => {
    if (errorState) {
      scrollToElement('error-header-alert');
      setShowFooterAlerts(true);
    } else if (isStep2) {
      navigate(`/filing/${year}/${lei}/warnings`);
    } else {
      setIsStep2(true);
    }
  };

  const onDebugStepSwitch = (): void => setIsStep2(step => !step);

  if (isFetchingGetSubmissionLatest || isLoadingInstitution)
    return <LoadingContent />;

  return (
    <div id='resolve-errors'>
      <WrapperPageContent className='my-[1.875rem]'>
        <InstitutionHeading
          headingType='4'
          name={institution?.name}
          filingPeriod={year}
        />
      </WrapperPageContent>
      <FilingSteps />
      <FormWrapper>
        <FormHeaderWrapper>
          <TextIntroduction
            heading={`Resolve errors (${isStep2 ? 'logic' : 'syntax'})`}
            // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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
                    download the validation report (CSV) to identify the
                    specific issues that caused the validations to fail. Once
                    you’ve identified the underlying problems, make the
                    corrections to your register, and upload a new file.
                  </Paragraph>
                ) : (
                  <Paragraph>
                    If syntax errors were found, review the tables below or
                    download the validation report (CSV) to identify the
                    specific issues that caused the validations to fail. Once
                    you’ve identified the underlying problems, make the
                    corrections to your register, and upload a new file.
                  </Paragraph>
                )}
                {errorState && actualDataGetSubmissionLatest?.id ? (
                  <FilingFieldLinks
                    id='resolve-errors-listlinks'
                    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                    lei={lei}
                    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                    filingPeriod={year}
                    submissionId={actualDataGetSubmissionLatest.id}
                  />
                ) : null}
              </>
            }
          />
        </FormHeaderWrapper>
        <FilingErrorsAlerts
          {...{
            isStep2,
            errorState,
            errorGetSubmissionLatest,
          }}
        />
        <InstitutionFetchFailAlert isVisible={Boolean(isErrorInstitution)} />
        {!errorGetSubmissionLatest && (
          <>
            {/* SINGLE-FIELD ERRORS */}
            {errorState && actualDataGetSubmissionLatest?.id ? (
              <FieldSummary
                id='single-field-errors'
                heading={`Single-field errors: ${singleFieldRowErrorsCount.toLocaleString()} found`}
                fieldArray={singleFieldErrorsUsed}
                lei={lei}
                filingPeriod={year}
                submissionId={actualDataGetSubmissionLatest.id}
                bottomMargin={Boolean(isStep2)}
              >
                Each single-field validation pertains to only one specific field
                in each record. These validations check that the data held in an
                individual field match the values that are expected.
              </FieldSummary>
            ) : null}
            {isStep2 && errorState && actualDataGetSubmissionLatest?.id ? (
              <>
                {/* MULTI-FIELD ERRORS */}
                <FieldSummary
                  id='multi-field-errors'
                  heading={`Multi-field errors: ${multiFieldRowErrorsCount.toLocaleString()} found`}
                  fieldArray={logicErrorsMulti}
                  lei={lei}
                  filingPeriod={year}
                  submissionId={actualDataGetSubmissionLatest.id}
                  bottomMargin
                >
                  Multi-field validations check that the values of certain
                  fields make sense in combination with other values in the same
                  record.
                </FieldSummary>
                {/* REGISTER-LEVEL ERRORS */}
                <FieldSummary
                  id='register-level-errors'
                  heading={`Register-level errors: ${registerLevelRowErrorsCount.toLocaleString()} found`}
                  fieldArray={registerErrors}
                  lei={lei}
                  filingPeriod={year}
                  submissionId={actualDataGetSubmissionLatest.id}
                >
                  This validation checks that the register does not contain
                  duplicate IDs.
                </FieldSummary>
              </>
            ) : null}
            <FormButtonGroup isFilingStep className='mb-[1.875rem]'>
              <FilingNavButtons
                classNameButtonContainer='u-mb0'
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
                appearanceNext={errorState ? 'secondary' : 'primary'}
                labelNext={isStep2 ? 'Continue to next step' : 'Continue'}
              />
            </FormButtonGroup>
            {showFooterAlerts ? (
              <FilingErrorsAlertsFooter
                {...{
                  isStep2,
                  errorState,
                  errorGetSubmissionLatest,
                }}
              />
            ) : null}

            {/* NOTE: Will not show up in deployed */}
            {import.meta.env.DEV ? (
              <Button
                className='mt-0'
                appearance='primary'
                onClick={onDebugStepSwitch}
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
