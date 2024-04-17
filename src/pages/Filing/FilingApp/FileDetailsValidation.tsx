import { List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import {
  fileSubmissionState
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

  return (
    <div id='file-details-validation'>
      <div className=''>
        <List>
          <ListItem>
            {errorGetSubmissionLatest
              ? 'There may have been a problerm with the format of your file.'
              : dataGetSubmissionLatest.state ===
                  fileSubmissionState.VALIDATION_WITH_WARNINGS
                ? 'Warnings were found in your register.'
                : dataGetSubmissionLatest.state ===
                    fileSubmissionState.VALIDATION_WITH_ERRORS
                  ? 'Errors were found in your register.'
                  : ''}
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default FileDetailsValidation;
