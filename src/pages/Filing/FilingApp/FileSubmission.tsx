import useUploadMutation from 'utils/useUploadMutation';

import FieldGroup from 'components/FieldGroup';
import FieldGroupDivider from 'components/FieldGroupDivider';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import InlineStatus from 'components/InlineStatus';
import Input from 'components/Input';
import { Link } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import SectionIntro from 'components/SectionIntro';
import StepIndicator, { mockSteps } from 'components/StepIndicator';
import { Button, Heading, TextIntroduction } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';

import { filingInstructionsPage } from 'utils/common';
import {
  fileSubmissionState,
  fileSubmissionStateAlert,
} from './FileSubmission.data';
import type { InstitutionDataType } from './InstitutionCard.types';
import InstitutionHeading from './InstitutionHeading';

export function FileSubmission(): JSX.Element {
  const [validationError, setValidationError] = useState<boolean>(false);
  const [validationSuccess, setValidationSuccess] = useState<boolean>(false);
  const [enableSaveContinue, setEnableSaveContinue] = useState<boolean>(false);

  const resetStates = (): void => {
    setValidationError(false);
    setValidationSuccess(false);
    setEnableSaveContinue(false);
  };

  const { lei, year } = useParams();
  const {
    state: { name },
  } = useLocation() as { state: InstitutionDataType };
  const {
    isLoading: isLoadingGetSubmissionLatest,
    isFetching: isFetchingGetSubmissionLatest,
    data: dataGetSubmissionLatest,
    error: errorGetSubmissionLatest,
    refetch: refetchGetSubmissionLatest,
    failureReason, // reason for retry
  } = useGetSubmissionLatest(lei, year);

  window.refetchGetSubmissionLatest = refetchGetSubmissionLatest;

  console.log('!!failureReason', failureReason);

  async function handleAfterUpload(): Promise<void> {
    const refetchGetSubmissionLatestResponse =
      await refetchGetSubmissionLatest();
    console.log(
      'refetchGetSubmissionLatestResponse',
      refetchGetSubmissionLatestResponse,
    );
    // TODO: Add functionality based on validation response -- success/fail
    console.log(
      'refetchGetSubmissionLatestResponse',
      refetchGetSubmissionLatestResponse,
    );
    if (
      refetchGetSubmissionLatestResponse.data?.state ===
      'VALIDATION_WITH_ERRORS'
    ) {
      setValidationError(true);
    }

    if (
      refetchGetSubmissionLatestResponse.data?.state ===
      'VALIDATION_WITH_WARNINGS'
    ) {
      setValidationSuccess(true);
    }
  }

  const {
    mutate: mutateUpload,
    isLoading: isLoadingUpload,
    error: errorUpload,
    data: dataUpload,
    reset: resetUpload,
  } = useUploadMutation({
    lei,
    period_code: year,
    onSuccessCallback: handleAfterUpload,
  });
  // console.log('file submission lei year', lei, year);
  console.log('isLoadingUpload:', isLoadingUpload);
  // console.log('errorUpload:', errorUpload);
  // console.log('dataUpload:', dataUpload);

  console.log('isLoadingGetSubmissionLatest:', isLoadingGetSubmissionLatest);
  // console.log('dataGetSubmissionLatest:', dataGetSubmissionLatest);
  console.log('errorGetSubmissionLatest:', errorGetSubmissionLatest);

  const onHandleSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log('file event selected:', event);
    if (event.target.files && event.target.files.length > 0 && lei && year) {
      mutateUpload({ file: event.target.files[0] });
    }
  };

  const fileInputReference = useRef<HTMLInputElement>(null);

  const onHandleUploadClick = (): void => {
    resetUpload();
    resetStates();
    if (fileInputReference.current?.click) {
      fileInputReference.current.click();
    }
  };

  // Derived Conditions
  const hasUploadedBefore = dataGetSubmissionLatest?.state;
  const buttonLabel = hasUploadedBefore ? 'Replace your file' : 'Upload';

  /* Incorrect parameters handling */
  // TODO: Redirect the user if the lei or filing period (year) is incorrect

  return (
    <div id='upload-csv'>
      <div className='mx-auto mb-[3.75rem] max-w-[75rem]'>
        <StepIndicator steps={mockSteps} />
      </div>
      <FormWrapper>
        <FormHeaderWrapper>
          <div className='mb-[0.9375rem]'>
            <InstitutionHeading name={name as string} filingPeriod={year} />
          </div>
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
        {/* Display Upload Section -- only if initial getSubmissionLatest succeeds */}
        {isLoadingGetSubmissionLatest ? null : (
          <FormMain>
            {fileSubmissionStateAlert[fileSubmissionState.Success]}
            {validationSuccess
              ? fileSubmissionStateAlert[fileSubmissionState.Success]
              : null}
            {validationError
              ? fileSubmissionStateAlert[fileSubmissionState.ErrorFormatting]
              : null}
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
                <Input
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
                  className={
                    hasUploadedBefore
                      ? 'border-[1px] border-solid border-stepIndicatorCurrent bg-white text-stepIndicatorCurrent'
                      : ''
                  }
                />
              </div>
              {(isLoadingUpload || dataUpload) ?? errorUpload ? (
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
                            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              errorUpload
                              ? 'error'
                              : ''
                      }
                      className={`${
                        isLoadingUpload
                          ? 'text-[#0072CE]'
                          : errorUpload
                            ? 'text-errorColor'
                            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              dataUpload
                              ? 'text-successColor'
                              : 'text-[#0072CE]'
                      }`}
                      message={
                        isLoadingUpload
                          ? 'Upload in progress'
                          : errorUpload
                            ? 'Upload failed'
                            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              dataUpload
                              ? 'Upload complete'
                              : ''
                      }
                    />
                    <InlineStatus
                      status={
                        isLoadingUpload || errorUpload
                          ? ''
                          : isFetchingGetSubmissionLatest
                            ? 'updating'
                            : errorGetSubmissionLatest
                              ? 'error'
                              : dataGetSubmissionLatest
                                ? 'approved'
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
                      message={
                        isFetchingGetSubmissionLatest
                          ? 'Validation in progress'
                          : errorGetSubmissionLatest
                            ? 'Validation failed'
                            : errorUpload
                              ? 'Validation not started'
                              : dataGetSubmissionLatest && !isLoadingUpload
                                ? 'Validation complete'
                                : 'Validation not started'
                      }
                    />
                  </div>
                </>
              ) : null}
            </FieldGroup>

            <Button
              className='mt-[1.875rem]'
              appearance='primary'
              iconRight='right'
              label='Save and continue'
              onClick={() => console.log('Save and continue -- clicked!')}
              size='default'
              disabled={!enableSaveContinue}
            />
          </FormMain>
        )}
      </FormWrapper>
    </div>
  );
}

export default FileSubmission;
