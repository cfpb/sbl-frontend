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
      <div className='mb-[0.9375rem]'>
        <List>
          <ListItem className='max-w-[41.875rem]'>
            {dataGetSubmissionLatest.filename}
          </ListItem>
          <ListItem className='snapshot-ignore max-w-[41.875rem]'>
            Uploaded by {dataGetSubmissionLatest.submitter.user_name} on{' '}
            {`${formatDateTimeShort(
              // @ts-expect-error Luxon expects string when it should be string | Date
              dataGetSubmissionLatest.submission_time ?? '',
              'fff',
            )} `}
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default FileDetailsUpload;
