import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { Link } from 'components/Link';
import { Alert } from 'design-system-react';
import { FileSubmissionState } from 'types/filingTypes';
import { fileFormatLink, sblHelpMail } from 'utils/common';

function SuccessAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='File successfully uploaded and validation check completed'
      status='success'
    />
  );
}

export function ValidationInitialFetchFailAlert(): JSX.Element {
  return <AlertApiUnavailable message='The filing service is unavailable' />;
}

function ValidationErrorGeneralAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='There was a problem validating your file'
      status='error'
    />
  );
}

function ValidationErrorTimeoutAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='There was a problem validating your file'
      status='error'
    >
      Our system was not able to process your file within the allotted
      timeframe. Try re-uploading the file. If this issue persists,{' '}
      <Link href={sblHelpMail}>email our support staff</Link>.{' '}
    </Alert>
  );
}

export function UploadMaxSizeAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='There was a problem uploading your file'
      status='error'
    >
      The file you tried to upload exceeds the file size requirement or contains
      no data. Check your file and try again. If this issue persists,{' '}
      <Link href={sblHelpMail}>email our support staff</Link>.
    </Alert>
  );
}

export function IncorrectFileTypeAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='There was a problem uploading your file'
      status='error'
    >
      The file you uploaded is an unsupported media type. Check your file and
      try again. If this issue persists,{' '}
      <Link href={sblHelpMail}>email our support staff</Link>.
    </Alert>
  );
}

export const fileSubmissionStateAlert: Record<
  Exclude<
    FileSubmissionState,
    | FileSubmissionState.SUBMISSION_STARTED
    | FileSubmissionState.SUBMISSION_UPLOADED
    | FileSubmissionState.VALIDATION_IN_PROGRESS
  >,
  JSX.Element
> = {
  [FileSubmissionState.VALIDATION_SUCCESSFUL]: <SuccessAlert />,
  [FileSubmissionState.SUBMISSION_ACCEPTED]: <SuccessAlert />,
  [FileSubmissionState.VALIDATION_WITH_WARNINGS]: <SuccessAlert />,
  [FileSubmissionState.VALIDATION_WITH_ERRORS]: <SuccessAlert />,
  [FileSubmissionState.UPLOAD_FAILED]: (
    <AlertApiUnavailable message='There was a problem uploading your file' />
  ),
  [FileSubmissionState.VALIDATION_ERROR]: <ValidationErrorGeneralAlert />,
  [FileSubmissionState.VALIDATION_EXPIRED]: <ValidationErrorTimeoutAlert />,
  [FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED]: (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='There was a problem validating your file'
      status='error'
    >
      There may be an issue with the formatting of your file. Make sure your
      file meets the <Link href={fileFormatLink}>requirements</Link> detailed in
      section 2.2 of the Filing instructions guide and try again. If this issue
      persists, <Link href={sblHelpMail}>email our support staff</Link>.
    </Alert>
  ),
};

export const fileSubmissionValidationStatus: Record<
  Exclude<
    FileSubmissionState,
    | FileSubmissionState.SUBMISSION_STARTED
    | FileSubmissionState.SUBMISSION_UPLOADED
    | FileSubmissionState.UPLOAD_FAILED
    | FileSubmissionState.VALIDATION_IN_PROGRESS
  >,
  string
> = {
  [FileSubmissionState.VALIDATION_SUCCESSFUL]:
    'No errors or warnings were found in your file',
  [FileSubmissionState.SUBMISSION_ACCEPTED]:
    'No errors or warnings were found in your file',
  [FileSubmissionState.VALIDATION_WITH_WARNINGS]:
    'Warnings were found in your file',
  [FileSubmissionState.VALIDATION_WITH_ERRORS]:
    'Errors were found in your file',
  [FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED]:
    'There may be an issue with the formatting of your file',
  [FileSubmissionState.VALIDATION_ERROR]:
    'There may be an issue with the validation of your file',
  [FileSubmissionState.VALIDATION_EXPIRED]:
    'There may be an issue with the validation of your file',
};
