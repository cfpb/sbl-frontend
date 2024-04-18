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
  SUBMISSION_UPLOAD_MALFORMED: 'SUBMISSION_UPLOAD_MALFORMED',
} as const;

export type FileSubmissionStateType =
  (typeof fileSubmissionState)[keyof typeof fileSubmissionState];

function SuccessAlert(): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem]'
      message='File successfully uploaded and validation check completed'
      status='success'
    />
  );
}

export const fileSubmissionStateAlert: Record<
  Exclude<FileSubmissionStateType, 'VALIDATION_IN_PROGRESS'>,
  JSX.Element
> = {
  [fileSubmissionState.VALIDATION_SUCCESSFUL]: <SuccessAlert />,
  [fileSubmissionState.VALIDATION_WITH_WARNINGS]: <SuccessAlert />,
  [fileSubmissionState.VALIDATION_WITH_ERRORS]: <SuccessAlert />,
  [fileSubmissionState.ERROR_UPLOAD]: (
    <Alert
      className='mb-[2.8125rem]'
      message='Your upload failed to complete'
      status='error'
    />
  ),
  [fileSubmissionState.VALIDATION_FAILED]: (
    <Alert
      className='mb-[2.8125rem]'
      message='There was a problem validating your file'
      status='error'
    />
  ),
  [fileSubmissionState.SUBMISSION_UPLOAD_MALFORMED]: (
    <Alert
      className='mb-[2.8125rem]'
      message='There was a problem validating your file'
      status='error'
    >
      There may have been a problem with the format of your file. Refer to the
      Filing instructions guide for small business lending data, section{' '}
      <Link href={fileFormatLink}>2.2 File format</Link> for instructions on
      formatting your register file. For further guidance email our support
      staff at <Link href={sblHelpMail}>sbl_help@cfpb.gov</Link>.
    </Alert>
  ),
};

export const fileSubmissionValidationStatus: Record<
  Exclude<FileSubmissionStateType, 'ERROR_UPLOAD' | 'VALIDATION_IN_PROGRESS'>,
  string
> = {
  [fileSubmissionState.VALIDATION_SUCCESSFUL]:
    'No errors were found in your register.',
  [fileSubmissionState.VALIDATION_WITH_WARNINGS]:
    'Warnings were found in your register.',
  [fileSubmissionState.VALIDATION_WITH_ERRORS]:
    'Errors were found in your register.',
  [fileSubmissionState.SUBMISSION_UPLOAD_MALFORMED]:
    'There may have been a problem with the format of your file.',
  [fileSubmissionState.VALIDATION_FAILED]:
    'There may have been a problem with the validation of your file.',
};
