import type { ReactNode } from 'react';

interface Properties {
  children: ReactNode;
}

function FormButtonGroup({ children }: Properties): JSX.Element {
  return <div className='mt-[1.875rem] flex gap-[0.625rem]'>{children}</div>;
}

export default FormButtonGroup;
