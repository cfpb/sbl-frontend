import { useParams } from 'react-router-dom';
import { FilingStepWrapper } from './FilingStepWrapper';

function FilingErrors(): JSX.Element {
  const { lei, year } = useParams();

  return (
    <FilingStepWrapper
      lei={lei}
      heading='Filing - Errors'
      hrefPrevious={`/filing/${year}/${lei}/upload`}
      hrefNext={`/filing/${year}/${lei}/warnings`}
      isStepComplete // TODO: Derive actual step status
    >
      ERROR CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingErrors;
