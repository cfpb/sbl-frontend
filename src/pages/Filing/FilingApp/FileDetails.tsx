import { Heading, List, ListItem } from 'design-system-react';
import type { SubmissionResponse } from 'types/filingTypes';
import { formatDateTimeShort } from 'utils/formatDateTime';

function SkeletalLoading(): JSX.Element | null {
  // return null;
  return (
    <div
      role='status'
      className='flex max-w-[30rem] animate-pulse justify-center'
    >
      <div className='h-[1rem] w-full rounded-full bg-gray-200' />
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

interface FileDetailsProperties {
  dataGetSubmissionLatest: SubmissionResponse | undefined;
  isFetchingGetSubmissionLatest: boolean;
  isLoadingUpload: boolean;
  errorGetSubmissionLatest: unknown;
}

function FileDetails({
  dataGetSubmissionLatest,
  isFetchingGetSubmissionLatest,
  isLoadingUpload,
  errorGetSubmissionLatest,
}: FileDetailsProperties): JSX.Element | null {
  if (!dataGetSubmissionLatest?.filename) return null;

  const submissionInfo = `Uploaded by ${
    dataGetSubmissionLatest.submitter
  } on ${formatDateTimeShort(dataGetSubmissionLatest.submission_time, 'fff')}`;

  const validationResult = errorGetSubmissionLatest
    ? 'VALIDATION_TOO_LONG_OR_OTHER'
    : isFetchingGetSubmissionLatest
      ? 'VALIDATION_IN_PROGRESS'
      : dataGetSubmissionLatest.state;

  return (
    <div id='file-details'>
      <div className='mb-[0.9375rem] mt-[1.875rem]'>
        <Heading type='4'>File details</Heading>
      </div>
      <List>
        <ListItem className={isLoadingUpload ? 'list-none' : ''}>
          {isLoadingUpload ? (
            <SkeletalLoading />
          ) : (
            dataGetSubmissionLatest.filename
          )}
        </ListItem>
        <ListItem className={isLoadingUpload ? 'list-none' : ''}>
          {isLoadingUpload ? <SkeletalLoading /> : submissionInfo}
        </ListItem>
        <ListItem className={isLoadingUpload ? 'list-none' : ''}>
          {isLoadingUpload ? <SkeletalLoading /> : validationResult}
        </ListItem>
      </List>
    </div>
  );
}

export default FileDetails;
