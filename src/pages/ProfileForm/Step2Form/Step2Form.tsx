import { useEffect } from 'react';
import useProfileForm from 'store/useProfileForm';

import FormWrapper from 'components/FormWrapper';
import Step2FormHeader from './Step2FormHeader';

function Step2Form(): JSX.Element {
  const selectedScenario = useProfileForm(state => state.selectedScenario);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <FormWrapper>
      <div id='step2form'>
        <Step2FormHeader scenario={selectedScenario} />
      </div>
    </FormWrapper>
  );
}

export default Step2Form;
