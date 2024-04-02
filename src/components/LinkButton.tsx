/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, LinkText } from 'design-system-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface LinkButtonProperties {
  icon: string;
  children: ReactNode;
}

function LinkButton({
  className,
  icon = 'plus',
  children,
  ...other
}: ComponentPropsWithoutRef<'button'> & LinkButtonProperties): JSX.Element {
  return (
    <Button
      className={`cursor-pointer ${className}`}
      // TODO: https://github.com/cfpb/design-system-react/issues/311
      // @ts-expect-error label should be ReactNode, fix should be in DSR Repo
      label={
        <>
          <Icon isPresentational name={icon} />
          <LinkText className='ml-2'>{children}</LinkText>
        </>
      }
      asLink
      {...other}
    />
  );
}

export default LinkButton;
