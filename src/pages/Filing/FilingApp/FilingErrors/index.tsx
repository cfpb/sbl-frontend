import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { ListLink } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import { Button, List, TextIntroduction } from 'design-system-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FilingNavButtons from '../FilingNavButtons';
import { FilingSteps } from '../FilingSteps';
import InstitutionHeading from '../InstitutionHeading';
import { getErrorsWarningsSummary } from './FilingErrors.helpers';
import FilingErrorsAlerts from './FilingErrorsAlerts';
import MultiFieldErrorsSummary from './MultiFieldErrorsSummary';
import SingleFieldErrorsSummary from './SingleFieldErrorsSummary';

function FilingErrors(): JSX.Element {
  const { lei, year } = useParams();
  const data = useFilingAndSubmissionInfo({
    lei,
    filingPeriod: year,
  });

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

  const [isStep2, setIsStep2] = useState<boolean>(false);
  const formattedData = useMemo(() => getErrorsWarningsSummary(data), [data]);

  const {
    syntaxErrorsSingle,
    logicErrorsSingle,
    logicErrorsMulti,
    registerErrors,
  } = formattedData;
  formattedData;

  if (data.isLoading) return <LoadingContent />;

  console.log(`${lei}-${year} file/submit info:`, data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unnecessary-condition

  console.log('errors warnings summary:', getErrorsWarningsSummary(data));

  // TODO: filter single-field and multi-field

  // TODO: Doublecheck the user's filing/submission data -- redirect if the step is incorrect
  // if (typeof logicErrorsCount !== 'number' || logicErrorsCount < One)

  // { error, filing, isLoading, submission }

  return (
    <>
      <div id='resolve-errors' className='min-h-[80vh]'>
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
              heading={`Resolve errors (${isStep2 ? 2 : 1} of 2)`}
              subheading='First, our system checks that each value in your register meets data type and format requirements. We are unable to accurately detect consequent errors or warnings until each record in your register passes these syntax checks.'
              description={
                <>
                  If applicable, review the tables below or download the
                  validation report to identify the specific issues that caused
                  the validation to fail. Once you’ve identified the underlying
                  problems, make the corrections to your register, and upload a
                  new file.
                  <div id='resolve-errors-listlinks' className='mt-[1.875rem]'>
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
          </FormHeaderWrapper>
          <FilingErrorsAlerts
            {...{
              syntaxErrorsSingle,
              logicErrorsSingle,
              logicErrorsMulti,
              registerErrors,
              isStep2,
            }}
          />
          {/* 60px margin between SingleFieldErrors and MultiFieldErrors */}
          <div className={isStep2 ? 'mb-[3.75rem]' : ''}>
            <SingleFieldErrorsSummary
              singleErrors={isStep2 ? logicErrorsSingle : syntaxErrorsSingle}
            />
          </div>
          {isStep2 ? (
            <MultiFieldErrorsSummary multiErrors={logicErrorsMulti} />
          ) : null}
          <Button
            appearance='primary'
            onClick={() => setIsStep2(step => !step)}
            label='Swap Step'
            size='default'
            type='button'
          />
          <FilingNavButtons
            hrefPrevious={`/filing/${year}/${lei}/upload`}
            hrefNext={`/filing/${year}/${lei}/warnings`}
            isStepComplete // TODO: Derive actual step status
          />
        </FormWrapper>
      </div>
      {/* <FilingSteps />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            ERROR CONTENT GOES HERE
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <FilingNavButtons
              hrefPrevious={`/filing/${year}/${lei}/upload`}
              hrefNext={`/filing/${year}/${lei}/warnings`}
              isStepComplete // TODO: Derive actual step status
            />
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper> */}
    </>
  );
}

export default FilingErrors;
