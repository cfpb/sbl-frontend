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
import FileDetailsUpload from './FileDetailsUpload';
import FileDetailsValidation from './FileDetailsValidation';
import { FileSubmissionState } from './FileSubmission.data';
import FileSubmissionAlert from './FileSubmissionAlert';
import type { InstitutionDataType } from './InstitutionCard.types';
import InstitutionHeading from './InstitutionHeading';

export function FileSubmission(): JSX.Element {
  const abortController = new AbortController();
  const { lei, year } = useParams();
  const location = useLocation();
  const { state, pathname } = location as {
    state: InstitutionDataType;
    pathname: Location['pathname'];
  };

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
    abortController.signal,
    lei,
    year,
    handleAfterGetSubmissionLatest,
    handleStartInterceptorCallback,
  );

  // TODO compare lei and filing period to getlastsubmission before updating object
  useEffect(() => {
    if (actualDataGetSubmissionLatest) {
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
      resetUpload();
      mutateUpload({ file: event.target.files[0] });
    }

    // NOTE: Workaround to allow uploading the same named file twice in a row
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.value = '';
  };

  const fileInputReference = useRef<HTMLInputElement>(null);
  const onHandleUploadClick = (): void => {
    if (fileInputReference.current?.click) {
      fileInputReference.current.click();
    }
  };

  // Derived Conditions
  const hasUploadedBefore = dataGetSubmissionLatest?.state;
  const buttonLabel = hasUploadedBefore
    ? 'Replace your file'
    : 'Upload your file';
  const inputAriaLabel = hasUploadedBefore
    ? 'Replace your previously uploaded .csv file'
    : 'Select a .csv file to upload';
  const currentSuccess = dataGetSubmissionLatest?.state && !errorUpload;
  const disableButtonCriteria =
    isLoadingUpload ||
    isFetchingGetSubmissionLatest ||
    !currentSuccess ||
    dataGetSubmissionLatest.state ===
      FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED;

  /*  Cancels pending GetSubmissionLatest retry on unmount */
  useEffect(() => {
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
              {...{
                errorUpload,
                errorGetSubmissionLatest,
                dataGetSubmissionLatest,
                uploadedBefore,
              }}
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
                  // Relies on Button for visibility
                  className='invisible absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed'
                  id='file-input-specific'
                  name='file-input-specific'
                  aria-hidden='true' // Hidden from screenreaders
                  accept='.csv'
                  onChange={onHandleSelectFile}
                  disabled={isLoadingUpload || isFetchingGetSubmissionLatest}
                />
                <Button
                  appearance='primary'
                  onClick={onHandleUploadClick}
                  label={buttonLabel}
                  aria-label={inputAriaLabel}
                  size='default'
                  type='button'
                  className={
                    hasUploadedBefore
                      ? 'cursor-pointer border-[1px] border-solid border-stepIndicatorCurrent bg-white text-stepIndicatorCurrent hover:border-[#0050B4] hover:bg-white hover:text-[#0050B4] focus:bg-transparent disabled:cursor-not-allowed disabled:border-none'
                      : 'cursor-pointer disabled:cursor-not-allowed'
                  }
                  disabled={isLoadingUpload || isFetchingGetSubmissionLatest}
                />
              </div>
              {isLoadingUpload ||
              dataUpload ||
              errorUpload ||
              dataGetSubmissionLatest ? (
                <>
                  <FieldGroupDivider />
                  {/* Upload Status Section */}
                  <Heading type='3'>Status</Heading>
                  {/* Upload Status Section - Statuses */}
                  <div className='flex flex-col gap-2'>
                    {/* TODO: Clean-up ternary hells */}
                    <InlineStatus
                      statusOptions={[
                        { condition: isLoadingUpload, value: 'updating' },
                        { condition: errorUpload, value: 'error' },
                        {
                          condition: dataUpload || dataGetSubmissionLatest,
                          value: 'approved',
                        },
                        { condition: true, value: '' }, // Default condition
                      ]}
                      classNameOptions={[
                        {
                          condition: isLoadingUpload,
                          value: 'text-inProgressUploadValidation',
                        },
                        { condition: errorUpload, value: 'text-errorColor' },
                        {
                          condition: dataUpload || dataGetSubmissionLatest,
                          value: 'text-successColor',
                        },
                        { condition: true, value: 'text-[#0072CE]' }, // Default condition
                      ]}
                      messageOptions={[
                        {
                          condition: isLoadingUpload,
                          value: 'Upload in progress',
                        },
                        { condition: errorUpload, value: 'Upload failed' },
                        {
                          condition: dataUpload || dataGetSubmissionLatest,
                          value: 'Upload complete',
                        },
                        { condition: true, value: '' }, // Default condition
                      ]}
                    />
                    {currentSuccess && !isLoadingUpload ? (
                      <FileDetailsUpload
                        {...{
                          dataGetSubmissionLatest,
                        }}
                      />
                    ) : null}
                    <InlineStatus
                      statusOptions={[
                        { condition: isLoadingUpload, value: '' },
                        { condition: errorUpload, value: 'error' },
                        {
                          condition: isFetchingGetSubmissionLatest,
                          value: 'updating',
                        },
                        {
                          condition:
                            errorGetSubmissionLatest ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.VALIDATION_ERROR,
                          value: 'error',
                        },
                        {
                          condition: dataGetSubmissionLatest,
                          value: 'approved',
                        },
                        { condition: true, value: '' }, // Default condition
                      ]}
                      classNameOptions={[
                        {
                          condition:
                            isFetchingGetSubmissionLatest || isLoadingUpload,
                          value: 'text-inProgressUploadValidation',
                        },
                        {
                          condition:
                            errorUpload ||
                            errorGetSubmissionLatest ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.VALIDATION_ERROR,
                          value: 'text-errorColor',
                        },
                        {
                          condition: dataGetSubmissionLatest,
                          value: 'text-successColor',
                        },
                        { condition: true, value: 'text-[#0072CE]' }, // Default condition
                      ]}
                      messageOptions={[
                        {
                          condition: isFetchingGetSubmissionLatest,
                          value: 'Validation in progress',
                        },
                        {
                          condition: errorUpload || isLoadingUpload,
                          value: 'Validation not started',
                        },
                        {
                          condition:
                            errorGetSubmissionLatest ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.VALIDATION_ERROR,
                          value: 'Validation failed',
                        },
                        {
                          condition: dataGetSubmissionLatest,
                          value: 'Validation complete',
                        },
                        { condition: true, value: 'Validation not started' }, // Default condition
                      ]}
                    />
                    {currentSuccess &&
                    !isLoadingUpload &&
                    !isFetchingGetSubmissionLatest ? (
                      <FileDetailsValidation
                        {...{
                          dataGetSubmissionLatest,
                          errorGetSubmissionLatest,
                        }}
                      />
                    ) : null}
                  </div>
                </>
              ) : null}
            </FieldGroup>
            <Button
              className='mt-[1.875rem]'
              appearance='primary'
              iconRight='right'
              label='Save and continue'
              // TODO: route to next step
              onClick={() => console.log('Save and continue -- clicked!')}
              size='default'
              disabled={disableButtonCriteria}
            />
          </FormMain>
        ) : null}
      </FormWrapper>
    </div>
  );
}

export default FileSubmission;
