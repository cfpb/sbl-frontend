import { Link } from 'components/Link';
import { Alert } from 'design-system-react';
import { fileFormatLink, sblHelpMail } from 'utils/common';

export const fileSubmissionState = {
  VALIDATION_SUCCESSFUL: 'VALIDATION_SUCCESSFUL',
  VALIDATION_WITH_WARNINGS: 'VALIDATION_WITH_WARNINGS',
  VALIDATION_WITH_ERRORS: 'VALIDATION_WITH_ERRORS',
  ERROR_UPLOAD: 'ERROR_UPLOAD',
  VALIDATION_IN_PROGRESS: 'VALIDATION_IN_PROGRESS',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  SUBMISSION_UPLOADED: 'SUBMISSION_UPLOADED',
  SUBMISSION_UPLOAD_MALFORMED: 'SUBMISSION_UPLOAD_MALFORMED',
} as const;

export type FileSubmissionStateType =
  (typeof fileSubmissionState)[keyof typeof fileSubmissionState];

function SuccessAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='File successfully uploaded and validation check completed'
      status='success'
    />
  );
}

export const fileSubmissionStateAlert: Record<
  Exclude<
    FileSubmissionStateType,
    'SUBMISSION_UPLOADED' | 'VALIDATION_IN_PROGRESS'
  >,
  JSX.Element
> = {
  [fileSubmissionState.VALIDATION_SUCCESSFUL]: <SuccessAlert />,
  [fileSubmissionState.VALIDATION_WITH_WARNINGS]: <SuccessAlert />,
  [fileSubmissionState.VALIDATION_WITH_ERRORS]: <SuccessAlert />,
  [fileSubmissionState.ERROR_UPLOAD]: (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='Your upload failed to complete'
      status='error'
    />
  ),
  [fileSubmissionState.VALIDATION_FAILED]: (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message='There was a problem validating your file'
      status='error'
    />
  ),
  [fileSubmissionState.SUBMISSION_UPLOAD_MALFORMED]: (
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
    FileSubmissionStateType,
    'ERROR_UPLOAD' | 'SUBMISSION_UPLOADED' | 'VALIDATION_IN_PROGRESS'
  >,
  string
> = {
  [fileSubmissionState.VALIDATION_SUCCESSFUL]:
    'No errors were found in your register.',
  [fileSubmissionState.VALIDATION_WITH_WARNINGS]:
    'Warnings were found in your register.',
  [fileSubmissionState.VALIDATION_WITH_ERRORS]:
    'Errors were found in your register.',
  [fileSubmissionState.SUBMISSION_UPLOAD_MALFORMED]:
    'There may be an issue with the formatting of your file.',
  [fileSubmissionState.VALIDATION_FAILED]:
    'There may be an issue with the validation of your file.',
};
