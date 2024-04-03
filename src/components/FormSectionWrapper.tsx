import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

export function FormSectionWrapper({
  isFieldSet = true,
  legend = '',
  children,
}: {
  isFieldSet?: boolean;
  legend?: string;
  children: JSXElement[];
}): JSXElement {
  if (isFieldSet)
    return (
      <fieldset className='u-mt60'>
        {legend ? <legend>{legend}</legend> : null}
        {children}
      </fieldset>
    );
  return <div className='u-mt60'>{children}</div>;
}

export default FormSectionWrapper;
