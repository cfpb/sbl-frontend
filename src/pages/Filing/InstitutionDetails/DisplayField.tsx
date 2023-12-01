import classNames from 'classnames';
import { Heading } from 'design-system-react';
import type { ReactNode } from 'react';
import './DisplayField.less';

export interface DisplayFieldProperties {
  label?: ReactNode;
  value?: ReactNode;
  className?: string;
}
export function DisplayField({ label, value, className = '' }: DisplayFieldProperties): JSX.Element {
  return (
    <div className={classNames('display-field', className)}>
      {label ? <Heading type='4'>{label}</Heading> : undefined}
      {value ? <p>{value}</p> : undefined}
    </div>
  );
}
