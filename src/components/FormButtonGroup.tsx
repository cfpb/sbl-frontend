import type { ReactNode } from 'react';

interface FormButtonGroupProperties {
  children: ReactNode;
  isFilingStep?: boolean;
}

function FormButtonGroup({
  className,
  isFilingStep,
  children,
}: FormButtonGroupProperties & JSX.IntrinsicElements['div']): JSX.Element {
  return (
    <div
      className={`mt-[1.875rem] flex ${
        isFilingStep ? 'gap-[1.125rem]' : 'gap-[0.625rem]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

FormButtonGroup.defaultProps = {
  isFilingStep: false,
};

export default FormButtonGroup;
