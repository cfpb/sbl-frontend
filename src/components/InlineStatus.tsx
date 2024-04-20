import { Icon } from 'design-system-react';
import type { ReactNode } from 'react';
import { useId } from 'react';

interface InlineStatusLineProperties {
  status: string;
  className: string;
  message: ReactNode;
}

function InlineStatusLine({
  status = '',
  className,
  message = '',
  ...other
}: InlineStatusLineProperties): JSX.Element {
  const iconId = useId();
  return (
    <div>
      <Icon
        isPresentational
        ariaLabelledby={iconId}
        name={status || 'updating'}
        // @ts-expect-error needs to be fixed in the DSR
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

interface InlineStatusOption {
  condition: unknown;
  value: string;
}

interface InlineStatusProperties {
  statusOptions: InlineStatusOption[];
  classNameOptions: InlineStatusOption[];
  messageOptions: InlineStatusOption[];
}

/* NOTE: Uses piping priorities -- accepts first true condition */
function InlineStatus({
  statusOptions,
  classNameOptions,
  messageOptions,
}: InlineStatusProperties): JSX.Element {
  const getStatus = (): string => {
    const { value } = statusOptions.find(option => option.condition) ?? {};
    return value ?? '';
  };

  const getStatusClassName = (): string => {
    const { value } = classNameOptions.find(option => option.condition) ?? {};
    return value ?? 'text-[#0072CE]';
  };

  const getMessage = (): JSX.Element | null => {
    const { value } = messageOptions.find(option => option.condition) ?? {};
    return value ? <span className='font-medium'>{value}</span> : null;
  };
  return (
    <InlineStatusLine
      status={getStatus()}
      className={getStatusClassName()}
      message={getMessage()}
    />
  );
}

export default InlineStatus;
