import { Alert } from 'design-system-react';
import {
  Step2FormHeaderMessages,
  Scenario,
  ScenarioHeader,
} from './Step2FormHeader.data';

interface Step2FormHeaderProperties {
  scenario: Scenario;
}

/**
 *
 * @returns Header for Step2Form
 */
function Step2FormHeader({
  scenario = Scenario.Error1,
}: Step2FormHeaderProperties): JSX.Element {
  return (
    <div id='Step2FormHeader' className='mb-[2.8125rem] max-w-[41.875rem]'>
      <h1 className='mb-[1.875rem]'>
        {Step2FormHeaderMessages[scenario].type === 'error'
          ? ScenarioHeader.Error
          : ScenarioHeader.Status}
      </h1>
      <Alert
        message={Step2FormHeaderMessages[scenario].message}
        status={Step2FormHeaderMessages[scenario].type}
      >
        {Step2FormHeaderMessages[scenario].children}
      </Alert>
    </div>
  );
}

export default Step2FormHeader;
