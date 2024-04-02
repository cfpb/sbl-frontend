import { Alert } from 'design-system-react';

export const fileSubmissionState = {
  Success: 'success',
  ErrorFormatting: 'errorFormatting',
  ErrorUpload: 'errorUpload',
} as const;

export type FileSubmissionStateType =
  (typeof fileSubmissionState)[keyof typeof fileSubmissionState];

export const fileSubmissionStateAlert: Record<
  FileSubmissionStateType,
  JSX.Element
> = {
  [fileSubmissionState.Success]: (
    <Alert
      className='mb-[2.8125rem]'
      message='File successfully uploaded and validation check completed'
      status='success'
    />
  ),
  [fileSubmissionState.ErrorFormatting]: (
    <Alert
      className='mb-[2.8125rem]'
      message='Your file is not formatted correctly'
      status='error'
    />
  ),
  [fileSubmissionState.ErrorUpload]: (
    <Alert
      className='mb-[2.8125rem]'
      message='Your upload failed to complete'
      status='error'
    />
  ),
};
