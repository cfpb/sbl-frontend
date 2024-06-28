import { LoadingContent } from 'components/Loading';
import type { JSX } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { FILING_PAGE_ORDER, NegativeOne, Zero } from 'utils/constants';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import { getFilingSteps } from './FilingSteps.helpers';

interface FilingProtectedRouteProperties {
  children: JSX.Element;
}

/**
 * Filing route protection
 *
 * If a user attempts to directly access a Filing step that is beyond
 * where they've progressed in the process, we redirect them to the
 * page corresponding to their "next step".
 */
export function FilingProtectedRoute({
  children,
}: FilingProtectedRouteProperties): JSX.Element {
  const { lei, year } = useParams();
  const location = useLocation();

  const { error, isLoading, filing, submission } = useFilingAndSubmissionInfo({
    lei,
    filingPeriod: year,
  });

  if (isLoading) return <LoadingContent />;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (error) return <Navigate to='/500' state={{ message: error.message }} />;

  const { nextStepIndex } = getFilingSteps(submission, filing);

  const targetPage = location.pathname.split('/').slice(NegativeOne)[Zero];
  const targetIndex = FILING_PAGE_ORDER.indexOf(targetPage);

  // Redirect
  if (!targetPage || targetIndex > nextStepIndex) {
    const nextStepUrl = `/filing/${year}/${lei}/${FILING_PAGE_ORDER[nextStepIndex]}`;
    return <Navigate to={nextStepUrl} />;
  }

  return children;
}

export default FilingProtectedRoute;
