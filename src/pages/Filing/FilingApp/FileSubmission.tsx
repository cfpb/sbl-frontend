import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import FieldGroup from 'components/FieldGroup';
import FileInput from 'components/FileInput';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import { Button, TextIntroduction } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const StepBasis = 'grow border-x-0 border-b-0 border-t-4 border-solid';
const StepActive = `${StepBasis} border-green-600 text-green-600`;
const StepPending = `${StepBasis} border-slate-500`;

export function FileSubmission(): JSX.Element {
  const auth = useSblAuth();
  const { lei } = useParams();
  const [selectedFile, setSelectedFile] = useState<File>();

  const onHandleSelectFile = (e: ChangeEvent) => {
    console.log('file selected:', e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  // const handleSubmit = () => {
  //   mutate();
  // };

  const uploadCsvRequestWrapper = async (): Promise<any> => {
    console.log('clicked');
    const formData = new FormData();
    console.log('created formData', formData);
    formData.append('file', selectedFile);

    console.log('formData:', formData);

    const response = await uploadCsvAxios(auth, formData);
    return response;

    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   const content = e.target.result;
    //   setCsvData(content);
    // };

    // reader.readAsText(file);
  };

  const { mutate, isLoading, isError, error, data } = useMutation(
    uploadCsvRequestWrapper,
  );

  const onHandleUpload = (): void => {
    mutate();
  };

  function StepIndicator() {
    return (
      <div className='my-10 flex w-full flex-row space-x-5'>
        <div className={StepActive}>Step1</div>
        <div className={StepPending}>Step2</div>
        <div className={StepPending}>Step3</div>
        <div className={StepPending}>Step4</div>
        <div className={StepPending}>Step5</div>
      </div>
    );
  }

  return (
    <FormWrapper>
      <div id='upload-csv'>
        <StepIndicator />
        <FormHeaderWrapper crumbTrailMarginTop={false}>
          <TextIntroduction
            heading='Upload file'
            subheading={`Our system performs error and warning validation checks on your data to ensure that data entries are correct and ready to submit. Each record must pass all error validations to continue with the filing process. Warning validations must be verified for accuracy. `}
            description={
              <>
                Your file must be submitted in a comma-separated values (CSV)
                file format and must not exceed 2GB in size. For detailed filing
                specifications reference the{' '}
                <Link href='#'>
                  Filing instructions guide for small business lending data
                </Link>
                .
              </>
            }
          />
        </FormHeaderWrapper>
        <FormMain>
          <FieldGroup>
            <SectionIntro heading='Select a file to upload'>
              To get started, click on "Upload your file," navigate to the file
              on your computer that you wish to upload, and then select the file
              to start the upload and validation process.
            </SectionIntro>
            <FileInput
              id='file-input-specific'
              name='file-input-specific'
              accept='.csv'
              aria-describedby='file-input-specific-hint'
              multiple
              onChange={onHandleSelectFile}
            />
            <Button
              appearance='primary'
              onClick={onHandleUpload}
              label='Upload'
              aria-label='Upload'
              size='default'
              type='button'
            />
            <div className='my-[1.875rem] w-full border-b-0 border-t border-solid border-[#A2A3A4]' />
          </FieldGroup>
        </FormMain>
      </div>
    </FormWrapper>
  );
}

export default { FileSubmission };
