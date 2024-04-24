/* eslint-disable react/require-default-props */
import StepIndicator from 'components/StepIndicator';
import { Grid, TextIntroduction } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { Link } from 'react-router-dom';
import { getFilingSteps } from './FilingStepWrapper.helpers';

interface FilingStepWrapperProperties {
  heading: string;
  description?: string;
  subheading?: string;
  hrefNext?: string;
  hrefPrevious?: string;
  labelNext?: string;
  labelPrevious?: string;
  children?: JSX.Element | JSX.Element[] | string;
  hideNavigationButtons?: boolean;
  isStepComplete?: boolean;
  classNameButtonContainer?: string;
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
  heading = '',
  subheading = '',
  description,
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
          <TextIntroduction
            heading={heading}
            subheading={subheading}
            description={description}
          />
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
