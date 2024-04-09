import { useMemo } from 'react';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingWarnings(): JSX.Element {
  const mockFiling = useMemo(
    () =>
      createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_WITH_WARNINGS,
      }),
    [],
  );

  return (
    <FilingStepWrapper
      heading='Filing - Warnings'
      hrefPrevious='/filing/errors'
      hrefNext='/filing/contact'
      currentFiling={mockFiling}
    >
      WARNING CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingWarnings;
