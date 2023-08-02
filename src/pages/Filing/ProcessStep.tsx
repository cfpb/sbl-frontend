import type { ProcessStepNumberProperties } from './ProcessStepNumber';
import { ProcessStepNumber } from './ProcessStepNumber';

interface ProcessStepProperties {
  heading: string;
  children: (JSX.Element | string)[] | JSX.Element | string;
  size: string;
}

export default function ProcessStep({
  number,
  size,
  heading,
  children
}: ProcessStepNumberProperties & ProcessStepProperties): JSX.Element {
  return (
    <div className='process-step'>
      <ProcessStepNumber {...{ number, size, withBg: true }} />
      <div className='text'>
        <h3 className='heading'>{heading}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

ProcessStep.defaultProps = {
  ...ProcessStepNumber.defaultProps
};
