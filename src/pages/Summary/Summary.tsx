import { useEffect } from 'react';

import CrumbTrail from 'components/CrumbTrail';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import { Link } from 'design-system-react';
import type { Scenario } from 'pages/Summary/Summary.data';
import { scenarios } from 'pages/Summary/Summary.data';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryContent from './SummaryContent';

interface ScenarioStateType {
  scenario: Scenario | undefined;
}

function Summary(): JSX.Element | null {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { state } = useLocation() as { state: ScenarioStateType };
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!state?.scenario) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!state?.scenario) {
    return <LoadingContent />;
  }

  const hasCrumbTrail =
    state.scenario === scenarios.SuccessInstitutionProfileUpdate;

  return (
    <main id='main'>
      {hasCrumbTrail ? (
        <CrumbTrail>
          <Link isRouterLink href='/landing' key='home'>
            Platform home
          </Link>
        </CrumbTrail>
      ) : null}
      <FormWrapper isMarginTop={!hasCrumbTrail}>
        <div id='Summary'>
          <SummaryContent scenario={state.scenario} />
        </div>
      </FormWrapper>
    </main>
  );
}

export default Summary;
