import { Icon } from 'design-system-react';
import type { ReactNode } from 'react';

interface InlineStatusProperties {
  status: string;
  className: string;
  message: ReactNode;
}

function InlineStatus({
  status = '',
  className,
  message = '',
  ...other
}: InlineStatusProperties): JSX.Element {
  return (
    <div>
      <Icon
        name={status || 'updating'}
        className={`${
          status ? '' : 'updating invisible'
        } mr-[0.3125rem] inline-block ${className}`}
        {...other}
      />
      <span className='inline-block'>{message}</span>
    </div>
  );
}

export default InlineStatus;
