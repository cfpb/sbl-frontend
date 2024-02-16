import { Alert } from 'design-system-react';
import {
  Scenario,
  ScenarioHeader,
  SummaryFormHeaderMessages,
} from './Summary.data';

interface SummaryProperties {
  scenario: Scenario;
}

/**
 *
 * @returns Header for Summary
 */
function SummaryHeader({
  scenario = Scenario.Error1,
}: SummaryProperties): JSX.Element {
  return (
    <div id='Summary' className='mb-[2.8125rem] max-w-[41.875rem]'>
      <h1 className='mb-[1.875rem]'>
        {SummaryFormHeaderMessages[scenario].type === 'error'
          ? ScenarioHeader.Error
          : ScenarioHeader.Status}
      </h1>
      <Alert
        message={SummaryFormHeaderMessages[scenario].message}
        status={SummaryFormHeaderMessages[scenario].type}
      >
        {SummaryFormHeaderMessages[scenario].children}
      </Alert>
    </div>
  );
}

export default SummaryHeader;
