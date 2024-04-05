/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/require-default-props */
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import StepIndicator from 'components/StepIndicator';
import { Grid } from 'design-system-react';
import type { FilingType } from 'utils/types';
import { getFilingSteps } from './FilingRouting.helpers';

interface PlaceholderProperties {
  heading: string;
  hrefNext?: string;
  hrefPrevious?: string;
  currentFiling?: FilingType;
}

export function FilingStepWrapper({
  heading,
  hrefNext,
  hrefPrevious,
  currentFiling,
}: PlaceholderProperties): JSX.Element {
  return (
    <Grid.Wrapper center>
      <Grid.Row>
        <Grid.Column width={12}>
          <StepIndicator steps={getFilingSteps(currentFiling)} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <SectionIntro heading={heading}>This is a placeholder</SectionIntro>
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
            ) : null}
            {hrefNext ? (
              <Link href={hrefNext} disabled={!hrefNext} isJump>
                Next {'>'}
              </Link>
            ) : null}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

export default FilingStepWrapper;
