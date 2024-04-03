import type { ReactNode } from 'react';

interface FormHeaderWrapperProperties {
  children: ReactNode;
}

// Children should include: TextIntroduction
function FormHeaderWrapper({
  children,
}: FormHeaderWrapperProperties): JSX.Element {
  return (
    <div className='mb-[3.75rem] mt-[1.875rem] max-w-[41.875rem]'>
      {children}
    </div>
  );
}

export default FormHeaderWrapper;
