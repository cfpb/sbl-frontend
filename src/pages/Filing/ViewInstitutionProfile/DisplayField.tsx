import classNames from 'classnames';
import { Heading } from 'design-system-react';
import type { ReactNode } from 'react';
import './DisplayField.less';

export const NOT_AVAILABLE = 'Not available';
export const NOT_APPLICABLE = 'Not applicable';
export const FALLBACK_BLANK = '';

export interface DisplayFieldProperties {
  label?: ReactNode;
  value?: ReactNode;
  className?: string;
  fallbackValue?: string;
}

export function DisplayField({
  label,
  value,
  className,
  fallbackValue,
}: DisplayFieldProperties): JSX.Element {
  return (
    <div className={classNames('display-field', className)}>
      {label ? (
        <Heading className='h4 break-all' type='3'>
          {label}
        </Heading>
      ) : undefined}
      <p className='u-mt10 break-all'>{value ?? fallbackValue}</p>
    </div>
  );
}

DisplayField.defaultProps = {
  className: undefined,
  fallbackValue: NOT_APPLICABLE,
  label: undefined,
  value: undefined,
};
