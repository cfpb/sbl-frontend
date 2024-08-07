import { List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import { fileSubmissionValidationStatus } from './FileSubmission.data';

interface FileDetailsProperties {
  dataGetSubmissionLatest: SubmissionResponse | undefined;
  errorGetSubmissionLatest: unknown;
  hasWarnings: boolean;
}

function FileDetailsValidation({
  dataGetSubmissionLatest,
  errorGetSubmissionLatest,
  hasWarnings,
}: FileDetailsProperties): JSX.Element | null {
  // Should only show once an validation has completed
  if (
    errorGetSubmissionLatest ||
    (!dataGetSubmissionLatest?.filename &&
      !dataGetSubmissionLatest?.submission_time)
  )
    return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const validationStatusMessage: string =
    hasWarnings &&
    dataGetSubmissionLatest.state === FileSubmissionState.SUBMISSION_ACCEPTED
      ? 'Your file contains no errors and warnings have been verified. Navigate through the validation results pages to continue.'
      : // @ts-expect-error key in
        dataGetSubmissionLatest.state in fileSubmissionValidationStatus
        ? // @ts-expect-error use key
          fileSubmissionValidationStatus[dataGetSubmissionLatest.state]
        : '';

  return (
    <div id='file-details-validation'>
      <div>
        {validationStatusMessage ? (
          <List>
            <ListItem className='max-w-[41.875rem]'>
              {validationStatusMessage}
            </ListItem>
          </List>
        ) : null}
      </div>
    </div>
  );
}

export default FileDetailsValidation;
