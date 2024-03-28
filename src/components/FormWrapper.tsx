import type { ReactNode } from 'react';

interface FormWrapperProperties {
  children: ReactNode;
  shortTopMargin: boolean;
}

function FormWrapper({
  children,
  shortTopMargin = false,
}: FormWrapperProperties): JSX.Element {
  const marginTop = shortTopMargin ? 'mt-[1.875rem]' : 'mt-[2.813rem]';
  return (
    <div className={`ml-5 mr-5 ${marginTop}`}>
      <div className='mx-auto max-w-[75rem]'>
        <div className='mx-auto max-w-[48.125rem]'>{children}</div>
      </div>
    </div>
  );
}

export default FormWrapper;
