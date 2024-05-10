import { List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import { fileSubmissionValidationStatus } from './FileSubmission.data';
import { getErrorsWarningsSummary } from './FilingErrors/FilingErrors.helpers';

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

  const { logicWarningsSingle, logicWarningsMulti } = getErrorsWarningsSummary(
    dataGetSubmissionLatest,
  );

  const hasWarnings =
    logicWarningsSingle.length > 0 || logicWarningsMulti.length > 0;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const validationStatusMessage: string = errorGetSubmissionLatest
    ? fileSubmissionValidationStatus[FileSubmissionState.VALIDATION_ERROR]
    : hasWarnings &&
        dataGetSubmissionLatest.state ===
          FileSubmissionState.SUBMISSION_ACCEPTED
      ? 'Your file contains no errors and warnings have been verified'
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
            <ListItem>{validationStatusMessage}</ListItem>
          </List>
        ) : null}
      </div>
    </div>
  );
}

export default FileDetailsValidation;
