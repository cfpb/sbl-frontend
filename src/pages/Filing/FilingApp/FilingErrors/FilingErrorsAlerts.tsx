import { Alert } from 'design-system-react';
import { Link } from 'react-router-dom';
import { dataValidationLink, sblHelpMail } from 'utils/common';

interface FilingErrorsAlertsProperties {
  syntaxErrorsSingle: unknown[];
  logicErrorsSingle: unknown[];
  logicErrorsMulti: unknown[];
  registerErrors: unknown[];
  isStep2: boolean;
}

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
      <Link href={dataValidationLink}>
        section 4, &quot;Data validation&quot;
      </Link>
      ) and try again. If this issue persists,{' '}
      <Link href={sblHelpMail}>email our support staff</Link>.
    </Alert>
  );
}

function FilingErrorsAlerts({
  syntaxErrorsSingle,
  logicErrorsSingle,
  logicErrorsMulti,
  registerErrors,
  isStep2,
}: FilingErrorsAlertsProperties): JSX.Element {
  const errorState =
    (!isStep2 && syntaxErrorsSingle.length > 0) ||
    (isStep2 &&
      [logicErrorsSingle, logicErrorsMulti, registerErrors].some(
        array => array.length > 0,
      ));
  return errorState ? <ErrorsAlert /> : <SuccessAlert isStep2={isStep2} />;
}

export default FilingErrorsAlerts;
