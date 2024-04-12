/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/require-default-props */
import CrumbTrail from 'components/CrumbTrail';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import StepIndicator from 'components/StepIndicator';
import { Grid } from 'design-system-react';
import type { FilingType } from 'utils/types';
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
  return (
    <Grid.Wrapper center>
      <Grid.Row>
        <Grid.Column width={12}>
          {/* TODO: 
              Crumbtrail is not part of the design but I want to be able to 
              navigate away from the Filing process
           */}
          <CrumbTrail>
            <Link href='/'>Platform home</Link>
            <Link href='/filing'>Filing home</Link>
          </CrumbTrail>
          <StepIndicator steps={getFilingSteps(currentFiling)} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <SectionIntro heading={heading}>{description}</SectionIntro>
          {children}
          <div className='u-mt60'>
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
              <Link href={hrefNext} disabled={!hrefNext} isJump>
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
