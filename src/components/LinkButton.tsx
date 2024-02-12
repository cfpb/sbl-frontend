/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon, Link, LinkText } from 'design-system-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface LinkButtonProperties {
  icon: string;
  children: ReactNode;
  onClick: React.ChangeEvent;
}

function LinkButton({
  className,
  icon = 'plus',
  onClick,
  children,
}: ComponentPropsWithoutRef<'a'> & LinkButtonProperties): JSX.Element {
  return (
    <Link
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      isJumpLeft
    >
      <Icon name={icon} />
      <LinkText className='ml-2'>{children}</LinkText>
    </Link>
  );
}

export default LinkButton;
