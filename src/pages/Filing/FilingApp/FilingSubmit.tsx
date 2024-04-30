import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingSubmit(): JSX.Element {
  const { lei, year } = useParams();

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
      hrefPrevious={`/filing/${year}/${lei}/contact`}
      hrefNext={`/filing/${year}/${lei}/done`}
      currentFiling={mockFiling}
    >
      SIGN & SUBMIT CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingSubmit;
