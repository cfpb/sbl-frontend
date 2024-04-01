import type { AxiosError } from 'axios';
import type { SubmissionResponse } from 'types/filingTypes';
import {
  fileSubmissionState,
  fileSubmissionStateAlert,
} from './FileSubmission.data';

interface FileSubmissionAlertProperties {
  uploadedBefore: boolean;
  dataGetSubmissionLatest: SubmissionResponse | undefined;
  errorUpload: AxiosError | null;
}

function FileSubmissionAlert({
  uploadedBefore,
  dataGetSubmissionLatest,
  errorUpload,
}: FileSubmissionAlertProperties): JSX.Element | null {
  if (errorUpload)
    return fileSubmissionStateAlert[fileSubmissionState.ErrorUpload];

  if (
    uploadedBefore &&
    dataGetSubmissionLatest?.state === 'VALIDATION_WITH_WARNINGS'
  )
    return fileSubmissionStateAlert[fileSubmissionState.Success];

  if (
    uploadedBefore &&
    dataGetSubmissionLatest?.state === 'VALIDATION_WITH_ERRORS'
  )
    return fileSubmissionStateAlert[fileSubmissionState.ErrorFormatting];

  return null;
}

export default FileSubmissionAlert;
