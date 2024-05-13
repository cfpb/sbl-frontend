import { Grid } from 'design-system-react';
import { useNavigate, useParams } from 'react-router-dom';
import { FilingNavButtons } from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';

function FilingSubmit(): JSX.Element {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onPreviousClick = (): void => navigate(`/filing/${year}/${lei}/submit`);
  const onNextClick = (): void => navigate(`/filing/${year}/${lei}/upload`);

  return (
    <>
      <FilingSteps />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            FILING SUMMARY CONTENT GOES HERE
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <FilingNavButtons
              onPreviousClick={onPreviousClick}
              labelNext='Upload a new file'
              iconNext='upload'
              onNextClick={onNextClick}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default FilingSubmit;
