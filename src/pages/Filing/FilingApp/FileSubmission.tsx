import useUploadMutation from 'utils/useUploadMutation';

import FieldGroup from 'components/FieldGroup';
import FieldGroupDivider from 'components/FieldGroupDivider';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import InlineStatus from 'components/InlineStatus';
import { Link } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import SectionIntro from 'components/SectionIntro';
import StepIndicator, { mockSteps } from 'components/StepIndicator';
import { Button, Heading, TextIntroduction } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';

import { filingInstructionsPage } from 'utils/common';

export function FileSubmission(): JSX.Element {
  const { lei, year } = useParams();
  const {
    isLoading: isLoadingGetSubmissionLatest,
    isFetching: isFetchingGetSubmissionLatest,
    data: dataGetSubmissionLatest,
    error: errorGetSubmissionLatest,
  } = useGetSubmissionLatest(lei, year);

  const {
    mutate: mutateUpload,
    isLoading: isLoadingUpload,
    error: errorUpload,
    data: dataUpload,
    reset: resetUpload,
  } = useUploadMutation(lei, year);
  // console.log('file submission lei year', lei, year);
  console.log('isLoadingUpload:', isLoadingUpload);
  // console.log('errorUpload:', errorUpload);
  // console.log('dataUpload:', dataUpload);

  console.log('isLoadingGetSubmissionLatest:', isLoadingGetSubmissionLatest);
  // console.log('dataGetSubmissionLatest:', dataGetSubmissionLatest);
  // console.log('errorGetSubmissionLatest:', errorGetSubmissionLatest);

  const onHandleSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log('file selected:', event.target.files);
    // setSelectedFile(e.target.files[0]);
    if (event.target.files && event.target.files.length > 0 && lei && year) {
      mutateUpload({ file: event.target.files[0] });
    }
  };

  const fileInputReference = useRef<HTMLInputElement>(null);

  const onHandleUploadClick = (): void => {
    resetUpload();
    if (fileInputReference.current) {
      fileInputReference.current.click();
    }
  };

  // Derived Conditions
  const hasUploadedBefore = dataGetSubmissionLatest?.state;
  const buttonLabel = hasUploadedBefore ? 'Replace your file' : 'Upload';

  return (
    <div id='upload-csv'>
      <FormWrapper>
        <StepIndicator steps={mockSteps} />
        <FormHeaderWrapper>
          <TextIntroduction
            heading='Upload file'
            subheading={`Our system performs error and warning validation checks on your data to ensure that data entries are correct and ready to submit. Each record must pass all error validations to continue with the filing process. Warning validations must be verified for accuracy. `}
            description={
              <>
                Your file must be submitted in a comma-separated values (CSV)
                file format and must not exceed 2GB in size. For detailed filing
                specifications reference the{' '}
                <Link href={filingInstructionsPage}>
                  Filing instructions guide for small business lending data
                </Link>
                .
              </>
            }
          />
        </FormHeaderWrapper>

        {isLoadingGetSubmissionLatest ? <LoadingContent /> : null}
        {isLoadingGetSubmissionLatest ? null : (
          <FormMain>
            <FieldGroup>
              <SectionIntro heading='Select a file to upload'>
                {hasUploadedBefore ? (
                  <>
                    To change your file selection, click on &quot;Replace your
                    file,&quot; navigate to the file on your computer that you
                    wish to upload, and then select the file to start the upload
                    and validation process. Uploading a new file will replace
                    your current upload and reset your progress.
                  </>
                ) : (
                  <>
                    To get started, click on &quot;Upload your file,&quot;
                    navigate to the file on your computer that you wish to
                    upload, and then select the file to start the upload and
                    validation process.
                  </>
                )}
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
                  onClick={onHandleUploadClick}
                  label={buttonLabel}
                  aria-label={buttonLabel}
                  size='default'
                  type='button'
                />
              </div>
              {isLoadingUpload || dataUpload || errorUpload ? (
                <>
                  <FieldGroupDivider />
                  {/* Upload Status Section */}
                  <Heading type='3'>Upload Status</Heading>
                  {/* Upload Status Section - Statuses */}
                  <div className='flex flex-col gap-2'>
                    <InlineStatus
                      status={
                        isLoadingUpload
                          ? 'updating'
                          : dataUpload
                            ? 'approved'
                            : errorUpload
                              ? 'error'
                              : ''
                      }
                      className={`${
                        isLoadingUpload
                          ? 'text-[#0072CE]'
                          : errorUpload
                            ? 'text-errorColor'
                            : dataUpload
                              ? 'text-successColor'
                              : 'text-[#0072CE]'
                      }`}
                      message={
                        isLoadingUpload
                          ? 'Upload in progress'
                          : errorUpload
                            ? 'Upload failed'
                            : dataUpload
                              ? 'Upload complete'
                              : ''
                      }
                    />
                    <InlineStatus
                      status={
                        isLoadingUpload
                          ? ''
                          : isFetchingGetSubmissionLatest
                            ? 'updating'
                            : dataGetSubmissionLatest
                              ? 'approved'
                              : errorGetSubmissionLatest
                                ? 'error'
                                : ''
                      }
                      className={
                        isFetchingGetSubmissionLatest
                          ? 'text-[#0072CE]'
                          : errorGetSubmissionLatest
                            ? 'text-errorColor'
                            : dataGetSubmissionLatest
                              ? 'text-successColor'
                              : 'text-[#0072CE]'
                      }
                      message='Validation Status'
                    />
                  </div>
                </>
              ) : null}
            </FieldGroup>
          </FormMain>
        )}
      </FormWrapper>
    </div>
  );
}

export default FileSubmission;
