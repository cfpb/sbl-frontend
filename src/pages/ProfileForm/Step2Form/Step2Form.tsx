import { useEffect } from 'react';
import useProfileForm from 'store/useProfileForm';

import { Link, Alert } from 'design-system-react';
import Step2FormHeader from './Step2FormHeader';

import { Step2FormHeaderMessages } from './Step2FormHeader.data';

interface Properties {}

function Step2Form({}: Properties): JSX.Element {
  const selectedScenario = useProfileForm(state => state.selectedScenario);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div id='step2form'>
      <Step2FormHeader scenario={selectedScenario} />
    </div>
  );
}

export default Step2Form;
