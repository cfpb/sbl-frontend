import StepIndicator from 'components/StepIndicator';
import { Grid } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { useParams } from 'react-router-dom';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import { getFilingSteps } from './FilingSteps.helpers';

function StatusWrapper({
  children,
}: {
  children: JSX.Element | string;
}): JSXElement {
  return (
    <Grid.Wrapper center>
      <Grid.Row>
        <Grid.Column width={8} className='u-mt15'>
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

// TODO: Better handling of errors (displayed to the user)
export function FilingSteps(): JSX.Element {
  const { lei, year } = useParams();

  const { error, isLoading, filing, submission } = useFilingAndSubmissionInfo({
    lei,
    filingPeriod: year,
  });

  if (error || !filing || !submission)
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    return <StatusWrapper>{error?.message ?? ''}</StatusWrapper>;
  if (isLoading) return <StatusWrapper>Loading</StatusWrapper>;

  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  const { filingSteps } = getFilingSteps(submission, filing);

  return (
    <div className='mx-auto max-w-[75rem] min-[601px]:mx-[1.875rem] xl:mx-auto'>
      <StepIndicator steps={filingSteps} />
    </div>
  );
}

export default FilingSteps;
