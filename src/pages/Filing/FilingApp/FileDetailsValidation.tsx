import { List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import {
  fileSubmissionState,
  fileSubmissionValidationStatus,
} from './FileSubmission.data';

interface FileDetailsProperties {
  dataGetSubmissionLatest: SubmissionResponse | undefined;
  errorGetSubmissionLatest: unknown;
}

function FileDetailsValidation({
  dataGetSubmissionLatest,
  errorGetSubmissionLatest,
}: FileDetailsProperties): JSX.Element | null {
  // Should only show once an validation has completed
  if (
    !dataGetSubmissionLatest?.filename &&
    !dataGetSubmissionLatest?.submission_time
  )
    return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const validationStatusMessage: string = errorGetSubmissionLatest
    ? fileSubmissionValidationStatus[fileSubmissionState.VALIDATION_FAILED]
    : // @ts-expect-error key in
      dataGetSubmissionLatest.state in fileSubmissionValidationStatus
      ? // @ts-expect-error use key
        fileSubmissionValidationStatus[dataGetSubmissionLatest.state]
      : '';

  return (
    <div id='file-details-validation'>
      <div className=''>
        <List>
          {validationStatusMessage ? (
            <ListItem>{validationStatusMessage}</ListItem>
          ) : null}
        </List>
      </div>
    </div>
  );
}

export default FileDetailsValidation;
