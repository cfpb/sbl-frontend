import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { AxiosInstanceExtended } from 'types/requestsTypes';

export const getAxiosInstance = (): AxiosInstanceExtended =>
  axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const apiClient = getAxiosInstance();

type MethodTypes =
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put';

const dataMethods = new Set(['patch', 'post', 'put']);

export interface RequestType<D> extends AxiosRequestConfig {
  axiosInstance?: AxiosInstance | AxiosInstanceExtended;
  url: string;
  method: MethodTypes;
  headers?: AxiosRequestConfig['headers'];
  options?: Partial<AxiosRequestConfig>;
  data?: D;
}

export const request = async <D, T>({
  axiosInstance = apiClient,
  url = '',
  method = 'get',
  data,
  headers,
  options,
}: RequestType<D>): Promise<T> => {
  const argumentList: RequestType<D>[keyof RequestType<D>][] = [url];
  if (data && dataMethods.has(method)) argumentList.push(data);
  if (headers)
    argumentList.push({
      headers,
      ...options,
    });

  // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await axiosInstance[method](...argumentList);
  return response.data as T;
};
