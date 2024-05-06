import classnames from 'classnames';
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
  return (
    <form className={classnames('w-full', 'mb-[3.75rem]', className)}>
      {children}
    </form>
  );
}

export default FormMain;
