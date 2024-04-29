import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Link, ListLink } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import SectionIntro from 'components/SectionIntro';
import { Alert, List, TextIntroduction } from 'design-system-react';
import { useParams } from 'react-router-dom';
import { dataValidationLink, sblHelpMail } from 'utils/common';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FilingNavButtons from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';
import InstitutionHeading from './InstitutionHeading';

const getErrorsWarnings = (property = 'logic_errors', data) => {
  const summary = {
    singles: [],
    multis: [],
    registers: []
  };

  if (!data.submission?.validation_json?.[property]) return summary;

  summary.singles = data.submission.validation_json[property]?.details.filter(
    object => object?.validation?.scope === 'single-field',
  );

  summary.multis = data.submission.validation_json[property]?.details.filter(
    object => object?.validation?.scope === 'multi-field',
  );
  
  summary.registers = data.submission.validation_json[property]?.details.filter(
    object => object?.validation?.scope === 'register',
  );

  return summary;
};

const getErrorsWarningsSummary = data => {
  const syntaxErrors = getErrorsWarnings('syntax_errors', data);
  const logicErrors = getErrorsWarnings('logic_errors', data);
  const logicWarnings = getErrorsWarnings('logic_warnings', data);
  const registerErrors = [...syntaxErrors.registers, ...logicErrors.registers];
  const singleErrors = [...syntaxErrors.singles, ...logicErrors.singles];
  const multiErrors = [...syntaxErrors.multis, ...logicErrors.multis];
  const singleWarnings = [...logicWarnings.singles];
  const multiWarnings = [...logicWarnings.multis];
  
  return {
    syntaxErrors,
    logicErrors,
    logicWarnings,
    registerErrors,
    singleErrors,
    multiErrors,
    singleWarnings,
    multiWarnings,
  };
};

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

  if (data.isLoading) return <LoadingContent />;

  console.log(`${lei}-${year} file/submit info:`, data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unnecessary-condition

  console.log('errors warnings summary:', getErrorsWarningsSummary(data));
  const singleErrorsLength = getErrorsWarningsSummary(data).singleErrors.length;
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
              heading='Resolve errors (1 of 2)'
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
                      <ListLink href='#'>Upload a new file</ListLink>
                    </List>
                  </div>
                </>
              }
            />
          </FormHeaderWrapper>
          <Alert
            className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
            message='Errors were found in your register'
            status='error'
          >
            There may be an issue with the data type or format of one or more
            values in your file. Make sure your register meets the requirements
            detailed in the filing instructions guide (
            <Link href={dataValidationLink}>
              section 4, &quot;Data validation&quot;
            </Link>
            ) and try again. If this issue persists,{' '}
            <Link href={sblHelpMail}>email our support staff</Link>.
          </Alert>
          <SectionIntro
            heading={`Single-field errors found: ${singleErrorsLength}`}
          >
            Each single-field error pertains to only one specific field in each
            record. These error validations check that the data held in an
            individual field match the values that are expected.
          </SectionIntro>

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
