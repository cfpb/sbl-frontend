import { getAxiosInstance, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { fileSubmissionState } from 'pages/Filing/FilingApp/FileSubmission.data';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import type { AxiosInstanceExtended } from 'types/requestsTypes';
import { EightHundred, Five, One, Thirty, Two, Zero } from 'utils/constants';

const MAX_RETRIES = Five;

// Exponential Decay for Retry Delay
function getRetryDelay(retry = Zero): number {
  // return Thousand;
  return Math.min(
    retry > One ? Two ** retry * EightHundred : EightHundred,
    Thirty * EightHundred,
  );
}

const apiClient: AxiosInstanceExtended = getAxiosInstance();

function getMaxRetriesAxiosError(response: AxiosResponse): AxiosError {
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

  console.log(
    'Validation STILL in-progress - Long Polling - RETRYING',
    response,
  );

  console.log(
    'retry delay time:',
    getRetryDelay(axiosInstance.defaults.retryCount),
  );

  return new Promise(resolve => {
    setTimeout(
      () => resolve(axiosInstance(response.config)),
      getRetryDelay(axiosInstance.defaults.retryCount),
    );
  });
}

/** Used in `useGetSubmissionLatest` to long poll for validation after an upload * */
function shouldRetry(response: AxiosResponse<SubmissionResponse>): boolean {
  // Check if the response has a 'state' property equal to "VALIDATION_IN_PROGRESS"
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unused-expressions, prettier/prettier
  return (response.data?.state && response.data.state) === fileSubmissionState.VALIDATION_IN_PROGRESS;
}

const interceptor = apiClient.interceptors.response.use(
  async (response: AxiosResponse<SubmissionResponse>) => {
    if (apiClient.defaults.handleStartInterceptorCallback) {
      // Update UI with in-progress status (may or may not have validation_in_progress)
      apiClient.defaults.handleStartInterceptorCallback(response);
    }
    // Retry if validation still in-progress
    if (shouldRetry(response)) {
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

export const fetchFilingSubmissionLatest = async (
  auth: SblAuthProperties,
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
  handleStartInterceptorCallback?: (
    response: AxiosResponse<SubmissionResponse>,
  ) => void,
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<SubmissionResponse> => {
  if (handleStartInterceptorCallback) {
    apiClient.defaults.handleStartInterceptorCallback =
      handleStartInterceptorCallback;
  }

  return request<SubmissionResponse>({
    axiosInstance: apiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/latest`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchFilingSubmissionLatest;
