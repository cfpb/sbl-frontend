import { Link } from 'components/Link';
import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

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
        : 'update your financial institution profile'}
    </Link>
  );
}

UpdateInstitutionProfile.defaultProps = { isCallToAction: false };

export default {
  GLIEF,
  NIC,
  UpdateInstitutionProfile,
};
