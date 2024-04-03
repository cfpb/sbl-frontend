import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { fileSubmissionState } from 'pages/Filing/FilingApp/FileSubmission.data';
import type {
  FilingPeriodType,
  SubmissionResponse,
  UploadResponse,
} from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';

const getAxiosInstance = (): AxiosInstance =>
  axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const apiClient = getAxiosInstance();

/** Used in `useGetSubmissionLatest` and LONGPOLL for validation after an upload * */
function shouldRetry(response: AxiosResponse<UploadResponse>): boolean {
  // Check if the response has a 'state' property equal to '"VALIDATION_IN_PROGRESS"'
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unused-expressions, prettier/prettier
  return (response.data?.state && response.data.state) === fileSubmissionState.IN_PROGRESS;
}

const interceptor = apiClient.interceptors.response.use(
  async (response: AxiosResponse<UploadResponse>) => {
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
