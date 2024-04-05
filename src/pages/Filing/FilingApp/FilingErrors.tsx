import { FilingStatusAsNumber } from 'utils/types';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingErrors(): JSX.Element {
  return (
    <FilingStepWrapper
      heading='Filing - Errors'
      hrefPrevious='/filing/upload'
      hrefNext='/filing/warnings'
      currentFiling={createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_WITH_ERRORS,
      })}
    >
      ERROR CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingErrors;
