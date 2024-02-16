import { useEffect } from 'react';

import FormWrapper from 'components/FormWrapper';
import type { Scenario } from 'pages/Summary/Summary.data';
import SummaryHeader from './SummaryHeader';

interface SummaryProperties {
  scenario: Scenario;
}

function Summary({ scenario }: SummaryProperties): JSX.Element {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <FormWrapper>
      <div id='Summary'>
        <SummaryHeader scenario={scenario} />
      </div>
    </FormWrapper>
  );
}

export default Summary;
