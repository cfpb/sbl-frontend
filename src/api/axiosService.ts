import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const getAxiosInstance = (): AxiosInstance =>
  axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const apiClient = getAxiosInstance();

type Methods = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';

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
  if (body) argumentList.push(body);
  if (headers)
    argumentList.push({
      headers,
      ...options,
    });

  // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await axiosInstance[method]<T>(...argumentList);
  return response.data as unknown as T;
};
