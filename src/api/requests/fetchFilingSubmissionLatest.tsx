import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
import { fileSubmissionState } from 'pages/Filing/FilingApp/FileSubmission.data';
import type {
  FilingPeriodType,
  SubmissionResponse,
  UploadResponse,
} from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

const getAxiosInstance = (): AxiosInstance =>
  axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const apiClient = getAxiosInstance();

const getMaxRetriesAxiosError = (
  requestResponse: AxiosResponse,
): AxiosError => {
  // Order of parameters: 'message', 'code', 'config', 'request', 'response'
  return new AxiosError(
    'You have reached the maximum amount of retries',
    '429',
    requestResponse.config,
    requestResponse.request,
    {
      data: requestResponse.data as AxiosResponse<UploadResponse>,
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      status: 429,
      statusText: 'Too Many Requests',
      headers: requestResponse.headers,
      config: requestResponse.config,
    },
  );
};

/** Used in `useGetSubmissionLatest` to long poll for validation after an upload * */
function shouldRetry(response: AxiosResponse<UploadResponse>): boolean {
  // Check if the response has a 'state' property equal to "VALIDATION_IN_PROGRESS"
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unused-expressions, prettier/prettier
  return (response.data?.state && response.data.state) === fileSubmissionState.VALIDATION_IN_PROGRESS;
}

const interceptor = apiClient.interceptors.response.use(
  async (response: AxiosResponse<UploadResponse>) => {
    console.log(response);
    console.log(
      new AxiosError('message', 'code', 'config', 'request', 'response'),
    );
    // If the response doesn't need to be retried, resolve immediately
    if (!shouldRetry(response)) {
      return response;
    } // Otherwise, retry the request
    console.log(
      'Validation STILL in-progress - Long Polling - RETRYING',
      response,
    );
    return apiClient(response.config);
  },
  async (error: AxiosError) => {
    // If an error occurs, reject immediately
    throw error;
  },
);

// function retryRequest

export const fetchFilingSubmissionLatest = async (
  auth: SblAuthProperties,
  lei: InstitutionDetailsApiType['lei'],
  filingPeriod: FilingPeriodType,
): Promise<SubmissionResponse> => {
  return request<SubmissionResponse>({
    axiosInstance: apiClient,
    url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/latest`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` },
  });
};

export default fetchFilingSubmissionLatest;
