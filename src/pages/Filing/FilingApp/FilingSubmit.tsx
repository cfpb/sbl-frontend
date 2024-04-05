import { FilingStatusAsNumber } from 'utils/types';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingSubmit(): JSX.Element {
  return (
    <FilingStepWrapper
      heading='Filing - Sign & Submit'
      hrefPrevious='/filing/contact'
      hrefNext='/filing/done'
      currentFiling={createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_SUCCESSFUL,
        contact_info: true,
      })}
    >
      SIGN & SUBMIT CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingSubmit;
