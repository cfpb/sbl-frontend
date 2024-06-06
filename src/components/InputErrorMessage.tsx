import { AlertFieldLevel } from 'design-system-react';
import type { AlertFieldLevelType } from 'design-system-react/dist/components/Alert/AlertFieldLevel';
import type { ReactNode } from 'react';

interface InputErrorMessageProperties {
  children: ReactNode;
  status?: string;
}

function InputErrorMessage({
  children,
  status,
}: InputErrorMessageProperties): JSX.Element {
  return (
    <div className='mt-[0.9375rem] max-w-[41.875rem]'>
      <AlertFieldLevel
        message={children}
        status={status as NonNullable<AlertFieldLevelType>}
      />
    </div>
  );
}

InputErrorMessage.defaultProps = {
  status: 'error',
};

export default InputErrorMessage;
