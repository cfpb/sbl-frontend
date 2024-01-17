import { Alert } from 'design-system-react';
import { Scenario, Step2FormHeaderMessages } from './Step2FormHeader.data';

interface Step2FormHeaderProperties {
  scenario: Scenario;
}

/**
 *
 * @returns Header for Step2Form
 */
function Step2FormHeader({
  scenario = Scenario.Success1A,
}: Step2FormHeaderProperties): JSX.Element {
  return (
    <div id='Step2FormHeader' className='mb-[45px] max-w-[670px]'>
      <h1 className='mb-[30px]'>
        {Step2FormHeaderMessages[scenario].type === 'error'
          ? 'Unable to complete registration'
          : 'User profile submission status'}
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
