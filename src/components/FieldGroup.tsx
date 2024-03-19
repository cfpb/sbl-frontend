import type { ReactNode } from 'react';

interface FieldGroupProperties {
  children: ReactNode;
}

function FieldGroup({ children }: FieldGroupProperties): JSX.Element {
  return (
    <div className='field-group box-border max-w-[48.125rem] !border !border-solid !border-cfpbBorderColor bg-[#F7F8F9] p-[1.875rem]'>
      {children}
    </div>
  );
}

export default FieldGroup;
