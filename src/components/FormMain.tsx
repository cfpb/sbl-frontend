import type { ReactNode } from 'react';

interface FormProperties {
  children: ReactNode;
}

/**
 *
 * @returns FormParagraph
 */
function FormMain({
  children,
  className = '',
}: FormProperties & React.ComponentPropsWithoutRef<'form'>): JSX.Element {
  return <div className={`mb-[3.75rem] w-full ${className}`}>{children}</div>;
}

export default FormMain;
