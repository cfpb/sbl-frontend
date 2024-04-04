import { getAxiosInstance, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { fileSubmissionState } from 'pages/Filing/FilingApp/FileSubmission.data';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import type { AxiosInstanceExtended } from 'types/requestsTypes';
import { Five, One, Thousand, Zero } from 'utils/constants';

const MAX_RETRIES = Five;
const RETRY_DELAY = Thousand; // ms

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
): Promise<SubmissionResponse> {
  if (!axiosInstance.defaults.retryCount) {
    // eslint-disable-next-line no-param-reassign
    axiosInstance.defaults.retryCount = Zero;
  }

  if (axiosInstance.defaults.retryCount >= MAX_RETRIES) {
    if (apiClient.defaults.handleRetryEndCallback) {
      console.log('run error handleRetryEndCallback');
      apiClient.defaults.handleRetryEndCallback();
    }
    throw getMaxRetriesAxiosError(response);
  }

  // eslint-disable-next-line no-param-reassign
  axiosInstance.defaults.retryCount += One;

  console.log(
    'Validation STILL in-progress - Long Polling - RETRYING',
    response,
  );

  return new Promise(resolve => {
    setTimeout(() => resolve(axiosInstance(response.config)), RETRY_DELAY);
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
    // Retry if validation still in-progress
    if (shouldRetry(response)) {
      if (apiClient.defaults.handleStartRetryCallback) {
        console.log('run handleStartRetryCallback');
        apiClient.defaults.handleStartRetryCallback(response);
      }
      return retryRequestWithDelay(apiClient, response);
    }
    apiClient.defaults.retryCount = Zero;
    if (apiClient.defaults.handleRetryEndCallback) {
      console.log('run handleRetryEndCallback');
      apiClient.defaults.handleRetryEndCallback();
    }
    return response;
  },
  async (error: AxiosError) => {
    apiClient.defaults.retryCount = Zero;
    if (apiClient.defaults.handleRetryEndCallback) {
      console.log('run error handleRetryEndCallback');
      apiClient.defaults.handleRetryEndCallback();
    }
    // If an error occurs, reject immediately
    throw error;
  },
);

export const fetchFilingSubmissionLatest = async (
  auth: SblAuthProperties,
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
  handleStartRetryCallback:
    | ((response: AxiosResponse<SubmissionResponse>) => void)
    | undefined,
  handleRetryEndCallback: (() => void) | undefined,
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<SubmissionResponse> => {
  if (handleStartRetryCallback) {
    apiClient.defaults.handleStartRetryCallback = handleStartRetryCallback;
  }
  if (handleRetryEndCallback) {
    apiClient.defaults.handleRetryEndCallback = handleRetryEndCallback;
  }
  return request<SubmissionResponse>({
    axiosInstance: apiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/latest`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchFilingSubmissionLatest;
