import classnames from 'classnames';
import { Button } from 'components/Button';
import type { Button as ButtonDSR } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';

type ButtonDSRProperties = ComponentProps<typeof ButtonDSR>;

export interface NavigationButtonProperties {
  // eslint-disable-next-line react/require-default-props
  href?: string;
}

export function NavigationButton({
  label = 'Next',
  href,
  disabled,
  appearance = 'primary',
  iconLeft,
  iconRight,
  className = '',
}: ButtonDSRProperties & NavigationButtonProperties): JSXElement {
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
}: ButtonDSRProperties & NavigationButtonProperties): JSXElement {
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
}: ButtonDSRProperties & NavigationButtonProperties): JSXElement {
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

interface FilingNavButtonsProperties {
  // eslint-disable-next-line react/require-default-props
  hrefNext?: string;
  // eslint-disable-next-line react/require-default-props
  hrefPrevious?: string;
  // eslint-disable-next-line react/require-default-props
  labelNext?: string;
  // eslint-disable-next-line react/require-default-props
  labelPrevious?: string;
  // eslint-disable-next-line react/require-default-props
  hideNavigationButtons?: boolean;
  // eslint-disable-next-line react/require-default-props
  isStepComplete?: boolean;
  // eslint-disable-next-line react/require-default-props
  classNameButtonContainer?: string;
}

export function FilingNavButtons({
  hrefNext,
  hrefPrevious,
  labelNext = 'Save and continue',
  labelPrevious = 'Go back to previous step',
  hideNavigationButtons,
  isStepComplete,
  classNameButtonContainer,
}: FilingNavButtonsProperties): JSXElement {
  if (hideNavigationButtons) return null;

  return (
    <div className={classnames('u-mb60', classNameButtonContainer)}>
      <NavigationPrevious label={labelPrevious} href={hrefPrevious} />
      <NavigationNext
        href={hrefNext}
        label={labelNext}
        disabled={!isStepComplete}
      />
    </div>
  );
}

export default FilingNavButtons;
