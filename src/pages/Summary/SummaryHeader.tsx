import { Alert } from 'design-system-react';
import type { Scenario } from './Summary.data';
import { scenarios, summaryFormHeaderMessages } from './Summary.data';

interface SummaryProperties {
  scenario: Scenario;
}

/**
 *
 * @returns Header for Summary
 */
function SummaryHeader({
  scenario = scenarios.Error1,
}: SummaryProperties): JSX.Element {
  return (
    <div id='Summary' className='mb-[2.8125rem] max-w-[41.875rem]'>
      <h1 className='mb-[1.875rem]'>
        {summaryFormHeaderMessages[scenario].header}
      </h1>
      <Alert
        message={summaryFormHeaderMessages[scenario].message}
        status={summaryFormHeaderMessages[scenario].type}
      >
        {summaryFormHeaderMessages[scenario].children}
      </Alert>
    </div>
  );
}

export default SummaryHeader;
