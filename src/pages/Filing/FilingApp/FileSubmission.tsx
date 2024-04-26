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
import { Button, Heading, TextIntroduction } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';

import type { AxiosResponse } from 'axios';
import { LoadingContent } from 'components/Loading';
import type { SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import { filingInstructionsPage } from 'utils/common';
import {
  FILE_SIZE_LIMIT_2GB,
  FILE_SIZE_LIMIT_ERROR_MESSAGE,
} from 'utils/constants';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import FileDetailsUpload from './FileDetailsUpload';
import FileDetailsValidation from './FileDetailsValidation';
import FileSubmissionAlert from './FileSubmissionAlert';
import { FilingNavButtons } from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';
import InstitutionHeading from './InstitutionHeading';

export function FileSubmission(): JSX.Element {
  const abortController = new AbortController();
  const { lei, year } = useParams();
  const location = useLocation();
  const { pathname } = location as {
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
    lei,
    year,
    handleAfterGetSubmissionLatest,
    handleStartInterceptorCallback,
    abortController.signal,
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
    // NOTE: isLoading will be `isPending` in Tanstack React-Query V5
    // https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
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
    // NOTE: Test the user's selected file to both have data and be under the max size limit
    const fileSizeTest = Boolean(
      event.target.files?.[0] &&
        // NOTE: Change to FILE_SIZE_LIMIT_2GB to FILE_SIZE_LIMIT_2MB to test 2MB instead of 2GB
        (event.target.files[0].size > FILE_SIZE_LIMIT_2GB ||
          event.target.files[0].size === 0),
    );

    if (event.target.files && event.target.files.length > 0 && lei && year) {
      mutateUpload({ file: event.target.files[0], fileSizeTest });
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
    errorGetSubmissionLatest ||
    isLoadingUpload ||
    isFetchingGetSubmissionLatest ||
    !currentSuccess ||
    (dataGetSubmissionLatest.state &&
      [
        FileSubmissionState.UPLOAD_FAILED,
        FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED,
        FileSubmissionState.VALIDATION_ERROR,
        FileSubmissionState.VALIDATION_EXPIRED,
      ].includes(dataGetSubmissionLatest.state));

  const {
    data: institution,
    isLoading: isLoadingInstitution,
    isError: isErrorInstitution,
  } = useInstitutionDetails(lei);

  const institutionName = isLoadingInstitution
    ? 'Loading...'
    : isErrorInstitution
      ? ''
      : institution.name;

  /*  Cancels pending GetSubmissionLatest retry on unmount */
  useEffect(() => {
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div id='file-submission' className='min-h-[80vh]'>
      <FilingSteps />
      <FormWrapper>
        <FormHeaderWrapper>
          <div className='mb-[0.9375rem]'>
            <InstitutionHeading
              eyebrow
              name={institutionName}
              filingPeriod={year}
            />
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
                  // Relies on the Button for functionality
                  className='invisible absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed'
                  id='file-input-upload'
                  name='file-input-upload'
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
              {/* File Details section */}
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
                    <InlineStatus
                      statusPriorityPipe={[
                        { condition: isLoadingUpload, value: 'updating' },
                        {
                          condition:
                            errorUpload ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.UPLOAD_FAILED,
                          value: 'error',
                        },
                        {
                          condition: dataUpload || dataGetSubmissionLatest,
                          value: 'approved',
                        },
                        { condition: true, value: '' }, // Default condition
                      ]}
                      classNamePriorityPipe={[
                        {
                          condition: isLoadingUpload,
                          value: 'text-inProgressUploadValidation',
                        },
                        {
                          condition:
                            errorUpload ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.UPLOAD_FAILED,
                          value: 'text-errorColor',
                        },
                        {
                          condition: dataUpload || dataGetSubmissionLatest,
                          value: 'text-successColor',
                        },
                        { condition: true, value: 'text-[#0072CE]' }, // Default condition
                      ]}
                      messagePriorityPipe={[
                        {
                          condition: isLoadingUpload,
                          value: 'Upload in progress',
                        },
                        {
                          condition:
                            errorUpload &&
                            errorUpload.message ===
                              FILE_SIZE_LIMIT_ERROR_MESSAGE,
                          // TODO: Decide on error message
                          // value: FILE_SIZE_LIMIT_ERROR_MESSAGE,
                          value: 'Upload failed',
                        },
                        {
                          condition:
                            errorUpload ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.UPLOAD_FAILED,
                          value: 'Upload failed',
                        },
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
                      statusPriorityPipe={[
                        { condition: isLoadingUpload, value: '' }, // Empty Icon
                        {
                          condition:
                            errorUpload ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.UPLOAD_FAILED,
                          value: 'error',
                        },
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
                      classNamePriorityPipe={[
                        {
                          condition:
                            isFetchingGetSubmissionLatest || isLoadingUpload,
                          value: 'text-inProgressUploadValidation',
                        },
                        {
                          condition:
                            errorUpload ||
                            errorGetSubmissionLatest ||
                            (dataGetSubmissionLatest?.state &&
                              [
                                FileSubmissionState.UPLOAD_FAILED,
                                FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED,
                                FileSubmissionState.VALIDATION_ERROR,
                                FileSubmissionState.VALIDATION_EXPIRED,
                              ].includes(dataGetSubmissionLatest.state)),
                          value: 'text-errorColor',
                        },
                        {
                          condition: dataGetSubmissionLatest,
                          value: 'text-successColor',
                        },
                        { condition: true, value: 'text-[#0072CE]' }, // Default condition
                      ]}
                      messagePriorityPipe={[
                        {
                          condition: isFetchingGetSubmissionLatest,
                          value: 'Validation in progress',
                        },
                        {
                          condition:
                            errorUpload ||
                            dataGetSubmissionLatest?.state ===
                              FileSubmissionState.UPLOAD_FAILED ||
                            isLoadingUpload,
                          value: 'Validation not started',
                        },
                        {
                          condition:
                            errorGetSubmissionLatest ||
                            (dataGetSubmissionLatest?.state &&
                              [
                                FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED,
                                FileSubmissionState.VALIDATION_ERROR,
                                FileSubmissionState.VALIDATION_EXPIRED,
                              ].includes(dataGetSubmissionLatest.state)),
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
          </FormMain>
        ) : null}
        <FilingNavButtons
          hrefNext={`/filing/${year}/${lei}/errors`}
          labelNext='Save and continue'
          hrefPrevious='/filing'
          labelPrevious='Return to Filing Overview'
          isStepComplete={!disableButtonCriteria}
        />
      </FormWrapper>
    </div>
  );
}

export default FileSubmission;
