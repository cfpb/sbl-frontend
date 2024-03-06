import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

export function FormSectionWrapper({
  children,
}: {
  children: JSXElement[];
}): JSXElement {
  return <div className='u-mt60'>{children}</div>;
}

export default FormSectionWrapper;
