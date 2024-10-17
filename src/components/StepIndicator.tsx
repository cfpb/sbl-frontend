/* eslint-disable react/require-default-props */
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import ScreenReaderOnly from './ScreenReaderOnly';

export type StepStatusEnum = 'complete' | 'current' | 'incomplete';

export const STEP_COMPLETE = 'complete';
export const STEP_CURRENT = 'current';
export const STEP_INCOMPLETE = 'incomplete';

export interface StepType {
  status: StepStatusEnum;
  label: string;
  isCurrent?: boolean;
  hasMargin?: boolean;
}

export const mockSteps: StepType[] = [
  { status: STEP_CURRENT, label: 'Upload file' },
  { status: STEP_INCOMPLETE, label: 'Resolve errors' },
  { status: STEP_INCOMPLETE, label: 'Review warnings' },
  { status: STEP_INCOMPLETE, label: 'Provide filing details' },
  { status: STEP_INCOMPLETE, label: 'Sign and submit' },
];

export const stepStyleMap = {
  [STEP_COMPLETE]: 'border-navy font-medium text-black',
  [STEP_CURRENT]: 'border-pacific font-medium text-black',
  [STEP_INCOMPLETE]: 'border-gray20 font-medium text-grayDark',
};

export const screenReaderStatusMap = {
  [STEP_COMPLETE]: 'completed',
  [STEP_CURRENT]: 'in progress',
  [STEP_INCOMPLETE]: 'not completed',
};

interface ScreenReaderStatusProperties {
  status: StepStatusEnum;
}

function ScreenReaderStatus({
  status,
}: ScreenReaderStatusProperties): JSXElement {
  return (
    <>
      &nbsp;
      <ScreenReaderOnly>{screenReaderStatusMap[status]}</ScreenReaderOnly>
    </>
  );
}

export function Step({
  status,
  label,
  isCurrent,
  hasMargin,
}: StepType): JSX.Element {
  const statusAdjusted = isCurrent ? STEP_CURRENT : status;
  const border = `border-0 border-t-8 border-solid`;
  const font = 'text-lg';
  const flex = 'basis-0 grow';
  const margin = hasMargin ? 'ml-[0.9375rem]' : '';

  return (
    <div
      aria-current={isCurrent}
      data-testid='step-wrapper'
      className={`${border} ${font} ${flex} ${margin} ${stepStyleMap[statusAdjusted]} pt-3`}
    >
      <span className='label'>
        {label}
        <ScreenReaderStatus status={statusAdjusted} />
      </span>
    </div>
  );
}

interface StepIndicatorPropertyTypes {
  steps: StepType[];
}

export function StepIndicator({
  steps,
}: StepIndicatorPropertyTypes): JSX.Element {
  return (
    <div className='step-indicator' aria-label='progress'>
      <div className='flex w-full flex-1 grow flex-row p-0'>
        {steps.map((step, stepIndex) => (
          <Step key={step.label} {...step} hasMargin={stepIndex > 0} />
        ))}
      </div>
    </div>
  );
}

export default StepIndicator;
