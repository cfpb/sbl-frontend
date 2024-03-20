import CrumbTrail from 'components/CrumbTrail';
import FieldGroup from 'components/FieldGroup';
import FileInput from 'components/FileInput';
import FormMain from 'components/FormMain';
import Head from 'components/Head';
import { Grid, Label, Link } from 'design-system-react';
import { useParams } from 'react-router-dom';

const StepBasis = 'grow border-x-0 border-b-0 border-t-4 border-solid';
const StepActive = `${StepBasis} border-green-600 text-green-600`;
const StepPending = `${StepBasis} border-slate-500`;

export function FileSubmission(): JSX.Element {
  const { lei } = useParams();

  const onHandleFileChange = event => {
    const file = event.target.files[0];

    console.log('file:', file);
    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   const content = e.target.result;
    //   setCsvData(content);
    // };

    // reader.readAsText(file);
  };

  return (
    <>
      <Head title='File your Small Business Lending data' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8}>
            <CrumbTrail>
              <Link isRouterLink href='/landing'>
                Shared Landing
              </Link>
              <Link isRouterLink href='/filing'>
                Filing Overview
              </Link>
            </CrumbTrail>
            <div className='my-10 flex w-full flex-row space-x-5'>
              <div className={StepActive}>Step1</div>
              <div className={StepPending}>Step2</div>
              <div className={StepPending}>Step3</div>
              <div className={StepPending}>Step4</div>
              <div className={StepPending}>Step5</div>
            </div>
            {/* <Heading className='my-10'>Upload file for {lei}</Heading>
            <div className='align-center flex w-full flex-nowrap content-center bg-slate-200 py-20  text-2xl'>
              <div className='w-full content-center justify-center pt-5 text-center text-slate-600'>
                <Icon name='upload' className='mr-3' /> Upload File
              </div>
            </div> */}
            <div className='my-10'>
              {/* <Button label='Next step' iconRight='arrow-right' /> */}
              <FormMain>
                <FieldGroup>
                  <Label htmlFor='file-input-specific'>Upload your files</Label>
                  <div id='file-input-specific-hint'>
                    Select one or more CSV files
                  </div>
                  <FileInput
                    id='file-input-specific'
                    name='file-input-specific'
                    accept='.csv'
                    aria-describedby='file-input-specific-hint'
                    multiple
                    onChange={onHandleFileChange}
                  />
                </FieldGroup>
              </FormMain>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default { FileSubmission };
