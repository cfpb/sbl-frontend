import { Button as ButtonDSR } from 'design-system-react';
import type { ComponentProps } from 'react';

type ButtonProperties = ComponentProps<typeof ButtonDSR>;

/* Handles new secondary styling */
const newSecondaryStyle =
  'cursor-pointer border-[1px] border-solid border-pacific bg-white text-pacific disabled:cursor-not-allowed disabled:border-none';

/* Handles increasing the dimensions of non-secondary buttons to match the new secondary style */
// TODO: Fix in the DS and DSR: https://github.com/cfpb/design-system-react/issues/365
const newPrimaryBorderStyle =
  'border-solid border-[1px] border-pacific focus:border-pacificDark hover:border-pacificDark disabled:border-gray20';

export function Button({
  children,
  className = '',
  appearance,
  ...rest
}: ButtonProperties): JSX.Element {
  return (
    <ButtonDSR
      {...rest}
      appearance={appearance}
      className={`${
        appearance === 'secondary'
          ? newSecondaryStyle
          : appearance === 'primary'
            ? newPrimaryBorderStyle
            : ''
      } ${className}`}
    >
      {children}
    </ButtonDSR>
  );
}

export default Button;
