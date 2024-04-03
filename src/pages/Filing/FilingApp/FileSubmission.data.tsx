import { Alert } from 'design-system-react';

export const fileSubmissionState = {
  VALIDATION_WITH_WARNINGS: 'VALIDATION_WITH_WARNINGS',
  VALIDATION_WITH_ERRORS: 'VALIDATION_WITH_ERRORS',
  ERROR_UPLOAD: 'errorUpload',
  VALIDATION_IN_PROGRESS: 'VALIDATION_IN_PROGRESS',
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
};
