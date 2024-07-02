import { Link } from 'components/Link';
import { Alert, Paragraph } from 'design-system-react';
import { ValidationInitialFetchFailAlert } from 'pages/Filing/FilingApp/FileSubmission.data';
import { dataValidationLink } from 'utils/common';

function SuccessAlert({ isStep2 }: { isStep2: boolean }): JSX.Element {
  return (
    <Alert
      className='mb-[1.875rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={`Your register contains no ${
        isStep2 ? 'logic' : 'syntax'
      } errors`}
      status='success'
    />
  );
}

function SyntaxErrorsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='Your register contains syntax errors'
      status='error'
      id='error-header-alert'
    >
      <Paragraph>
        There may be an issue with the data type or format of one or more values
        in your file. Make sure your register meets the requirements detailed in
        the filing instructions guide (
        <Link href={dataValidationLink}>
          section 4, &quot;Data validation&quot;
        </Link>
        ), make the corrections, and upload a new file.
      </Paragraph>
    </Alert>
  );
}

function LogicErrorsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='Your register contains logic errors'
      status='error'
      id='error-header-alert'
    >
      <Paragraph>
        There is missing data, incorrect data, or conflicting information in
        your file. Make sure your register meets the requirements detailed in
        the filing instructions guide (
        <Link href={dataValidationLink}>
          section 4, &quot;Data validation&quot;
        </Link>
        ), make the corrections, and upload a new file.
      </Paragraph>
    </Alert>
  );
}

interface FilingErrorsAlertsProperties {
  isStep2: boolean;
  errorState: boolean;
  errorGetSubmissionLatest: unknown;
}

function FilingErrorsAlerts({
  isStep2,
  errorState,
  errorGetSubmissionLatest,
}: FilingErrorsAlertsProperties): JSX.Element {
  return errorGetSubmissionLatest ? (
    <ValidationInitialFetchFailAlert />
  ) : errorState && isStep2 ? (
    <LogicErrorsAlert />
  ) : errorState && !isStep2 ? (
    <SyntaxErrorsAlert />
  ) : (
    <SuccessAlert isStep2={isStep2} />
  );
}

export default FilingErrorsAlerts;
