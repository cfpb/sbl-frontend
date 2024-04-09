import { useMemo } from 'react';
import { FilingStatusAsNumber } from 'utils/types';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingComplete(): JSX.Element {
  const mockFiling = useMemo(
    () =>
      createMockFiling({
        status: FilingStatusAsNumber.SUBMISSION_ACCEPTED,
        contact_info: true, // TODO: Should be a Contact object
      }),
    [],
  );

  return (
    <FilingStepWrapper
      heading='Filing - Complete'
      hrefPrevious='/filing/submit'
      currentFiling={mockFiling}
    >
      FILING SUMMARY CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingComplete;
