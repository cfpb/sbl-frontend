import { useEffect } from 'react';

import FormWrapper from 'components/FormWrapper';
import type { Scenario } from 'pages/Summary/Summary.data';
import { useLocation } from 'react-router-dom';
import SummaryHeader from './SummaryHeader';

interface ScenarioStateType {
  scenario: Scenario;
}

function Summary(): JSX.Element {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const {
    state: { scenario },
  } = useLocation() as { state: ScenarioStateType };

  return (
    <FormWrapper>
      <div id='Summary'>
        <SummaryHeader scenario={scenario} />
      </div>
    </FormWrapper>
  );
}

export default Summary;
