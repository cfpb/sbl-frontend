import { useParams } from 'react-router-dom';
import { FilingStepWrapper } from './FilingStepWrapper';

function FilingComplete(): JSX.Element {
  const { lei, year } = useParams();

  return (
    <FilingStepWrapper
      lei={lei}
      heading='Filing - Complete'
      hrefPrevious={`/filing/${year}/${lei}/submit`}
    >
      FILING SUMMARY CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingComplete;
