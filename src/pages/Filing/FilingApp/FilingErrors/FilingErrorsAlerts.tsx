import { Alert } from 'design-system-react';
import { ValidationInitialFetchFailAlert } from 'pages/Filing/FilingApp/FileSubmission.data';

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
      message='You must resolve syntax errors to continue.'
      status='error'
      id='error-header-alert'
    />
  );
}

function LogicErrorsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='You must resolve all errors to continue to the next step.'
      status='error'
      id='error-header-alert'
    />
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
