import Head from 'components/Head';
import StepIndicator, { mockSteps } from 'components/StepIndicator';
import { Button, Grid, Heading, Icon } from 'design-system-react';
import { useParams } from 'react-router-dom';

export function FileSubmission(): JSX.Element {
  const { lei } = useParams();

  return (
    <>
      <Head title='File your Small Business Lending data' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={12}>
            <StepIndicator steps={mockSteps} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Heading className='my-10'>Upload file for {lei}</Heading>
            <div className='align-center flex w-full flex-nowrap content-center bg-slate-200 py-20  text-2xl'>
              <div className='w-full content-center justify-center pt-5 text-center text-slate-600'>
                <Icon name='upload' className='mr-3' /> Upload File
              </div>
            </div>
            <div className='my-10'>
              <Button label='Next step' iconRight='arrow-right' />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default { FileSubmission };
