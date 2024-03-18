import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

type StepStatus = 'complete' | 'current' | 'incomplete';

interface StepType {
  status: StepStatus;
  label: string;
}

export const testSteps: StepType[] = [
  { status: 'complete', label: 'Upload file' },
  { status: 'current', label: 'Resolve warnings' },
  { status: 'incomplete', label: 'Review errors' },
  { status: 'incomplete', label: 'Provide point of contact' },
  { status: 'incomplete', label: 'Sign and submit' },
];

const styleMap = {
  complete: 'border-stepIndicatorComplete',
  incomplete: 'border-stepIndicatorIncomplete',
  current: 'border-stepIndicatorCurrent',
};

const statusLabelMap = {
  complete: 'completed',
  incomplete: 'not completed',
  current: null,
};

interface ScreenReaderStatusProperties {
  status: StepStatus;
}

function ScreenReaderStatus({
  status,
}: ScreenReaderStatusProperties): JSXElement {
  const screenReaderStatus = statusLabelMap[status];
  if (!screenReaderStatus) return null;

  return (
    <>
      &nbsp;
      <span className='sr-only'>{screenReaderStatus}</span>
    </>
  );
}

function Step({ status, label }: StepType): JSX.Element {
  return (
    <div
      className={`grow border-0 border-t-8 border-solid pt-2 text-lg font-medium ${styleMap[status]} basis-0`}
      aria-current={status === 'current'}
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
