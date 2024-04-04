import { Heading, List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import { formatDateTimeShort } from 'utils/formatDateTime';

interface FileDetailsProperties {
  dataGetSubmissionLatest: SubmissionResponse | undefined;
}

function FileDetails({
  dataGetSubmissionLatest,
}: FileDetailsProperties): JSX.Element | null {
  if (!dataGetSubmissionLatest?.filename) return null;

  return (
    <div id='file-details'>
      <div className='mb-[0.9375rem] mt-[1.875rem]'>
        <Heading type='4'>File details</Heading>
      </div>
      <List>
        <ListItem>{dataGetSubmissionLatest.filename}</ListItem>
        <ListItem>
          Uploaded by {dataGetSubmissionLatest.submitter} on{' '}
          {`${formatDateTimeShort(
            dataGetSubmissionLatest.submission_time,
            'fff',
          )}`}
        </ListItem>
        <ListItem>{dataGetSubmissionLatest.state}</ListItem>
      </List>
    </div>
  );
}

export default FileDetails;
