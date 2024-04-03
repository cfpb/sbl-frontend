import { Alert, Heading } from 'design-system-react';
import type { Scenario } from './Summary.data';
import { scenarios, summaryFormHeaderMessages } from './Summary.data';

interface SummaryProperties {
  scenario: Scenario;
}

/**
 *
 * @returns Header for Summary
 */
function SummaryContent({
  scenario = scenarios.Error1,
}: SummaryProperties): JSX.Element {
  return (
    <div id='Summary' className='mb-[2.8125rem]'>
      <Heading className='mb-[1.875rem]' type='1'>
        {summaryFormHeaderMessages[scenario].header}
      </Heading>
      <Alert
        // Note: Potentially should put this change in the DSR
        className='[&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
        message={summaryFormHeaderMessages[scenario].message}
        status={summaryFormHeaderMessages[scenario].type}
      >
        {summaryFormHeaderMessages[scenario].children}
      </Alert>
    </div>
  );
}

export default SummaryContent;
