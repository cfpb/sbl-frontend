import type { ReactNode } from 'react';

interface FormHeaderWrapperProperties {
  crumbTrailMarginTop?: boolean;
  children: ReactNode;
}

function FormHeaderWrapper({
  crumbTrailMarginTop,
  children,
}: FormHeaderWrapperProperties): JSX.Element {
  const marginTop = crumbTrailMarginTop ? 'mt-[1.875rem]' : 'mt-[2.84375rem]';
  return (
    <div className={`mb-[3.75rem] max-w-[41.875rem] ${marginTop} `}>
      {children}
    </div>
  );
}

FormHeaderWrapper.defaultProps = {
  crumbTrailMarginTop: false,
};

export default FormHeaderWrapper;
