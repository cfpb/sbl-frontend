import type { AxiosError } from 'axios';
import type { SubmissionResponse } from 'types/filingTypes';
import {
  fileSubmissionState,
  fileSubmissionStateAlert,
} from './FileSubmission.data';

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
  if (errorUpload)
    return fileSubmissionStateAlert[fileSubmissionState.ERROR_UPLOAD];

  if (uploadedBefore && errorGetSubmissionLatest) {
    return fileSubmissionStateAlert[fileSubmissionState.VALIDATION_FAILED];
  }

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
