import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

export function FormSectionWrapper({
  isFieldSet = true,
  legend = '',
  className = 'u-mt60',
  children,
}: {
  // TODO: https://github.com/cfpb/sbl-frontend/issues/355
  /* eslint-disable react/require-default-props */
  isFieldSet?: boolean;
  legend?: string;
  children: JSXElement[];
  className?: string;
  /* eslint-enable react/require-default-props */
}): JSXElement {
  if (isFieldSet)
    return (
      <fieldset className={className}>
        {legend ? <legend>{legend}</legend> : null}
        {children}
      </fieldset>
    );
  return <div className={className}>{children}</div>;
}

export default FormSectionWrapper;
