import PointOfContact from 'pages/PointOfContact';
import { useNavigate, useParams } from 'react-router-dom';

function FilingContact(): JSX.Element {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onSubmit = (success?: boolean): void => {
    if (success) {
      navigate(`/filing/${year}/${lei}/submit`);
    }
  };

  return (
    <>
      {/* <FilingSteps /> */}
      <PointOfContact onSubmit={onSubmit} />
    </>
  );
}

export default FilingContact;
