import type { ReactNode } from 'react';

interface FormWrapperProperties {
  children: ReactNode;
}

function FormWrapper({ children }: FormWrapperProperties): JSX.Element {
  return (
    <div className='ml-5 mr-5 mt-[2.813rem]'>
      <div className='mx-auto max-w-[75rem]'>
        <div className='mx-auto max-w-[48.125rem]'>{children}</div>
      </div>
    </div>
  );
}

export default FormWrapper;
