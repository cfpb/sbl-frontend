import { useMemo } from 'react';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingErrors(): JSX.Element {
  const mockFiling = useMemo(
    () =>
      createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_WITH_ERRORS,
      }),
    [],
  );

  return (
    <FilingStepWrapper
      heading='Filing - Errors'
      hrefPrevious='/filing/upload'
      hrefNext='/filing/warnings'
      currentFiling={mockFiling}
    >
      ERROR CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingErrors;
