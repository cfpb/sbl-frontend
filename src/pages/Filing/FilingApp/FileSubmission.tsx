import CrumbTrail from 'components/CrumbTrail';
import Head from 'components/Head';
import { Button, Grid, Heading, Icon, Link } from 'design-system-react';
import { useParams } from 'react-router-dom';

export function FileSubmission(): JSX.Element {
  const { lei } = useParams();

  return (
    <>
      <Head title='File your Small Business Lending data' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={10}>
            <CrumbTrail>
              <Link isRouterLink href='/landing'>
                Shared Landing
              </Link>
              <Link isRouterLink href='/filing'>
                Filing Overview
              </Link>
            </CrumbTrail>
            <div className='my-10 flex w-full flex-row space-x-10'>
              <div className='grow border-x-0 border-b-0 border-t-4 border-solid border-green-600 text-green-600'>
                Step1
              </div>
              <div className='grow border-x-0 border-b-0 border-t-4 border-solid border-slate-500'>
                Step2
              </div>
              <div className='grow border-x-0 border-b-0 border-t-4 border-solid border-slate-500'>
                Step3
              </div>
              <div className='grow border-x-0 border-b-0 border-t-4 border-solid border-slate-500'>
                Step4
              </div>
              <div className='grow border-x-0 border-b-0 border-t-4 border-solid border-slate-500'>
                Step5
              </div>
            </div>
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
