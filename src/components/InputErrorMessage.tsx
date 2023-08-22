import type { ReactNode } from 'react';
import ErrorIcon from './ErrorIcon';

interface Properties {
  children: ReactNode
}

function InputErrorMessage({children}: Properties): JSX.Element {
  return (
    <div className="a-form-alert a-form-alert__error mt-2" role="alert"><ErrorIcon /><p className="a-form-alert_text ml-6 -translate-y-[7%]">{children}</p></div>

  )
}

export default InputErrorMessage