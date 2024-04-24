import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingContact(): JSX.Element {
  const { lei, year } = useParams();

  const mockFiling = useMemo(
    () =>
      createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_WITH_WARNINGS,
        contact_info: true, // TODO: Should be a Contact object
      }),
    [],
  );

  return (
    <FilingStepWrapper
      heading='Filing - Point of Contact'
      hrefPrevious={`/filing/${year}/${lei}/warnings`}
      hrefNext={`/filing/${year}/${lei}/submit`}
      currentFiling={mockFiling}
    >
      CONTACT CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingContact;
