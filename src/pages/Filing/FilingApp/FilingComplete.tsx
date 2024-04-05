import { FilingStatusAsNumber } from 'utils/types';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingComplete(): JSX.Element {
  return (
    <FilingStepWrapper
      heading='Filing - Complete'
      hrefPrevious='/filing/submit'
      currentFiling={createMockFiling({
        status: FilingStatusAsNumber.SUBMISSION_ACCEPTED,
        contact_info: true,
      })}
    >
      FILING SUMMARY CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingComplete;
