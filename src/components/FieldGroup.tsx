import type { ReactNode } from 'react';

interface FieldGroupProperties {
  children: ReactNode;
}

function FieldGroup({
  className,
  children,
}: FieldGroupProperties & JSX.IntrinsicElements['div']): JSX.Element {
  return (
    <div
      className={`field-group box-border max-w-[48.125rem] !border !border-solid !border-cfpbBorderColor bg-gray5 p-[1.875rem] ${className}`}
    >
      {children}
    </div>
  );
}

export default FieldGroup;
