import { Link } from 'components/Link';
import type { ReactElement } from 'react';
import { updateYourFinancialInstitutionProfile } from 'utils/common';

function GLIEF(): ReactElement {
  return <Link href='https://www.gleif.org/'>GLEIF</Link>;
}

function NIC(): ReactElement {
  return <Link href='https://www.ffiec.gov/NPW'>NIC</Link>;
}

interface UpdateInstitutionProfileProperties {
  isCallToAction?: boolean;
}

// TODO
// Replace this generic SBL Help link with a specific Salesforce form link,
// see: https://github.com/cfpb/sbl-frontend/issues/109
function UpdateInstitutionProfile({
  isCallToAction,
}: UpdateInstitutionProfileProperties): ReactElement {
  return (
    <Link href={updateYourFinancialInstitutionProfile}>
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
