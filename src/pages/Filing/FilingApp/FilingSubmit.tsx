import { Grid } from 'design-system-react';
import { useParams } from 'react-router-dom';
import { FilingNavButtons } from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';

function FilingSubmit(): JSX.Element {
  const { lei, year } = useParams();

  return (
    <>
      <FilingSteps />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            SIGN & SUBMIT CONTENT GOES HERE
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <FilingNavButtons
              hrefPrevious={`/filing/${year}/${lei}/contact`}
              hrefNext={`/filing/${year}/${lei}/done`}
              isStepComplete // TODO: Derive actual step status
            />
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default FilingSubmit;
