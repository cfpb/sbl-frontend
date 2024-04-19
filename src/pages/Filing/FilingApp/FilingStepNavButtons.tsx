/* eslint-disable react/require-default-props */
import classnames from 'classnames';
import { Button } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { useNavigate } from 'react-router-dom';

export interface NavigationButtonProperties {
  label?: string;
  href?: string;
  disabled?: boolean;
  appearance?: (typeof Button)['appearance'];
  iconLeft?: string;
  iconRight?: string;
  className?: string;
}

export function NavigationButton({
  label = 'Next',
  href,
  disabled,
  appearance = 'primary',
  iconLeft,
  iconRight,
  className = '',
}: NavigationButtonProperties): JSXElement {
  const navigate = useNavigate();

  const onClick = (): void => {
    if (!href) return;
    navigate(href);
  };

  if (!href) return null;
  return (
    <Button
      appearance={appearance}
      className={classnames('mt-[1.875rem]', className)}
      disabled={disabled}
      iconLeft={iconLeft}
      iconRight={iconRight}
      label={label}
      onClick={onClick}
      size='default'
    />
  );
}

export function NavigationPrevious({
  label,
  href,
  disabled,
}: NavigationButtonProperties): JSXElement {
  return (
    <NavigationButton
      className='mr-3'
      appearance='secondary'
      disabled={disabled}
      href={href}
      iconLeft='left'
      label={label}
    />
  );
}

export function NavigationNext({
  label,
  href,
  disabled,
}: NavigationButtonProperties): JSXElement {
  return (
    <NavigationButton
      appearance='primary'
      disabled={disabled}
      href={href}
      iconRight='right'
      label={label}
    />
  );
}
