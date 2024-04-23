import type { AxiosError } from 'axios';
import { Alert } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import { FILE_SIZE_LIMIT_ERROR_MESSAGE } from 'utils/constants';
import { fileSubmissionStateAlert } from './FileSubmission.data';

interface FileSubmissionAlertProperties {
  uploadedBefore: boolean;
  errorGetSubmissionLatest: unknown;
  dataGetSubmissionLatest: SubmissionResponse | undefined;
  errorUpload: AxiosError<unknown, unknown> | null;
}

function FileSubmissionAlert({
  uploadedBefore,
  errorGetSubmissionLatest,
  dataGetSubmissionLatest,
  errorUpload,
}: FileSubmissionAlertProperties): JSX.Element | null {
  if (errorUpload && errorUpload.message === FILE_SIZE_LIMIT_ERROR_MESSAGE)
    return (
      <Alert
        className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
        message='The file size is over the file size limit or does not contain data'
        status='error'
      />
    );

  if (errorUpload)
    return fileSubmissionStateAlert[FileSubmissionState.UPLOAD_FAILED];

  if (errorGetSubmissionLatest) {
    return fileSubmissionStateAlert[FileSubmissionState.VALIDATION_ERROR];
  }

  // Success Alerts only occur on current uploads/validations. The success alerts are hidden on previous uploads/validations.
  if (!uploadedBefore || !dataGetSubmissionLatest?.state) return null;

  // @ts-expect-error TypeChecked above
  return fileSubmissionStateAlert[dataGetSubmissionLatest.state] as JSX.Element;
}

export default FileSubmissionAlert;
