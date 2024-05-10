import type { AxiosError } from 'axios';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import { FILE_SIZE_LIMIT_ERROR_MESSAGE } from 'utils/constants';
import {
  IncorrectFileTypeAlert,
  UploadMaxSizeAlert,
  ValidationInitialFetchFailAlert,
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
  if (errorUpload && errorUpload.message === FILE_SIZE_LIMIT_ERROR_MESSAGE)
    return <UploadMaxSizeAlert />;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-magic-numbers
  if (errorUpload && errorUpload?.response?.status === 415)
    return <IncorrectFileTypeAlert />;

  if (errorUpload)
    return fileSubmissionStateAlert[FileSubmissionState.UPLOAD_FAILED];

  // NOTE: If the filing service is down, the initial GET Latest Submission will provide this alert
  if (!uploadedBefore && errorGetSubmissionLatest) {
    return <ValidationInitialFetchFailAlert />;
  }

  // NOTE: General Catch-all Validation Error Alert
  if (errorGetSubmissionLatest) {
    return fileSubmissionStateAlert[FileSubmissionState.VALIDATION_ERROR];
  }

  if (!dataGetSubmissionLatest?.state) return null;

  // @ts-expect-error TypeChecked above
  return fileSubmissionStateAlert[dataGetSubmissionLatest.state] as JSX.Element;
}

export default FileSubmissionAlert;
