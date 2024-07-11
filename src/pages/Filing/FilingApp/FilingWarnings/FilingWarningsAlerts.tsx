import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { Link } from 'components/Link';
import { Alert, Paragraph } from 'design-system-react';
import { ValidationInitialFetchFailAlert } from 'pages/Filing/FilingApp/FileSubmission.data';
import { dataValidationLink } from 'utils/common';

function SuccessVerifiedWarningsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='All warnings have been successfully verified'
      status='success'
    />
  );
}

function SuccessWarningsAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[1.875rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='Your register contains no warnings'
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
      <Paragraph>
        Unexpected values were found in your register that may require action.
        Make sure your register meets the requirements detailed in the filing
        instructions guide (
        <Link href={dataValidationLink}>
          section 4, &quot;Data validation&quot;
        </Link>
        ). If necessary, make the corrections, and upload a new file.
      </Paragraph>
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
    <AlertApiUnavailable
      message='The institution data service is unavailable'
      isVisible={isVisible}
    />
  );
}

interface FilingWarningsAlertsProperties {
  hasWarnings: boolean;
  hasSubmissionError: unknown;
  hasSubmissionAccepted: boolean;
}

function FilingWarningsAlerts({
  hasWarnings,
  hasSubmissionError,
  hasSubmissionAccepted,
}: FilingWarningsAlertsProperties): JSX.Element {
  return hasSubmissionError ? (
    <ValidationInitialFetchFailAlert />
  ) : hasWarnings ? (
    hasSubmissionAccepted ? (
      <SuccessVerifiedWarningsAlert />
    ) : (
      <WarningsAlert />
    )
  ) : (
    <SuccessWarningsAlert />
  );
}

export default FilingWarningsAlerts;
