import { Icon } from 'design-system-react';
import type { ReactNode } from 'react';
import { useId } from 'react';

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
  const iconId = useId();
  return (
    <div>
      <Icon
        ariaLabelledby={iconId}
        name={status || 'updating'}
        className={`${
          status ? '' : 'updating invisible'
        } mr-[0.3125rem] inline-block ${className}`}
        withBg={status !== 'updating'}
        {...other}
      />
      <span id={iconId} className='inline-block'>
        {message}
      </span>
    </div>
  );
}

export default InlineStatus;
