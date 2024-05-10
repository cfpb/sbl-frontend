import { Link } from 'components/Link';
import { Button } from 'design-system-react';
import type { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function GLIEF(): ReactElement {
  return <Link href='https://www.gleif.org/'>GLEIF</Link>;
}

function NIC(): ReactElement {
  return <Link href='https://www.ffiec.gov/NPW'>NIC</Link>;
}

interface UpdateInstitutionProfileProperties {
  isCallToAction?: boolean;
}

function UpdateInstitutionProfile({
  isCallToAction,
}: UpdateInstitutionProfileProperties): ReactElement {
  const { lei } = useParams();
  return (
    <Link href={`/institution/${lei}/update`}>
      {isCallToAction
        ? 'Update your financial institution profile'
        : 'update financial institution profile'}
    </Link>
  );
}

UpdateInstitutionProfile.defaultProps = { isCallToAction: false };

interface UpdatePointOfContactProperties {
  // eslint-disable-next-line react/require-default-props
  label?: string;
}

function UpdatePointOfContact({
  label = 'update your point of contact information',
}: UpdatePointOfContactProperties): ReactElement {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onClick = (): void => navigate(`/filing/${year}/${lei}/contact`);
  return <Button asLink onClick={onClick} label={label} />;
}

function UploadANewFile({
  label = 'upload a new file',
}: UpdatePointOfContactProperties): ReactElement {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onClick = (): void => navigate(`/filing/${year}/${lei}/upload`);
  return <Button asLink onClick={onClick} label={label} />;
}

export default {
  GLIEF,
  NIC,
  UpdateInstitutionProfile,
  UpdatePointOfContact,
  UploadANewFile,
};
