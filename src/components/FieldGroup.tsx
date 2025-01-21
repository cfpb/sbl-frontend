import type { ReactNode } from 'react';

interface FieldGroupProperties {
  children: ReactNode;
}

function FieldGroup({
  className,
  children,
}: FieldGroupProperties & JSX.IntrinsicElements['div']): JSX.Element {
  // TODO: Consolidate colors to tailwind theme: https://github.com/cfpb/sbl-frontend/issues/1094
  return (
    <div
      className={`field-group box-border max-w-[48.125rem] !border !border-solid !border-cfpbBorderColor bg-[#F7F8F9] p-[1.875rem] ${className}`}
    >
      {children}
    </div>
  );
}

export default FieldGroup;
