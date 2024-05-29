import type { ReactNode } from 'react';

interface FormWrapperProperties {
  children: ReactNode;
  isMarginTop?: boolean; // Is margin-top enabled?
}

function FormWrapper({
  children,
  isMarginTop,
}: FormWrapperProperties): JSX.Element {
  const marginTop = isMarginTop ? 'mt-[2.8125rem]' : '';
  return (
    <div className={`mx-5 ${marginTop}`}>
      <div className='mx-auto mb-[3.75rem] max-w-[75rem]'>
        <div className='mx-auto max-w-[48.125rem]'>{children}</div>
      </div>
    </div>
  );
}

FormWrapper.defaultProps = {
  isMarginTop: true,
};

export default FormWrapper;
