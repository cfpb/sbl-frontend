import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define a function to check if the response needs to be retried

function shouldRetry(response) {
  // Check if the response has a 'state' property equal to '"VALIDATION_IN_PROGRESS"'
  return response?.data?.state === 'VALIDATION_IN_PROGRESS';
} // Define the interceptor
const interceptor = apiClient.interceptors.response.use(
  async response => {
    // If the response doesn't need to be retried, resolve immediately
    console.log('interceptor response', response);

    if (!shouldRetry(response)) {
      return response;
    } // Otherwise, retry the request
    console.log('Validation STILL in-progress - RETRYING', response);
    return apiClient(response.config);
  },
  async error => {
    // If an error occurs, reject immediately
    throw error;
  },
);

type Methods = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';

export interface RequestType extends AxiosRequestConfig {
  url: string;
  method: Methods;
  body?: AxiosRequestConfig['data'];
  options?: Partial<AxiosRequestConfig>;
}

export const request = async <T>({
  url = '',
  method = 'get',
  body,
  headers,
  options,
}: RequestType): Promise<T> => {
  const argumentList: RequestType[keyof RequestType][] = [url];
  if (body) argumentList.push(body);
  if (headers)
    argumentList.push({
      headers,
      ...options,
    });
  // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await apiClient[method]<T>(...argumentList);
  // @ts-expect-error: Unnecessary check
  return response.data;
};
