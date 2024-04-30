import { Grid } from 'design-system-react';
import { useParams } from 'react-router-dom';
import { FilingNavButtons } from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';

function FilingErrors(): JSX.Element {
  const { lei, year } = useParams();

  return (
    <>
      <FilingSteps />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            ERROR CONTENT GOES HERE
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <FilingNavButtons
              hrefPrevious={`/filing/${year}/${lei}/upload`}
              hrefNext={`/filing/${year}/${lei}/warnings`}
              isStepComplete // TODO: Derive actual step status
            />
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default FilingErrors;
