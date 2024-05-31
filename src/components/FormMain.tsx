import classnames from 'classnames';
import type { ReactNode } from 'react';

interface FormProperties {
  children: ReactNode;
  onSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
}

/**
 *
 * @returns FormParagraph
 */
function FormMain({
  children,
  className = '',
  onSubmit,
}: FormProperties & React.ComponentPropsWithoutRef<'form'>): JSX.Element {
  return (
    <form
      className={classnames('w-full', 'mb-[3.75rem]', className)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default FormMain;
