import type { ReactNode } from 'react';

interface Properties {
  children: ReactNode;
}

function FormHeaderWrapper({ children }: Properties): JSX.Element {
  return (
    <div className='mb-[3.75rem] mt-[2.84375rem] max-w-[41.875rem]'>
      {children}
    </div>
  );
}

export default FormHeaderWrapper;
