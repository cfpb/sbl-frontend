import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingComplete(): JSX.Element {
  const { lei, year } = useParams();

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
      hrefPrevious={`/filing/${year}/${lei}/submit`}
      currentFiling={mockFiling}
    >
      FILING SUMMARY CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingComplete;
