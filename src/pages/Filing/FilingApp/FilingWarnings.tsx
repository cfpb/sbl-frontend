import { FilingStatusAsNumber } from 'utils/types';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingWarnings(): JSX.Element {
  return (
    <FilingStepWrapper
      heading='Filing - Warnings'
      hrefPrevious='/filing/errors'
      hrefNext='/filing/contact'
      currentFiling={createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_WITH_WARNINGS,
      })}
    >
      WARNING CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingWarnings;
