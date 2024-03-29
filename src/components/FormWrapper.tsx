import type { ReactNode } from 'react';

interface FormWrapperProperties {
  children: ReactNode;
  shortTopMargin?: boolean;
}

function FormWrapper({
  children,
  shortTopMargin,
}: FormWrapperProperties): JSX.Element {
  // style: Used this if there is a CrumbTrail used
  const marginTop = shortTopMargin ? 'mt-[1.875rem]' : 'mt-[2.813rem]';
  return (
    <div className={`mb-[3.75rem] ml-5 mr-5 ${marginTop}`}>
      <div className='mx-auto max-w-[75rem]'>
        <div className='mx-auto max-w-[48.125rem]'>{children}</div>
      </div>
    </div>
  );
}

FormWrapper.defaultProps = {
  shortTopMargin: false,
};

export default FormWrapper;
