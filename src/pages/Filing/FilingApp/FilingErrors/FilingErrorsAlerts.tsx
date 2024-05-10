import Alert from 'components/Alert';
import { Link } from 'components/Link';
import { ValidationInitialFetchFailAlert } from 'pages/Filing/FilingApp/FileSubmission.data';
import { dataValidationLink, sblHelpMail } from 'utils/common';

function SuccessAlert({ isStep2 }: { isStep2: boolean }): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={`Your register contains no ${
        isStep2 ? 'logic' : 'syntax'
      } errors`}
      status='success'
    />
  );
}

function ErrorsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='Errors were found in your register'
      status='error'
    >
      There may be an issue with the data type or format of one or more values
      in your file. Make sure your register meets the requirements detailed in
      the filing instructions guide (
      <Link target='_blank' href={dataValidationLink}>
        section 4, &quot;Data validation&quot;
      </Link>
      ) and try again. If this issue persists,{' '}
      <Link target='_blank' href={sblHelpMail}>
        email our support staff
      </Link>
      .
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
  ) : errorState ? (
    <ErrorsAlert />
  ) : (
    <SuccessAlert isStep2={isStep2} />
  );
}

export default FilingErrorsAlerts;
