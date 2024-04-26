import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { TextIntroduction } from 'design-system-react';
import { useParams } from 'react-router-dom';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import { FilingSteps } from './FilingSteps';
import InstitutionHeading from './InstitutionHeading';

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

  console.log(`${lei}-${year} file/submit info:`, data);

  // { error, filing, isLoading, submission }

  return (
    <>
      <div id='file-submission' className='min-h-[80vh]'>
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
                </>
              }
            />
          </FormHeaderWrapper>
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
