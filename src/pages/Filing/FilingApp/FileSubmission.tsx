/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import useUploadMutation from 'utils/useUploadMutation';

import { Button } from 'components/Button';
import FieldGroup from 'components/FieldGroup';
import FieldGroupDivider from 'components/FieldGroupDivider';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import InlineStatus from 'components/InlineStatus';
import Input from 'components/Input';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import { Heading, Paragraph, TextIntroduction } from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetSubmissionLatest from 'utils/useGetSubmissionLatest';

import type { AxiosResponse } from 'axios';
import FormButtonGroup from 'components/FormButtonGroup';
import { LoadingContent } from 'components/Loading';
import { useError500 } from 'pages/Error/Error500';
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
import { getErrorsWarningsSummary } from './FilingErrors/FilingErrors.helpers';
import { FilingNavButtons } from './FilingNavButtons';
import { FilingSteps } from './FilingSteps';
import InstitutionHeading from './InstitutionHeading';

export function FileSubmission(): JSX.Element {
  const redirect500 = useError500();
  const abortController = new AbortController();
  const { lei, year } = useParams();
  const navigate = useNavigate();
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

  // NOTE: Prevents the Alert from showing unless an initial upload/validation has occurred
  const [uploadedBefore, setUploadedBefore] = useState<boolean>(false);

  const {
    isFetching: isFetchingGetSubmissionLatest,
    data: actualDataGetSubmissionLatest,
    error: errorGetSubmissionLatest,
    refetch: refetchGetSubmissionLatest,
  } = useGetSubmissionLatest({
    lei,
    filingPeriod: year,
    onSettledCallback: handleAfterGetSubmissionLatest,
    handleStartInterceptorCallback,
    signal: abortController.signal,
    enableLongPolling: true,
  });

  // TODO compare lei and filing period to getlastsubmission before updating object
  useEffect(() => {
    if (!isFetchingGetSubmissionLatest && !errorGetSubmissionLatest) {
      setInitialGetSubmissionLatestFetched(true);
      setDataGetSubmissionLatest(actualDataGetSubmissionLatest);
    }
  }, [
    actualDataGetSubmissionLatest,
    isFetchingGetSubmissionLatest,
    errorGetSubmissionLatest,
  ]);

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
  const buttonLabel = dataGetSubmissionLatest?.state
    ? 'Upload new file'
    : 'Upload file';
  const inputAriaLabel = dataGetSubmissionLatest?.state
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

  /* 
    Derived data
  */

  const formattedData = useMemo(
    () => getErrorsWarningsSummary(dataGetSubmissionLatest),
    [dataGetSubmissionLatest],
  );

  const {
    logicWarningsMulti,
    logicWarningsSingle,
    syntaxErrorsSingle,
    logicErrorsSingle,
    logicErrorsMulti,
    registerErrors,
  } = formattedData;

  const hasWarnings = [logicWarningsMulti, logicWarningsSingle].some(
    array => array.length > 0,
  );

  const hasErrors = [
    syntaxErrorsSingle,
    logicErrorsSingle,
    logicErrorsMulti,
    registerErrors,
  ].some(array => array.length > 0);

  // // Redirect checks
  useEffect(() => {
    // Only execute redirection logic after initial component mount
    if (!initialGetSubmissionLatestFetched && errorGetSubmissionLatest) {
      redirect500({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        code: errorGetSubmissionLatest.response?.status || '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: errorGetSubmissionLatest.response?.statusText || '',
      });
    }
  }, [
    initialGetSubmissionLatestFetched,
    errorGetSubmissionLatest,
    redirect500,
  ]);
  const onNextClick = (): void => navigate(`/filing/${year}/${lei}/errors`);
  const onPreviousClick = (): void => navigate(`/filing`);

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
            subheading='To get started, select a file to upload. Next, our system will perform validation checks on your register to ensure that data entries are correct and ready to submit. You will be able to review the results of the validation checks in the steps that follow.'
            description={
              <Paragraph>
                Your small business lending application register (register) must
                be submitted in a comma-separated values (CSV) file format and
                must not exceed 2GB in size. For detailed filing specifications
                reference the{' '}
                <Link href={filingInstructionsPage}>
                  Filing instructions guide for small business lending data
                </Link>
                .
              </Paragraph>
            }
          />
        </FormHeaderWrapper>
        {/* initialGetSubmissionLatestFetched use for the initial query to see if there was a previous upload during a previous user's session */}
        {initialGetSubmissionLatestFetched ? null : <LoadingContent />}
        {/* Display Upload Section -- only if initial getSubmissionLatest succeeds */}
        {initialGetSubmissionLatestFetched ? (
          <>
            <FormMain className='!mb-0'>
              {!isFetchingGetSubmissionLatest && !isLoadingUpload && (
                <FileSubmissionAlert
                  {...{
                    errorUpload,
                    errorGetSubmissionLatest,
                    dataGetSubmissionLatest,
                    uploadedBefore,
                  }}
                />
              )}
              <FieldGroup>
                <SectionIntro
                  className='!mb-[0.9375rem]'
                  heading='Select a file to upload'
                >
                  {dataGetSubmissionLatest?.state ? (
                    <>
                      Click &quot;Upload new file&quot; to select a new file to
                      upload. The new file will replace your current upload,
                      undergo the same validation checks, and reset your
                      progress.
                    </>
                  ) : (
                    <>
                      To get started, click &quot;Upload your file,&quot;
                      navigate to the file on your computer that you wish to
                      upload, and select the file to start the upload and
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
                            value: 'text-grayDark',
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
                            value: 'File upload in progress',
                          },
                          {
                            condition:
                              errorUpload &&
                              errorUpload.message ===
                                FILE_SIZE_LIMIT_ERROR_MESSAGE,
                            // TODO: Decide on error message
                            // value: FILE_SIZE_LIMIT_ERROR_MESSAGE,
                            value: 'File upload failed',
                          },
                          {
                            condition:
                              errorUpload ||
                              dataGetSubmissionLatest?.state ===
                                FileSubmissionState.UPLOAD_FAILED,
                            value: 'File upload failed',
                          },
                          {
                            condition: dataUpload || dataGetSubmissionLatest,
                            value: 'File upload successful',
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
                              (dataGetSubmissionLatest?.state &&
                                [
                                  FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED,
                                  FileSubmissionState.UPLOAD_FAILED,
                                ].includes(dataGetSubmissionLatest.state)),
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
                            condition:
                              dataGetSubmissionLatest &&
                              (hasErrors || hasWarnings),
                            value: 'warning',
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
                            value: 'text-grayDark',
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
                            condition:
                              dataGetSubmissionLatest &&
                              !hasErrors &&
                              !hasWarnings,
                            value: 'text-successColor',
                          },
                          {
                            condition:
                              dataGetSubmissionLatest &&
                              (hasErrors || hasWarnings),
                            value: 'text-warningColor',
                          },
                          { condition: true, value: 'text-[#0072CE]' }, // Default condition
                        ]}
                        messagePriorityPipe={[
                          {
                            condition: isFetchingGetSubmissionLatest,
                            value: 'Validation checks in progress',
                          },
                          {
                            condition:
                              errorUpload ||
                              dataGetSubmissionLatest?.state ===
                                FileSubmissionState.UPLOAD_FAILED ||
                              isLoadingUpload,
                            value: 'Validation checks not started',
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
                            value: 'Unable to perform validation checks',
                          },
                          // validation scenarios
                          {
                            condition: dataGetSubmissionLatest && hasErrors,
                            value: 'Errors were found in your file',
                          },
                          {
                            condition: dataGetSubmissionLatest && hasWarnings,
                            value: 'Warnings were found in your file',
                          },
                          {
                            condition:
                              dataGetSubmissionLatest &&
                              !hasErrors &&
                              !hasWarnings,
                            value:
                              'No errors or warnings were found in your file',
                          },
                          {
                            condition: true,
                            value: 'Validation checks not started',
                          }, // Default condition
                        ]}
                      />
                      {currentSuccess &&
                      !isLoadingUpload &&
                      !isFetchingGetSubmissionLatest ? (
                        <FileDetailsValidation
                          {...{
                            dataGetSubmissionLatest,
                            errorGetSubmissionLatest,
                            hasWarnings,
                          }}
                        />
                      ) : null}
                    </div>
                  </>
                ) : null}
              </FieldGroup>
            </FormMain>
            <FormButtonGroup>
              <FilingNavButtons
                classNameButtonContainer='u-mb0'
                onNextClick={onNextClick}
                isNextDisabled={!!disableButtonCriteria}
                onPreviousClick={onPreviousClick}
              />
            </FormButtonGroup>
          </>
        ) : null}
      </FormWrapper>
    </div>
  );
}

export default FileSubmission;
