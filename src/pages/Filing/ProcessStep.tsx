import { Heading, Paragraph } from 'design-system-react';
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
  children,
}: ProcessStepNumberProperties & ProcessStepProperties): JSX.Element {
  return (
    <div className='mb-[1.5em] flex flex-row items-baseline pr-[5em]'>
      <ProcessStepNumber {...{ number, size }} />
      <div className='ml-[0.5em]'>
        <Heading type='4'>{heading}</Heading>
        <Paragraph>{children}</Paragraph>
      </div>
    </div>
  );
}

ProcessStep.defaultProps = {
  ...ProcessStepNumber.defaultProps,
};
