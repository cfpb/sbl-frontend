import type { ReactNode } from 'react';
import ErrorIcon from './ErrorIcon';

interface InputErrorMessageProperties {
  children: ReactNode;
}

function InputErrorMessage({
  children,
}: InputErrorMessageProperties): JSX.Element {
  return (
    <div
      className='a-form-alert a-form-alert__error mt-[0.9375em]'
      role='alert'
    >
      <ErrorIcon />
      <p className='a-form-alert_text ml-6 -translate-y-[6%] text-[#1B1B1B]'>
        {children}
      </p>
    </div>
  );
}

export default InputErrorMessage;
