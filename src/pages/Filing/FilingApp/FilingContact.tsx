import { useParams } from 'react-router-dom';
import { FilingStepWrapper } from './FilingStepWrapper';

function FilingContact(): JSX.Element {
  const { lei, year } = useParams();

  return (
    <FilingStepWrapper
      lei={lei}
      heading='Filing - Point of Contact'
      hrefPrevious={`/filing/${year}/${lei}/warnings`}
      hrefNext={`/filing/${year}/${lei}/submit`}
      isStepComplete // TODO: Derive actual step status
    >
      CONTACT CONTENT GOES HERE
    </FilingStepWrapper>
  );
}

export default FilingContact;
