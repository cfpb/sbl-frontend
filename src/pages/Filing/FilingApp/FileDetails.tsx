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
      <List className='list-disc'>
        <ListItem className='leading-[1.1]'>
          Filename: {dataGetSubmissionLatest.filename}
        </ListItem>
        <ListItem className='leading-[1.1]'>
          Submitter: {dataGetSubmissionLatest.submitter}
        </ListItem>
        <ListItem className='leading-[1.1]'>
          Submission Time:{' '}
          {`${formatDateTimeShort(
            dataGetSubmissionLatest.submission_time,
            'DDD',
          )}; ${formatDateTimeShort(
            dataGetSubmissionLatest.submission_time,
            'ttt',
          )}`}
        </ListItem>
        <ListItem className='leading-[1.1]'>
          Status: {dataGetSubmissionLatest.state}
        </ListItem>
      </List>
    </div>
  );
}

export default FileDetails;
