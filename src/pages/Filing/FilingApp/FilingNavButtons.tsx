import Button from 'components/Button';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

interface FilingNavButtonsProperties {
  // eslint-disable-next-line react/require-default-props
  labelNext?: string;
  // eslint-disable-next-line react/require-default-props
  labelPrevious?: string;
  // eslint-disable-next-line react/require-default-props
  labelClear?: string;
  // eslint-disable-next-line react/require-default-props
  hideNavigationButtons?: boolean;
  // eslint-disable-next-line react/require-default-props
  classNameButtonContainer?: string;
  // eslint-disable-next-line react/require-default-props
  isLoading?: boolean;
  // eslint-disable-next-line react/require-default-props
  iconNext?: string;
  // eslint-disable-next-line react/require-default-props
  iconPrevious?: string;
  // eslint-disable-next-line react/require-default-props
  isNextDisabled?: boolean;
  // eslint-disable-next-line react/require-default-props
  typeNext?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  // eslint-disable-next-line react/require-default-props
  onNextClick?: () => Promise<void> | void;
  // eslint-disable-next-line react/require-default-props
  onPreviousClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  onClearClick?: () => void;
}

export function FilingNavButtons({
  // Props for Previous button
  labelPrevious = 'Go back to previous step',
  onPreviousClick,
  iconPrevious = 'left',

  // Props for Next button
  labelNext = 'Save and continue',
  onNextClick,
  iconNext = 'right',
  typeNext = 'submit',
  isNextDisabled = false,

  // Props for Clear button
  labelClear = 'Clear form',
  onClearClick,

  // Shared/global props
  isLoading = false,
  hideNavigationButtons,
  classNameButtonContainer = 'u-mb60',
}: FilingNavButtonsProperties): JSXElement {
  if (hideNavigationButtons) return null;

  return (
    <div className={classNameButtonContainer}>
      {onPreviousClick ? (
        <Button
          id='nav-previous'
          className='mr-[0.938rem]'
          appearance='secondary'
          iconLeft={iconPrevious}
          label={labelPrevious}
          onClick={onPreviousClick}
        />
      ) : null}

      {onNextClick ? (
        <Button
          id='nav-next'
          appearance='primary'
          // eslint-disable-next-line react/jsx-handler-names
          className={onClearClick ? 'mr-[0.938rem]' : ''}
          iconRight={isLoading ? 'updating' : iconNext}
          label={labelNext}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onNextClick}
          disabled={isNextDisabled || isLoading}
          type={typeNext}
        />
      ) : null}

      {onClearClick ? (
        <Button
          id='nav-clear'
          label={labelClear}
          onClick={onClearClick}
          appearance='warning'
          asLink
        />
      ) : null}
    </div>
  );
}

export default FilingNavButtons;
