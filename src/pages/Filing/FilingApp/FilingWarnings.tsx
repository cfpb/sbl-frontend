import { useParams } from 'react-router-dom';
import { FilingStepWrapper } from './FilingStepWrapper';

function FilingWarnings(): JSX.Element {
  const { lei, year } = useParams();

  return (
    <FilingStepWrapper
      lei={lei}
      heading='Filing - Warnings'
      hrefPrevious={`/filing/${year}/${lei}/errors`}
      hrefNext={`/filing/${year}/${lei}/contact`}
      isStepComplete // TODO: Derive actual step status
    >
      WARNING CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingWarnings;
