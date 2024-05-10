import { Alert as AlertDSR } from 'design-system-react';
import type { ComponentProps } from 'react';
import FormParagraph from './FormParagraph';

type AlertProperties = ComponentProps<typeof AlertDSR>;

export function Alert({
  className,
  children,
  ...rest
}: AlertProperties): JSX.Element {
  return (
    <AlertDSR
      {...rest}
      className={`mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem] ${className}`}
    >
      <FormParagraph>{children}</FormParagraph>
    </AlertDSR>
  );
}

export default Alert;
