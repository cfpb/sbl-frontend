import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

export function FormSectionWrapper({
  className = 'u-mt60',
  children,
}: {
  children: JSXElement[];
  className?: string;
}): JSXElement {
  return <div className={className}>{children}</div>;
}

export default FormSectionWrapper;
