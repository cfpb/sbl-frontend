import { Alert } from 'design-system-react';

export const fileSubmissionState = {
  SUCCESS: 'VALIDATION_WITH_WARNINGS',
  ERROR_FORMATTING: 'VALIDATION_WITH_ERRORS',
  ERROR_UPLOAD: 'errorUpload',
  IN_PROGRESS: 'VALIDATION_IN_PROGRESS',
} as const;

export type FileSubmissionStateType =
  (typeof fileSubmissionState)[keyof typeof fileSubmissionState];

export const fileSubmissionStateAlert: Record<
  Exclude<FileSubmissionStateType, 'VALIDATION_IN_PROGRESS'>,
  JSX.Element
> = {
  [fileSubmissionState.SUCCESS]: (
    <Alert
      className='mb-[2.8125rem]'
      message='File successfully uploaded and validation check completed'
      status='success'
    />
  ),
  [fileSubmissionState.ERROR_FORMATTING]: (
    <Alert
      className='mb-[2.8125rem]'
      message='Your file is not formatted correctly'
      status='error'
    />
  ),
  [fileSubmissionState.ERROR_UPLOAD]: (
    <Alert
      className='mb-[2.8125rem]'
      message='Your upload failed to complete'
      status='error'
    />
  ),
};
