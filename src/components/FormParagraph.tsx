import type { ReactNode } from 'react';

interface FormParagraphProperties {
  children: ReactNode;
}

/**
 *
 * @returns FormParagraph
 */
function FormParagraph({
  children,
  className = '',
}: FormParagraphProperties & React.ComponentPropsWithoutRef<'p'>): JSX.Element {
  return <p className={`max-w-[41.875rem] ${className}`}>{children}</p>;
}

export default FormParagraph;
