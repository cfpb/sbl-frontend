import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingUpload(): JSX.Element {
  const { lei, year } = useParams();

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
      hrefNext={`/filing/${year}/${lei}/errors`}
      currentFiling={mockFiling}
    >
      UPLOAD CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingUpload;
