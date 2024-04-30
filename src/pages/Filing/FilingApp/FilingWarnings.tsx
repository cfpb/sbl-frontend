import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingWarnings(): JSX.Element {
  const { lei, year } = useParams();

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
      hrefPrevious={`/filing/${year}/${lei}/errors`}
      hrefNext={`/filing/${year}/${lei}/contact`}
      currentFiling={mockFiling}
    >
      WARNING CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingWarnings;
