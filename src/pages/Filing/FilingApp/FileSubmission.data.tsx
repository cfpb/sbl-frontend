import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { Link } from 'components/Link';
import { Alert, Paragraph } from 'design-system-react';
import { FileSubmissionState } from 'types/filingTypes';
import { fileFormatLink, sblHelpMail } from 'utils/common';

const uploadErrorSubheading = 'There was a problem uploading your file';
const validationErrorSubheading =
  'There was a problem performing validation checks on your file';

function SuccessAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='Your file was successfully uploaded and validation checks were performed'
      status='success'
    />
  );
}

export function ValidationInitialFetchFailAlert(): JSX.Element {
  return (
    <AlertApiUnavailable
      message='The filing service is unavailable'
      id='error-header-alert'
    />
  );
}

export function UploadErrorGeneralAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={uploadErrorSubheading}
      status='error'
      id='error-header-alert'
      aria-live='polite'
      aria-atomic='true'
    >
      <Paragraph>
        An unknown error occurred during file upload. If this issue persists,{' '}
        <Link href={sblHelpMail}>email our support staff</Link>.
      </Paragraph>
    </Alert>
  );
}

export function ValidationErrorGeneralAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={validationErrorSubheading}
      status='error'
      aria-live='polite'
      aria-atomic='true'
    >
      <Paragraph>
        An unknown error occurred while performing validation checks on your
        file. If this issue persists,{' '}
        <Link href={sblHelpMail}>email our support staff</Link>.
      </Paragraph>
    </Alert>
  );
}

function ValidationErrorTimeoutAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={validationErrorSubheading}
      status='error'
      aria-live='polite'
      aria-atomic='true'
    >
      <Paragraph>
        Our system was not able to process your file within the allotted
        timeframe. Try re-uploading the file. If this issue persists,{' '}
        <Link href={sblHelpMail}>email our support staff</Link>.
      </Paragraph>
    </Alert>
  );
}

export function UploadMaxSizeAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={uploadErrorSubheading}
      status='error'
      aria-live='polite'
      aria-atomic='true'
    >
      <Paragraph>
        The file you tried to upload exceeds the file size requirement or
        contains no data. Check your file and try again. If this issue persists,{' '}
        <Link href={sblHelpMail}>email our support staff</Link>.
      </Paragraph>
    </Alert>
  );
}

export function IncorrectFileTypeAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={uploadErrorSubheading}
      status='error'
      aria-live='polite'
      aria-atomic='true'
    >
      <Paragraph>
        The file you uploaded is an unsupported media type. Check your file and
        try again. If this issue persists,{' '}
        <Link href={sblHelpMail}>email our support staff</Link>.
      </Paragraph>
    </Alert>
  );
}

export function MustUploadFirstAlert(): JSX.Element {
  return (
    <Alert
      className='mt-[1.875rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      status='error'
      aria-live='polite'
      aria-atomic='true'
      message='Your file must be successfully uploaded and validation checks performed to continue to the next step.'
    />
  );
}

export const fileSubmissionStateAlert: Record<
  Exclude<
    FileSubmissionState,
    | FileSubmissionState.START_A_FILING
    | FileSubmissionState.SUBMISSION_STARTED
    | FileSubmissionState.SUBMISSION_UPLOADED
    | FileSubmissionState.TYPES_OF_INSTITUTION
    | FileSubmissionState.VALIDATION_IN_PROGRESS
  >,
  JSX.Element
> = {
  [FileSubmissionState.VALIDATION_SUCCESSFUL]: <SuccessAlert />,
  [FileSubmissionState.SUBMISSION_ACCEPTED]: <SuccessAlert />,
  [FileSubmissionState.VALIDATION_WITH_WARNINGS]: <SuccessAlert />,
  [FileSubmissionState.VALIDATION_WITH_ERRORS]: <SuccessAlert />,
  [FileSubmissionState.UPLOAD_FAILED]: (
    <AlertApiUnavailable message={uploadErrorSubheading} />
  ),
  [FileSubmissionState.VALIDATION_ERROR]: <ValidationErrorGeneralAlert />,
  [FileSubmissionState.VALIDATION_EXPIRED]: <ValidationErrorTimeoutAlert />,
  [FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED]: (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={validationErrorSubheading}
      status='error'
      aria-live='polite'
      aria-atomic='true'
    >
      <Paragraph>
        There may be an issue with the formatting of your file. Make sure your
        file meets the requirements detailed in the filing instructions guide (
        <Link href={fileFormatLink}>section 2.2, &quot;File format&quot;</Link>)
        and try again. If this issue persists,{' '}
        <Link href={sblHelpMail}>email our support staff</Link>.
      </Paragraph>
    </Alert>
  ),
};

export const fileSubmissionValidationStatus: Record<
  Exclude<
    FileSubmissionState,
    | FileSubmissionState.START_A_FILING
    | FileSubmissionState.SUBMISSION_STARTED
    | FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED
    | FileSubmissionState.SUBMISSION_UPLOADED
    | FileSubmissionState.TYPES_OF_INSTITUTION
    | FileSubmissionState.UPLOAD_FAILED
    | FileSubmissionState.VALIDATION_ERROR
    | FileSubmissionState.VALIDATION_EXPIRED
    | FileSubmissionState.VALIDATION_IN_PROGRESS
  >,
  string
> = {
  [FileSubmissionState.VALIDATION_SUCCESSFUL]:
    'Navigate through the validation results pages to continue.',
  [FileSubmissionState.SUBMISSION_ACCEPTED]:
    'Navigate through the validation results pages to continue.',
  [FileSubmissionState.VALIDATION_WITH_WARNINGS]:
    'Your file contains no errors but does contain warnings. Navigate through the error validation results pages to continue.',
  [FileSubmissionState.VALIDATION_WITH_ERRORS]:
    'To view detailed results, continue to the next step.',
};
