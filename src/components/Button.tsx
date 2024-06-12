import { Button as ButtonDSR } from 'design-system-react';
import type { ComponentProps } from 'react';

type ButtonProperties = ComponentProps<typeof ButtonDSR>;

/* Handles new secondary styling */

const newSecondaryStyle =
  'cursor-pointer border-[1px] border-solid border-pacific bg-white text-pacific disabled:cursor-not-allowed disabled:border-none';

export function Button({
  children,
  className,
  appearance,
  ...rest
}: ButtonProperties): JSX.Element {
  return (
    <ButtonDSR
      {...rest}
      appearance={appearance}
      className={`${
        appearance === 'secondary' ? newSecondaryStyle : ''
      } ${className}`}
    >
      {children}
    </ButtonDSR>
  );
}

export default Button;
