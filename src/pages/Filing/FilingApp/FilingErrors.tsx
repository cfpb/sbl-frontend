import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingErrors(): JSX.Element {
  const { lei, year } = useParams();

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
      hrefPrevious={`/filing/${year}/${lei}/upload-w-status`}
      hrefNext={`/filing/${year}/${lei}/warnings`}
      currentFiling={mockFiling}
    >
      ERROR CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingErrors;
