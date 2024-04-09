import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';
import type { UploadResponse } from 'types/filingTypes';

const apiClient: AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

type Methods = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';
const methodAcceptsData = new Set(['post', 'put', 'patch']);

export interface RequestType extends AxiosRequestConfig {
  axiosInstance?: AxiosInstance;
  url: string;
  method: Methods;
  body?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
  options?: Partial<AxiosRequestConfig>;
}

export const request = async <T>({
  axiosInstance = apiClient,
  url = '',
  method = 'get',
  body,
  headers,
  options,
}: RequestType): Promise<T> => {
  const argumentList: RequestType[keyof RequestType][] = [url];
  if (body && methodAcceptsData.has(method)) argumentList.push(body);
  if (headers)
    argumentList.push({
      headers,
      ...options,
    });

  try {
    // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await axiosInstance[method]<T>(...argumentList);
    return response.data as unknown as T;
  } finally {
    // Remove the interceptor when done with it to prevent memory leaks
    // TODO: Research if this is necessary -- currently this line of code bugs the interceptor
    // apiClient.interceptors.response.eject(interceptor);
  }
};
