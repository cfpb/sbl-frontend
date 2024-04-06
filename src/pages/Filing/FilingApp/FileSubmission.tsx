/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import useUploadMutation from 'utils/useUploadMutation';

import FieldGroup from 'components/FieldGroup';
import FieldGroupDivider from 'components/FieldGroupDivider';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import InlineStatus from 'components/InlineStatus';
import Input from 'components/Input';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import StepIndicator, { mockSteps } from 'components/StepIndicator';
import { Button, Heading, TextIntroduction } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';

import type { AxiosResponse } from 'axios';
import { LoadingContent } from 'components/Loading';
import type { SubmissionResponse } from 'types/filingTypes';
import { filingInstructionsPage } from 'utils/common';
import FileDetails from './FileDetails';
import { fileSubmissionState } from './FileSubmission.data';
import FileSubmissionAlert from './FileSubmissionAlert';
import type { InstitutionDataType } from './InstitutionCard.types';
import InstitutionHeading from './InstitutionHeading';

export function FileSubmission(): JSX.Element {
  const { lei, year } = useParams();
  const { state } = useLocation() as { state: InstitutionDataType };

  const [dataGetSubmissionLatest, setDataGetSubmissionLatest] = useState<
    SubmissionResponse | undefined
  >();

  const [
    initialGetSubmissionLatestFetched,
    setInitialGetSubmissionLatestFetched,
  ] = useState<boolean>(false);

  function handleAfterGetSubmissionLatest(): void {
    setInitialGetSubmissionLatestFetched(true);
  }

  function handleStartInterceptorCallback(
    response: AxiosResponse<SubmissionResponse>,
  ): void {
    setInitialGetSubmissionLatestFetched(true);
    setDataGetSubmissionLatest(response.data);
  }

  // prevents the Alert from showing unless an initial upload/validation has occurred
  const [uploadedBefore, setUploadedBefore] = useState<boolean>(false);

  const {
    isFetching: isFetchingGetSubmissionLatest,
    data: actualDataGetSubmissionLatest,
    error: errorGetSubmissionLatest,
    refetch: refetchGetSubmissionLatest,
  } = useGetSubmissionLatest(
    lei,
    year,
    handleAfterGetSubmissionLatest,
    handleStartInterceptorCallback,
  );

  // const ensureValidatedResponse = (
  //   lei,
  //   year,
  //   actualDataGetSubmissionLatest,
  // ) => {
  //   console.log('lei', lei);
  //   console.log('year', year);
  //   console.log('actualDataGetSubmissionLatest', actualDataGetSubmissionLatest);

  //   return true;
  // };

  // TODO compare lei and fiscal year to getlastsubmission before updating object
  useEffect(() => {
    if (
      actualDataGetSubmissionLatest
      // ensureValidatedResponse(lei, year, actualDataGetSubmissionLatest)
    ) {
      setDataGetSubmissionLatest(actualDataGetSubmissionLatest);
    }
  }, [actualDataGetSubmissionLatest]);

  async function handleAfterUpload(data: SubmissionResponse): Promise<void> {
    setUploadedBefore(true);
    setDataGetSubmissionLatest(data);
    await refetchGetSubmissionLatest();
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
  const onHandleSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0 && lei && year) {
      mutateUpload({ file: event.target.files[0] });
    }
  };

  const fileInputReference = useRef<HTMLInputElement>(null);
  const onHandleUploadClick = (): void => {
    resetUpload();
    if (fileInputReference.current?.click) {
      fileInputReference.current.click();
    }
  };

  // Derived Conditions
  const hasUploadedBefore = dataGetSubmissionLatest?.state;
  const buttonLabel = hasUploadedBefore ? 'Replace your file' : 'Upload';
  const currentSuccess =
    dataGetSubmissionLatest?.state ===
      fileSubmissionState.VALIDATION_WITH_WARNINGS ||
    dataGetSubmissionLatest?.state ===
      fileSubmissionState.VALIDATION_WITH_ERRORS;

  /* Incorrect parameters handling  - User must click on 'Upload' link otherwise redirect to /filing */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!state?.name) {
    return <Navigate replace to='/filing' />;
  }

  return (
    <div id='file-submission' className='min-h-[80vh]'>
      <div className='mx-auto mb-[3.75rem] max-w-[75rem]'>
        <StepIndicator steps={mockSteps} />
      </div>
      <FormWrapper>
        <FormHeaderWrapper>
          <div className='mb-[0.9375rem]'>
            <InstitutionHeading eyebrow name={state.name} filingPeriod={year} />
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
        {/* initialGetSubmissionLatestFetched use for the initial query to see if there was a previous upload during a previous user's session */}
        {initialGetSubmissionLatestFetched ? null : <LoadingContent />}
        {/* Display Upload Section -- only if initial getSubmissionLatest succeeds */}
        {initialGetSubmissionLatestFetched ? (
          <FormMain>
            <FileSubmissionAlert
              errorUpload={errorUpload}
              errorGetSubmissionLatest={errorGetSubmissionLatest}
              dataGetSubmissionLatest={dataGetSubmissionLatest}
              uploadedBefore={uploadedBefore}
            />
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
                  title={buttonLabel}
                  className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                  id='file-input-specific'
                  name='file-input-specific'
                  accept='.csv'
                  aria-describedby='file-input-specific-hint'
                  multiple
                  onChange={onHandleSelectFile}
                  disabled={isLoadingUpload || isFetchingGetSubmissionLatest}
                />
                <Button
                  appearance='primary'
                  onClick={onHandleUploadClick}
                  label={buttonLabel}
                  title={buttonLabel}
                  aria-label={buttonLabel}
                  size='default'
                  type='button'
                  className={
                    hasUploadedBefore
                      ? 'border-[1px] border-solid border-stepIndicatorCurrent bg-white text-stepIndicatorCurrent focus:bg-transparent disabled:border-none'
                      : ''
                  }
                  disabled={isLoadingUpload || isFetchingGetSubmissionLatest}
                />
              </div>
              {isLoadingUpload ||
              dataUpload ||
              errorUpload ||
              dataGetSubmissionLatest ? (
                <FieldGroupDivider />
              ) : null}
              {isLoadingUpload ||
              dataUpload ||
              errorUpload ||
              dataGetSubmissionLatest ? (
                <>
                  {/* Upload Status Section */}
                  <Heading type='3'>Upload status</Heading>
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
                              : dataGetSubmissionLatest
                                ? 'approved'
                                : ''
                      }
                      className={`${
                        isLoadingUpload
                          ? 'text-inProgressUploadValidation'
                          : errorUpload
                            ? 'text-errorColor'
                            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              dataUpload || dataGetSubmissionLatest
                              ? 'text-successColor'
                              : 'text-[#0072CE]'
                      }`}
                      message={
                        isLoadingUpload
                          ? 'Upload in progress'
                          : errorUpload
                            ? 'Upload failed'
                            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              dataUpload || dataGetSubmissionLatest
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
                          ? 'text-inProgressUploadValidation'
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
              <FileDetails
                dataGetSubmissionLatest={dataGetSubmissionLatest}
                isFetchingGetSubmissionLatest={isFetchingGetSubmissionLatest}
              />
            </FieldGroup>

            <Button
              className='mt-[1.875rem]'
              appearance='primary'
              iconRight='right'
              label='Save and continue'
              // TODO: route to next step
              onClick={() => console.log('Save and continue -- clicked!')}
              size='default'
              disabled={!currentSuccess}
            />
          </FormMain>
        ) : null}
      </FormWrapper>
    </div>
  );
}

export default FileSubmission;
