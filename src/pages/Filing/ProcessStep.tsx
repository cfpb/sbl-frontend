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
    <div className='flex flex-row mb-[1.5em] pr-[5em]'>
      <ProcessStepNumber {...{ number, size, withBg: true }} />
      <div className='ml-[0.5em]'>
        <h3 className='heading'>{heading}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

ProcessStep.defaultProps = {
  ...ProcessStepNumber.defaultProps
};
