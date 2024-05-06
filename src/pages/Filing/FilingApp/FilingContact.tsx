import PointOfContact from 'pages/PointOfContact';
import { useNavigate, useParams } from 'react-router-dom';
import { FilingSteps } from './FilingSteps';

function FilingContact(): JSX.Element {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onSubmit = (): void => navigate(`/filing/${year}/${lei}/submit`);

  return (
    <>
      <FilingSteps />
      <PointOfContact onSubmit={onSubmit} />
    </>
  );
}

export default FilingContact;
