import { List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import { formatDateTimeShort } from 'utils/formatDateTime';

interface FileDetailsProperties {
  dataGetSubmissionLatest: SubmissionResponse | undefined;
  isFetchingGetSubmissionLatest: boolean;
  errorGetSubmissionLatest: unknown;
}

function FileDetails({
  dataGetSubmissionLatest,
  isFetchingGetSubmissionLatest,
  errorGetSubmissionLatest,
}: FileDetailsProperties): JSX.Element | null {
  // Should only show once an upload has completed
  if (
    !dataGetSubmissionLatest?.filename &&
    !dataGetSubmissionLatest?.submission_time
  )
    return null;

  return (
    <div id='file-details'>
      {/* <div className='mb-[0.9375rem] mt-[1.875rem]'>
        <Heading type='4'>File details</Heading>
      </div> */}
      <div className='mb-[0.9375rem] mt-[1.875rem]'>
        <List>
          <ListItem>{dataGetSubmissionLatest.filename}</ListItem>
          <ListItem>
            Uploaded by {dataGetSubmissionLatest.submitter?.submitter_name} on{' '}
            {`${formatDateTimeShort(
              dataGetSubmissionLatest.submission_time ?? '',
              'fff',
            )}`}
          </ListItem>
          <ListItem>
            {errorGetSubmissionLatest
              ? 'VALIDATION_TOO_LONG_OR_OTHER'
              : isFetchingGetSubmissionLatest
                ? 'VALIDATION_IN_PROGRESS'
                : dataGetSubmissionLatest.state}
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default FileDetails;