import { request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { FilingPeriodType, UploadResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { Hundred } from 'utils/constants';

const getAxiosInstance = (): AxiosInstance =>
  axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const apiClient = getAxiosInstance();

// Define a function to check if the response needs to be retried
type AxiosResponseUploadStateType = AxiosResponse<
  Partial<Pick<UploadResponse, 'state'>>
>;

/** Used in `useGetSubmissionLatest` and LONGPOLL for validation after an upload * */
function shouldRetry(response: AxiosResponseUploadStateType): boolean {
  // Check if the response has a 'state' property equal to '"VALIDATION_IN_PROGRESS"'
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unused-expressions, prettier/prettier
  return response.data?.state && response.data.state === 'VALIDATION_IN_PROGRESS';
}

const interceptor = apiClient.interceptors.response.use(
  async (response: AxiosResponseUploadStateType) => {
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

const uploadCsvAxios = async (
  auth: SblAuthProperties,
  file: File,
  lei: InstitutionDetailsApiType['lei'],
  period_code: FilingPeriodType,
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return request<UploadResponse>({
    axiosInstance: apiClient,
    url: `/v1/filing/institutions/${lei}/filings/${period_code}/submissions`,
    method: 'post',
    body: formData,
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'multipart/form-data',
    },
    options: {
      onUploadProgress: progressEvent => {
        if (
          typeof progressEvent.total === 'number' &&
          typeof progressEvent.loaded === 'number'
        ) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * Hundred) / progressEvent.total,
          );
        }
      },
    },
  });
};

export default uploadCsvAxios;
