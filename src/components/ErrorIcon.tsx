// @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
import { ReactComponent as ErrorSVG } from 'assets/error.svg';

function ErrorIcon(): JSX.Element {
  return (
    <div className='text-errorColor'>
      <ErrorSVG />
    </div>
  );
}

export default ErrorIcon;
