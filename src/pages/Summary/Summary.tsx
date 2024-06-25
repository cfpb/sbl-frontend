import { useEffect } from 'react';

import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import type { Scenario } from 'pages/Summary/Summary.data';
import { useLocation, useNavigate } from 'react-router-dom';
import type { UserProfileType } from 'types/filingTypes';
import { Link } from '../../components/Link';
import SummaryContent from './SummaryContent';

interface ScenarioStateType {
  scenario: Scenario | undefined;
}

interface SummaryProperties {
  UserProfile?: UserProfileType;
}

function Summary({ UserProfile }: SummaryProperties): JSX.Element | null {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const auth = useSblAuth();
  const { isAuthenticated: userIsAuthenticated, isLoading: isAuthLoading } =
    auth;

  const { state } = useLocation() as { state: ScenarioStateType };
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!state?.scenario) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!state?.scenario || isAuthLoading) {
    return <LoadingContent />;
  }

  const isUserAssociatedWithAnyInstitution =
    UserProfile?.institutions.length && UserProfile.institutions.length > 0;
  const platformHomeLink =
    userIsAuthenticated && isUserAssociatedWithAnyInstitution
      ? '/landing'
      : '/';

  return (
    <main id='main'>
      <CrumbTrail>
        <Link href={platformHomeLink} key='home'>
          Home
        </Link>
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <SummaryContent scenario={state.scenario} />
      </FormWrapper>
    </main>
  );
}

Summary.defaultProps = {
  UserProfile: undefined,
};

export default Summary;
