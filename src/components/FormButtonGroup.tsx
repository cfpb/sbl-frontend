import type { ReactNode } from 'react';

interface FormButtonGroupProperties {
  children: ReactNode;
  isFilingStep?: boolean;
}

function FormButtonGroup({
  className,
  isFilingStep = false,
  children,
}: FormButtonGroupProperties & JSX.IntrinsicElements['div']): JSX.Element {
  const classnames = ['mt-[1.875rem] flex'];
  classnames.push(isFilingStep ? 'gap-[1.125rem]' : 'gap-[0.625rem]');
  if (className) classnames.push(className);
  return <div className={classnames.join(' ')}>{children}</div>;
}

export default FormButtonGroup;
