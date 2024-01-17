import { AlertFieldLevel } from 'design-system-react';
import type { ReactNode } from 'react';

interface InputErrorMessageProperties {
  children: ReactNode;
}

function InputErrorMessage({
  children,
}: InputErrorMessageProperties): JSX.Element {
  return (
    <div className='mt-[0.9375rem]'>
      <AlertFieldLevel message={children} status='error' />
    </div>
  );
}

export default InputErrorMessage;
