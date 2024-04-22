import { List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import { formatDateTimeShort } from 'utils/formatDateTime';

interface FileDetailsProperties {
  dataGetSubmissionLatest: SubmissionResponse | undefined;
}

function FileDetailsUpload({
  dataGetSubmissionLatest,
}: FileDetailsProperties): JSX.Element | null {
  // Should only show once an upload has completed
  if (
    !dataGetSubmissionLatest?.filename &&
    !dataGetSubmissionLatest?.submission_time
  )
    return null;

  return (
    <div id='file-details-upload'>
      {/* <div className='mb-[0.9375rem] mt-[1.875rem]'>
        <Heading type='4'>File details</Heading>
      </div> */}
      <div className='mb-[0.9375rem]'>
        <List>
          <ListItem>{dataGetSubmissionLatest.filename}</ListItem>
          <ListItem>
            Uploaded by {dataGetSubmissionLatest.submitter?.submitter_name} on{' '}
            {`${formatDateTimeShort(
              dataGetSubmissionLatest.submission_time ?? '',
              'fff',
            )}`}
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default FileDetailsUpload;
