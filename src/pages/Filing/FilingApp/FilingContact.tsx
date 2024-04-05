import { FilingStatusAsNumber } from 'utils/types';
import { FilingStepWrapper } from './FilingStepWrapper';
import { createMockFiling } from './FilingStepWrapper.helpers';

function FilingContact(): JSX.Element {
  return (
    <FilingStepWrapper
      heading='Filing - Point of Contact'
      hrefPrevious='/filing/warnings'
      hrefNext='/filing/submit'
      currentFiling={createMockFiling({
        status: FilingStatusAsNumber.VALIDATION_WITH_WARNINGS,
        contact_info: true,
      })}
    >
      CONTACT CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingContact;
