import type { AxiosError } from 'axios';
import type { SubmissionResponse } from 'types/filingTypes';
import {
  fileSubmissionState,
  fileSubmissionStateAlert,
} from './FileSubmission.data';

interface FileSubmissionAlertProperties {
  uploadedBefore: boolean;
  dataGetSubmissionLatest: SubmissionResponse | undefined;
  errorUpload: AxiosError<unknown, unknown> | null;
}

function FileSubmissionAlert({
  uploadedBefore,
  dataGetSubmissionLatest,
  errorUpload,
}: FileSubmissionAlertProperties): JSX.Element | null {
  if (errorUpload)
    return fileSubmissionStateAlert[fileSubmissionState.ERROR_UPLOAD];

  if (
    uploadedBefore &&
    dataGetSubmissionLatest?.state ===
      fileSubmissionState.VALIDATION_WITH_WARNINGS
  )
    return fileSubmissionStateAlert[
      fileSubmissionState.VALIDATION_WITH_WARNINGS
    ];

  if (
    uploadedBefore &&
    dataGetSubmissionLatest?.state ===
      fileSubmissionState.VALIDATION_WITH_ERRORS
  )
    return fileSubmissionStateAlert[fileSubmissionState.VALIDATION_WITH_ERRORS];

  return null;
}

export default FileSubmissionAlert;
