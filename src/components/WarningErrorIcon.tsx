// @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
import { ReactComponent as WarningErrorSVG } from 'assets/warning-error.svg';

function WarningErrorIcon(): JSX.Element {
  return (
    <div className='text-errorColor'>
      <WarningErrorSVG />
    </div>
  );
}

export default WarningErrorIcon;
