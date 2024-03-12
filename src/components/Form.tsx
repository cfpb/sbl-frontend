import type { ReactNode } from 'react';

interface FormProperties {
  children: ReactNode;
}

/**
 *
 * @returns FormParagraph
 */
function Form({
  children,
  className = '',
}: FormProperties & React.ComponentPropsWithoutRef<'form'>): JSX.Element {
  return <form className={`mb-[3.75rem] w-full ${className}`}>{children}</form>;
}

export default Form;
