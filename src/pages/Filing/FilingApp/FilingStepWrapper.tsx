/* eslint-disable react/require-default-props */
import SectionIntro from 'components/SectionIntro';
import StepIndicator from 'components/StepIndicator';
import { Grid } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import { NavigationNext, NavigationPrevious } from './FilingStepNavButtons';
import { getFilingSteps } from './FilingStepWrapper.helpers';

interface FilingStepWrapperProperties {
  heading?: string;
  description?: string;
  hrefNext?: string;
  hrefPrevious?: string;
  labelNext?: string;
  labelPrevious?: string;
  children?: JSX.Element | string;
  hideNavigationButtons?: boolean;
  isStepComplete?: boolean;
}

function StatusWrapper({ children }: { children: JSX.Element }): JSXElement {
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

export function FilingStepWrapper({
  heading,
  description,
  hrefNext,
  hrefPrevious,
  labelNext = 'Save and continue',
  labelPrevious = 'Go back to previous step',
  hideNavigationButtons = false,
  children,
  isStepComplete = false,
}: FilingStepWrapperProperties): JSX.Element {
  const { lei, year } = useParams();

  const {
    error,
    isLoading,
    filing,
    submission,
    refetchFiling,
    refetchSubmission,
  } = useFilingAndSubmissionInfo({ lei, filingPeriod: year });

  // Update StepIndicator when current step's status changes
  useEffect(() => {
    const refreshAll = async (): Promise<void> => {
      await refetchFiling?.();
      await refetchSubmission?.();
    };

    void refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStepComplete]);

  if (error) return <StatusWrapper>{error}</StatusWrapper>;
  if (isLoading) return <StatusWrapper>{isLoading}</StatusWrapper>;

  const filingSteps = getFilingSteps(submission, filing);

  let navButtons: JSX.Element | string = '';
  if (!hideNavigationButtons) {
    navButtons = (
      <div className='u-mb60'>
        <NavigationPrevious label={labelPrevious} href={hrefPrevious} />
        <NavigationNext
          href={hrefNext}
          label={labelNext}
          disabled={!isStepComplete}
        />
      </div>
    );
  }

  return (
    <Grid.Wrapper center>
      <Grid.Row>
        {/* TODO: Re-evaluate container and step indicator widths */}
        <Grid.Column width={12}>
          <StepIndicator steps={filingSteps} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <SectionIntro heading={heading}>{description}</SectionIntro>
          {children}
          {navButtons}
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

export default FilingStepWrapper;
