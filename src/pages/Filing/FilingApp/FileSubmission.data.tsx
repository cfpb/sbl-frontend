import { Link } from 'components/Link';
import { Alert } from 'design-system-react';
import { fileFormatLink, sblHelpMail } from 'utils/common';

export const fileSubmissionState = {
  VALIDATION_WITH_WARNINGS: 'VALIDATION_WITH_WARNINGS',
  VALIDATION_WITH_ERRORS: 'VALIDATION_WITH_ERRORS',
  ERROR_UPLOAD: 'errorUpload',
  VALIDATION_IN_PROGRESS: 'VALIDATION_IN_PROGRESS',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
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
    >
      There may have been a problem with the format of your file. Refer to the
      Filing instructions guide for small business lending data, section{' '}
      <Link href={fileFormatLink}>2.2 File format</Link> for instructions on
      formatting your register file. For further guidance email our support
      staff at <Link href={sblHelpMail}>sbl_help@cfpb.gov</Link>.
    </Alert>
  ),
};
