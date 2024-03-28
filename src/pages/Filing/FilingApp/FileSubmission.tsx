import { useMutation } from '@tanstack/react-query';
import uploadCsvAxios from 'api/requests/uploadCsvAxios';
import useSblAuth from 'api/useSblAuth';
import FieldGroup from 'components/FieldGroup';
import FieldGroupDivider from 'components/FieldGroupDivider';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import StepIndicator, { mockSteps } from 'components/StepIndicator';
import { Button, TextIntroduction } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export function FileSubmission(): JSX.Element {
  const auth = useSblAuth();
  const { lei, year } = useParams();
  console.log('file submission lei year', lei, year);
  // const [uploadAttempted, setUploadAttempted] = useState<boolean>(false);
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

  const fileInputReference = useRef<HTMLInputElement>(null);

  const onHandleUploadClick = (): void => {
    if (fileInputReference.current) {
      fileInputReference.current.click();
    }
  };

  return (
    <FormWrapper>
      <div id='upload-csv'>
        <StepIndicator steps={mockSteps} />
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
            <div className='relative'>
              <input
                type='file'
                ref={fileInputReference}
                className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                id='file-input-specific'
                name='file-input-specific'
                accept='.csv'
                aria-describedby='file-input-specific-hint'
                multiple
                onChange={onHandleSelectFile}
              />
              <Button
                appearance='primary'
                // onClick={onHandleUpload}
                onClick={onHandleUploadClick}
                label='Upload'
                aria-label='Upload'
                size='default'
                type='button'
              />
            </div>

            <FieldGroupDivider />
          </FieldGroup>
        </FormMain>
      </div>
    </FormWrapper>
  );
}

export default { FileSubmission };
