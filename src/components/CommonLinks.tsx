import { Link } from 'components/Link';
import type { ReactElement } from 'react';

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
  return (
    <Link href='/update-financial-profile'>
      {isCallToAction
        ? 'Update your financial institution profile'
        : 'request an update to your financial institution profile'}
    </Link>
  );
}

UpdateInstitutionProfile.defaultProps = { isCallToAction: false };

export default {
  GLIEF,
  NIC,
  UpdateInstitutionProfile,
};
