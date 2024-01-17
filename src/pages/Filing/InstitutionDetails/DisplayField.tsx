// Rule disabling should be removed after cypress visual diff tests are enabled, see:
// https://github.com/cfpb/sbl-frontend/issues/176
/* eslint-disable simple-import-sort/imports */

import classNames from 'classnames';
import { Heading } from 'design-system-react';
import type { ReactNode } from 'react';
import './DisplayField.less';

export interface DisplayFieldProperties {
  label?: ReactNode;
  value?: ReactNode;
  className?: string;
}

export function DisplayField({
  label,
  value,
  className,
}: DisplayFieldProperties): JSX.Element {
  return (
    <div className={classNames('display-field', className)}>
      {label ? <Heading type='4'>{label}</Heading> : undefined}
      {value ? <p>{value}</p> : undefined}
    </div>
  );
}

DisplayField.defaultProps = {
  label: undefined,
  value: undefined,
  className: undefined,
};
