import { Icon } from 'design-system-react';
import type { ReactElement } from 'react';

export interface ProcessStepNumberProperties {
  number: number | string;
  withBg?: boolean;
  size?: string;
}

/**
 * Generate a number icon
 * @number Icon name or a number representing the number to display
 * @withBg Display icon with solid colored background?
 * @size HTML element to match in size, or size in px/em
 * @returns SVG Icon
 */
export function ProcessStepNumber({
  number,
  withBg,
  size,
}: ProcessStepNumberProperties): ReactElement {
  const StepIcons: Record<number | string, string> = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '0': 'zero',
  };

  let name = (StepIcons[number] || number).toString();
  name += `${withBg ? '-closed' : '-open'}`;

  return (
    <Icon name={name} size={size} ariaLabel={`Step ${StepIcons[number]}`} />
  );
}

ProcessStepNumber.defaultProps = {
  size: 'h4',
  withBg: false,
};
