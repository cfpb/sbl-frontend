import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { ListLink } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import { Button, List, TextIntroduction } from 'design-system-react';
import FieldSummary from 'pages/Filing/FilingApp/FieldSummary';
import { getErrorsWarningsSummary } from 'pages/Filing/FilingApp/FilingErrors/FilingErrors.helpers';
import { FilingSteps } from 'pages/Filing/FilingApp/FilingSteps';
import InstitutionHeading from 'pages/Filing/FilingApp/InstitutionHeading';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FilingWarningsAlerts from './FilingWarningsAlerts';

function FilingWarnings(): JSX.Element {
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

  const institutionName = isLoadingInstitution
    ? 'Loading...'
    : isErrorInstitution
      ? ''
      : institution.name;

  const formattedData = useMemo(
    () => getErrorsWarningsSummary(actualDataGetSubmissionLatest),
    [actualDataGetSubmissionLatest],
  );

  const { logicWarningsMulti, logicWarningsSingle } = formattedData;

  // Determines Alert and if 'Save and continue' button is disabled
  const errorState = [logicWarningsMulti, logicWarningsSingle].some(
    array => array.length > 0,
  );

  if (isFetchingGetSubmissionLatest) return <LoadingContent />;

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
    navigate(`/filing/${year}/${lei}/errors`);
  };

  const onNextClick = (): void => {
    navigate(`/filing/${year}/${lei}/contact`);
  };

  return (
    <div id='resolve-warnings' className='min-h-[80vh]'>
      <FilingSteps />
      <FormWrapper>
        <FormHeaderWrapper>
          <div className='mb-[0.9375rem]'>
            <InstitutionHeading
              eyebrow
              name={institutionName}
              filingPeriod={year}
            />
          </div>
          <TextIntroduction
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            heading='Review warnings'
            subheading='Warning validations check for unexpected values that could indicate a mistake in your register. You must verify the accuracy of all register values flagged by warning validations to continue to the next step.'
            description={
              <>
                If applicable, review the tables below or download the
                validation report to determine if the values flagged with
                warning validations require action. If there are underlying
                problems, make the corrections, and upload a new file.
                {!errorGetSubmissionLatest && (
                  <div
                    id='resolve-warnings-listlinks'
                    className='mt-[1.875rem]'
                  >
                    <List isLinks>
                      <ListLink href='#'>Download validation report</ListLink>
                      <ListLink href={`/filing/${year}/${lei}/upload`}>
                        Upload a new file
                      </ListLink>
                    </List>
                  </div>
                )}
              </>
            }
          />
        </FormHeaderWrapper>
        <FilingWarningsAlerts
          {...{
            errorState,
            errorGetSubmissionLatest,
          }}
        />
        {!errorGetSubmissionLatest && (
          <>
            {/* SINGLE-FIELD WARNINGS */}
            {errorState ? (
              <FieldSummary
                id='single-field-warnings'
                heading={`Single-field warnings found: ${logicWarningsSingle.length}`}
                fieldArray={logicWarningsSingle}
                bottomMargin
              >
                Each single-field validation pertains to only one specific field
                in each record. These validations check that the data held in an
                individual field match the values that are expected.
              </FieldSummary>
            ) : null}
            {errorState ? (
              <>
                {/* MULTI-FIELD WARNINGS */}
                <FieldSummary
                  id='multi-field-warnings'
                  heading={`Multi-field warnings found: ${logicWarningsMulti.length}`}
                  fieldArray={logicWarningsMulti}
                  bottomMargin
                >
                  Multi-field validations check that the values of certain
                  fields make sense in combination with other values in the same
                  record.
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
                // disabled={errorState}
                iconRight='right'
                label='Save and Continue'
                onClick={onNextClick}
                size='default'
              />
            </FormButtonGroup>
          </>
        )}
      </FormWrapper>
    </div>
  );
}

export default FilingWarnings;
