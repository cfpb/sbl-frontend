import { FilingStatusAsNumber } from 'utils/types';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingUpload(): JSX.Element {
  return (
    <FilingStepWrapper
      heading='Filing - Upload'
      hrefNext='/filing/errors'
      currentFiling={createMockFiling({
        status: FilingStatusAsNumber.SUBMISSION_STARTED,
      })}
    >
      UPLOAD CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingUpload;
