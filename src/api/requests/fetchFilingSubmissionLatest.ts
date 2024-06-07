import { getAxiosInstance, request } from 'api/axiosService';
import { FILING_URL, VALIDATION_TIMEOUT_SECONDS } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { DateTime } from 'luxon';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import { FileSubmissionState } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import type { AxiosInstanceExtended } from 'types/requestsTypes';
import {
  INTERMEDIATE_TIMEOUT,
  MAX_RETRY_DELAY,
  One,
  STANDARD_TIMEOUT,
  Two,
  Zero,
} from 'utils/constants';

const MAX_RETRIES = Number.POSITIVE_INFINITY;

// Exponential Backoff Calculation
function getRetryDelayBackoff(retry = Two): number {
  return Two ** retry * STANDARD_TIMEOUT;
}

// Retry Delay
function getRetryDelay(retry = Zero): number {
  const retryDelayBackoff = getRetryDelayBackoff(retry);
  return Math.min(
    retry > One && retryDelayBackoff > INTERMEDIATE_TIMEOUT
      ? retryDelayBackoff
      : INTERMEDIATE_TIMEOUT,
    MAX_RETRY_DELAY, // 15 seconds
  );
}

const apiClient: AxiosInstanceExtended = getAxiosInstance(FILING_URL);

export function getMaxRetriesAxiosError(response: AxiosResponse): AxiosError {
  // Order of parameters: 'message', 'code', 'config', 'request', 'response'
  return new AxiosError(
    'You have reached the maximum amount of retries',
    '429',
    response.config,
    response.request,
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: response.data as SubmissionResponse,
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      status: 429,
      statusText: 'Too Many Requests',
      headers: response.headers,
      config: response.config,
    },
  );
}

async function retryRequestWithDelay(
  axiosInstance: AxiosInstanceExtended,
  response: AxiosResponse<SubmissionResponse>,
): Promise<AxiosResponse<SubmissionResponse>> {
  if (!axiosInstance.defaults.retryCount) {
    // eslint-disable-next-line no-param-reassign
    axiosInstance.defaults.retryCount = Zero;
  }

  if (axiosInstance.defaults.retryCount >= MAX_RETRIES) {
    throw getMaxRetriesAxiosError(response);
  }

  // eslint-disable-next-line no-param-reassign
  axiosInstance.defaults.retryCount += One;

  return new Promise(resolve => {
    // NOTE: Set to one second for AWS load testing, will revert before mvp
    // https://github.com/cfpb/sbl-frontend/issues/497
    // setTimeout(
    //   () => resolve(axiosInstance(response.config)),
    //   getRetryDelay(axiosInstance.defaults.retryCount),
    // );
    setTimeout(() => resolve(axiosInstance(response.config)), STANDARD_TIMEOUT);
  });
}

/** Used in `useGetSubmissionLatest` to long poll for validation after an upload * */
function shouldRetry(response: AxiosResponse<SubmissionResponse>): boolean {
  // Check if the response has a 'state' property equal to "VALIDATION_IN_PROGRESS" or "SUBMISSION_UPLOADED"
  return Boolean(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    response?.data?.state &&
      [
        FileSubmissionState.VALIDATION_IN_PROGRESS,
        FileSubmissionState.SUBMISSION_UPLOADED,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ].includes(response?.data?.state),
  );
}

// Used in determining VALIDATION_EXPIRED
function determineTimeLimitExceeded(
  response: AxiosResponse<SubmissionResponse>,
  lastUploadTime: string,
): boolean {
  const currentTime = DateTime.utc();
  const lastUploadTimeFormatted = DateTime.fromISO(lastUploadTime, {
    zone: 'utc',
  });
  const diffTime = currentTime.diff(lastUploadTimeFormatted);
  // How much time has passed in terms of seconds
  const diffTimeSeconds = diffTime.as('seconds');
  if (import.meta.env.DEV) {
    console.log('Time passed (seconds) since the upload:', diffTimeSeconds);
  }

  return (
    response.data.state === FileSubmissionState.VALIDATION_IN_PROGRESS &&
    diffTimeSeconds > VALIDATION_TIMEOUT_SECONDS
  );
}

function getValidationExpiredResponse(
  response: AxiosResponse<SubmissionResponse>,
): AxiosResponse<SubmissionResponse> {
  const validationExpiredResponse = { ...response };
  validationExpiredResponse.data.state = FileSubmissionState.VALIDATION_EXPIRED;
  return validationExpiredResponse;
}

// NOTE: Declare interceptor can be flushed to prevent memory leak
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const interceptor = apiClient.interceptors.response.use(
  async (response: AxiosResponse<SubmissionResponse>) => {
    if (apiClient.defaults.handleStartInterceptorCallback) {
      // Update UI with in-progress status (may or may not have validation_in_progress)
      apiClient.defaults.handleStartInterceptorCallback(response);
    }

    // Stop long polling if the time difference between the last upload time and current time has exceeded the time limit
    if (
      apiClient.defaults.lastUploadTime &&
      determineTimeLimitExceeded(
        response,
        apiClient.defaults.lastUploadTime as string,
      )
    ) {
      // Implement returning a response with VALIDATION_EXPIRED
      return getValidationExpiredResponse(response);
    }

    // Retry if validation still in-progress
    if (apiClient.defaults.enableLongPolling && shouldRetry(response)) {
      return retryRequestWithDelay(apiClient, response);
    }
    apiClient.defaults.retryCount = Zero;
    return response;
  },
  async (error: AxiosError) => {
    apiClient.defaults.retryCount = Zero;
    throw error;
  },
);

interface FetchFilingSubmissionLatestProperties {
  auth: SblAuthProperties;
  lei: InstitutionDetailsApiType['lei'];
  filingPeriod: FilingPeriodType;
  lastUploadTime?: Date | string;
  handleStartInterceptorCallback?: (
    response: AxiosResponse<SubmissionResponse>,
  ) => void;
  signal?: AbortSignal;
  enableLongPolling?: boolean;
}

export const fetchFilingSubmissionLatest = async ({
  auth,
  lei,
  filingPeriod,
  lastUploadTime,
  handleStartInterceptorCallback,
  signal,
  enableLongPolling,
}: FetchFilingSubmissionLatestProperties): Promise<SubmissionResponse> => {
  if (lastUploadTime) {
    apiClient.defaults.lastUploadTime = lastUploadTime;
  }

  if (enableLongPolling) {
    apiClient.defaults.enableLongPolling = enableLongPolling;
  }

  if (handleStartInterceptorCallback) {
    apiClient.defaults.handleStartInterceptorCallback =
      handleStartInterceptorCallback;
  }

  return request<undefined, SubmissionResponse>({
    axiosInstance: apiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/latest`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
    options: {
      signal,
    },
  });
};

export default fetchFilingSubmissionLatest;
