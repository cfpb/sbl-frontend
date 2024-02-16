import { useEffect } from 'react';
import useProfileForm from 'store/useProfileForm';

import Step2FormHeader from './Step2FormHeader';

function Step2Form(): JSX.Element {
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
