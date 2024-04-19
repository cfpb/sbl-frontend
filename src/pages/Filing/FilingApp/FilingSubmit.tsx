import { useParams } from 'react-router-dom';
import { FilingStepWrapper } from './FilingStepWrapper';

function FilingSubmit(): JSX.Element {
  const { lei, year } = useParams();

  return (
    <FilingStepWrapper
      lei={lei}
      heading='Filing - Sign & Submit'
      hrefPrevious={`/filing/${year}/${lei}/contact`}
      hrefNext={`/filing/${year}/${lei}/done`}
      isStepComplete // TODO: Derive actual step status
    >
      SIGN & SUBMIT CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingSubmit;
