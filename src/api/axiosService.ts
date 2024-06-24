import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { AxiosInstanceExtended } from 'types/requestsTypes';
import getOidcTokenOutsideOfContext from 'utils/getOidcTokenOutsideContext';
import { BASE_URL, FILING_URL, MAIL_BASE_URL } from './common';

/**
 * Creates and returns an instance of axios with the specified base url
 * @param baseUrl The base url for the axios instance
 * @returns The modified axios instance
 */
export const getAxiosInstance = (baseUrl = ''): AxiosInstanceExtended => {
  const newAxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  newAxiosInstance.interceptors.request.use(response => {
    const token = getOidcTokenOutsideOfContext();
    if (!token) return response;
    response.headers.Authorization = token;
    axios.defaults.headers.common.Authorization = token;
    return response;
  });
  return newAxiosInstance;
};

export const userFiApiClient = getAxiosInstance(BASE_URL);
export const filingApiClient = getAxiosInstance(FILING_URL);
export const mailApiClient = getAxiosInstance(MAIL_BASE_URL);
export const fetchFilingSubmissionLatestApiClient =
  getAxiosInstance(FILING_URL);

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
  headers?: AxiosRequestConfig<D>['headers'];
  options?: Omit<AxiosRequestConfig<D>, 'headers'>;
  data?: D;
}

const apiClient = getAxiosInstance();
export const request = async <D = undefined, T = unknown>({
  axiosInstance = apiClient,
  url = '',
  method = 'get',
  data,
  headers,
  options,
}: RequestType<D>): Promise<T> => {
  const argumentList: RequestType<D>[keyof RequestType<D>][] = [url];
  if (dataMethods.has(method)) argumentList.push(data);
  if (headers)
    argumentList.push({
      headers,
      ...options,
    });

  // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await axiosInstance[method]<D>(...argumentList);
  return response.data as unknown as T;
};
