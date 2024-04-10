/* eslint-disable react/require-default-props */
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import StepIndicator from 'components/StepIndicator';
import { Grid } from 'design-system-react';
import type { FilingType } from 'types/filingTypes';
import { getFilingSteps } from './FilingStepWrapper.helpers';

interface FilingStepWrapperProperties {
  heading: string;
  description?: string;
  hrefNext?: string;
  hrefPrevious?: string;
  currentFiling?: FilingType;
  children?: JSX.Element | JSX.Element[] | string;
}

export function FilingStepWrapper({
  heading,
  description = 'Page description goes here',
  hrefNext,
  hrefPrevious,
  currentFiling,
  children,
}: FilingStepWrapperProperties): JSX.Element {
  /* TODO: Determine steps status */
  const isStepComplete = hrefNext;

  return (
    <Grid.Wrapper center>
      <Grid.Row>
        {/* TODO: Re-evaluate container and step indicator widths */}
        <Grid.Column width={12}>
          <StepIndicator steps={getFilingSteps(currentFiling)} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <SectionIntro heading={heading}>{description}</SectionIntro>
          {children}
          <div className='u-mt60 u-mb60'>
            {hrefPrevious ? (
              <Link
                href={hrefPrevious}
                disabled={!hrefPrevious}
                className='mr-3'
                isJump
              >
                {'<'} Previous
              </Link>
            ) : (
              <span className='mr-3'>{'<'} Previous</span>
            )}
            {hrefNext ? (
              <Link href={isStepComplete} disabled={!isStepComplete} isJump>
                Next {'>'}
              </Link>
            ) : (
              'Next >'
            )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

export default FilingStepWrapper;
