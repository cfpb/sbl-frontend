import type { ReactNode } from 'react';

interface Properties {
  children: ReactNode;
  isFilingStep?: boolean;
}

function FormButtonGroup({ isFilingStep, children }: Properties): JSX.Element {
  return (
    <div
      className={`mt-[1.875rem] flex ${
        isFilingStep ? 'gap-[1.125rem]' : 'gap-[0.625rem]'
      }`}
    >
      {children}
    </div>
  );
}

FormButtonGroup.defaultProps = {
  isFilingStep: false,
};

export default FormButtonGroup;
