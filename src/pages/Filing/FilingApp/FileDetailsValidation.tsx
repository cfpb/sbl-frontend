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

  console.log('dataGetSubmissionLatest.state:', dataGetSubmissionLatest.state);
  console.log(
    'fileSubmissionValidationStatus[dataGetSubmissionLatest.state]:',
    fileSubmissionValidationStatus[dataGetSubmissionLatest.state],
  );

  return (
    <div id='file-details-validation'>
      <div className=''>
        <List>
          <ListItem>
            {errorGetSubmissionLatest
              ? fileSubmissionValidationStatus[
                  fileSubmissionState.VALIDATION_FAILED
                ]
              : // @ts-expect-error key in
                dataGetSubmissionLatest.state in fileSubmissionValidationStatus
                ? // @ts-expect-error use key
                  fileSubmissionValidationStatus[dataGetSubmissionLatest.state]
                : ''}{' '}
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default FileDetailsValidation;
