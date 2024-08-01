import classnames from 'classnames';
import type { ReactElement, ReactNode } from 'react';

interface WrapperPageContentProperties extends Partial<ReactElement> {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

/**
 * Component that applies the standard width restrictions
 */
export function WrapperPageContent({
  children,
  className,
  ...properties
}: WrapperPageContentProperties): React.ReactElement {
  return (
    <div
      {...properties}
      className={classnames([
        'mx-auto max-w-[75rem] min-[601px]:mx-[1.875rem] xl:mx-auto',
        className,
      ])}
    >
      {children}
    </div>
  );
}

export default WrapperPageContent;
