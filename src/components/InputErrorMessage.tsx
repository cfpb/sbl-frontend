import { AlertFieldLevel } from 'design-system-react';
import type { ReactNode } from 'react';

interface InputErrorMessageProperties {
  children: ReactNode;
  errorId?: string;
}

function InputErrorMessage({
  errorId = null,
  children,
}: InputErrorMessageProperties): JSX.Element {
  return (
    <div id={errorId} className='mt-[0.9375rem] max-w-[41.875rem]'>
      <AlertFieldLevel message={children} status='error' />
    </div>
  );
}

export default InputErrorMessage;
