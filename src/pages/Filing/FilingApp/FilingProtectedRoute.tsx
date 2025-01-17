import { LoadingContent } from 'components/Loading';
import type { JSX } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { FILING_PAGE_ORDER, NegativeOne, Zero } from 'utils/constants';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import { Error500 } from '../../Error/Error500';
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

  if (error || typeof submission === 'string' || !submission)
    return (
      <Error500
        error={{ message: `${(error as { message?: string })?.message}` }}
      />
    );

  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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
