import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

type StepStatus = 'complete' | 'current' | 'incomplete';

export const STEP_COMPLETE = 'complete';
export const STEP_CURRENT = 'current';
export const STEP_INCOMPLETE = 'incomplete';

export interface StepType {
  status: StepStatus;
  label: string;
}

export const mockSteps: StepType[] = [
  { status: STEP_COMPLETE, label: 'Upload file' },
  { status: STEP_COMPLETE, label: 'Resolve errors' },
  { status: STEP_CURRENT, label: 'Review warnings' },
  { status: STEP_INCOMPLETE, label: 'Provide point of contact' },
  { status: STEP_INCOMPLETE, label: 'Sign and submit' },
];

export const stepStyleMap = {
  [STEP_COMPLETE]: 'border-stepIndicatorComplete text-stepIndicatorComplete',
  [STEP_CURRENT]: 'border-stepIndicatorCurrent text-stepIndicatorCurrent ',
  [STEP_INCOMPLETE]: 'border-stepIndicatorIncomplete',
};

export const screenReaderStatusMap = {
  [STEP_COMPLETE]: 'completed',
  [STEP_CURRENT]: 'in progress',
  [STEP_INCOMPLETE]: 'not completed',
};

interface ScreenReaderStatusProperties {
  status: StepStatus;
}

function ScreenReaderStatus({
  status,
}: ScreenReaderStatusProperties): JSXElement {
  return (
    <>
      &nbsp;
      <span className='sr-only'>{screenReaderStatusMap[status]}</span>
    </>
  );
}

export function Step({ status, label }: StepType): JSX.Element {
  const border = `border-0 border-t-8 border-solid`;
  const font = `text-lg ${
    status === STEP_CURRENT ? 'font-bold' : 'font-medium'
  }`;
  const flex = 'basis-0 grow';

  return (
    <div
      aria-current={status === STEP_CURRENT}
      data-testid='step-wrapper'
      className={`${border} ${font} ${flex} ${stepStyleMap[status]} pt-3`}
    >
      <span className='label'>
        {label}
        <ScreenReaderStatus status={status} />
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
      <div className='my-10 flex w-full flex-1 grow flex-row space-x-3 p-0'>
        {steps.map(step => (
          <Step key={step.label} {...step} />
        ))}
      </div>
    </div>
  );
}

export default StepIndicator;
