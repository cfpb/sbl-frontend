import { Link } from 'components/Link';
import { Alert } from 'design-system-react';
import { ValidationInitialFetchFailAlert } from 'pages/Filing/FilingApp/FileSubmission.data';
import { dataValidationLink, sblHelpMail } from 'utils/common';

function SuccessWarningsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='All warnings have been successfully verified'
      status='success'
    />
  );
}

function WarningsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='Warnings were found in your register'
      status='warning'
    >
      There were unexpected values in your file that may require action. Review
      these warnings and make sure your register meets the requirements detailed
      in the filing instructions guide (
      <Link target='_blank' href={dataValidationLink}>
        section 4, &quot;Data validation&quot;
      </Link>
      ). If necessary, make the corrections and re-upload your file.
    </Alert>
  );
}

export function InstitutionFetchFailAlert({
  isVisible = true,
}: {
  // eslint-disable-next-line react/require-default-props
  isVisible?: boolean;
}): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='The institution data service is unavailable'
      status='error'
      isVisible={isVisible}
    >
      There was a connection issue or our service may be temporarily
      unavailable. Make sure your computer is connected to the internet, and try
      again. If this issue persists,{' '}
      <Link href={sblHelpMail}>email our support staff</Link>.
    </Alert>
  );
}

interface FilingWarningsAlertsProperties {
  hasWarnings: boolean;
  hasSubmissionError: unknown;
}

function FilingWarningsAlerts({
  hasWarnings,
  hasSubmissionError,
}: FilingWarningsAlertsProperties): JSX.Element {
  return hasSubmissionError ? (
    <ValidationInitialFetchFailAlert />
  ) : hasWarnings ? (
    <WarningsAlert />
  ) : (
    <SuccessWarningsAlert />
  );
}

export default FilingWarningsAlerts;
