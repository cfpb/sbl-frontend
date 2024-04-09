import { useMemo } from 'react';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingUpload(): JSX.Element {
  const mockFiling = useMemo(
    () =>
      createMockFiling({
        status: FilingStatusAsNumber.SUBMISSION_STARTED,
      }),
    [],
  );

  return (
    <FilingStepWrapper
      heading='Filing - Upload'
      hrefNext='/filing/errors'
      currentFiling={mockFiling}
    >
      UPLOAD CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingUpload;
