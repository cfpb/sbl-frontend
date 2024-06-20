import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

export function FormSectionWrapper({
  className = 'u-mt60',
  children,
}: {
  children: JSXElement[];
  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line react/require-default-props
  className?: string;
}): JSXElement {
  return <div className={className}>{children}</div>;
}

export default FormSectionWrapper;
