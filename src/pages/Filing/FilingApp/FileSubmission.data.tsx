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
    <div className='mb-[2.8125rem]'>
      <Alert
        message='File successfully uploaded and validation check completed'
        status='success'
      />
    </div>
  ),
  [fileSubmissionState.ErrorFormatting]: (
    <div className='mb-[2.8125rem]'>
      <Alert message='Your file is not formatted correctly' status='error' />
    </div>
  ),
  [fileSubmissionState.ErrorUpload]: (
    <div className='mb-[2.8125rem]'>
      <Alert message='Your upload failed' status='error' />
    </div>
  ),
};
