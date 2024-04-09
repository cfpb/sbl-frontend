import { useMemo } from 'react';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingSubmit(): JSX.Element {
  const mockFiling = useMemo(
    () =>
      createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_SUCCESSFUL,
        contact_info: true, // TODO: Should be a Contact object
      }),
    [],
  );

  return (
    <FilingStepWrapper
      heading='Filing - Sign & Submit'
      hrefPrevious='/filing/contact'
      hrefNext='/filing/done'
      currentFiling={mockFiling}
    >
      SIGN & SUBMIT CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingSubmit;
