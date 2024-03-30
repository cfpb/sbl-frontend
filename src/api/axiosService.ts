import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

type Methods = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';

export interface RequestType extends AxiosRequestConfig {
  url: string;
  method: Methods;
  body?: AxiosRequestConfig['data'];
}

export const request = async <T>({
  url = '',
  method = 'get',
  body,
  headers,
}: RequestType): Promise<T> => {
  const argumentList: RequestType[keyof RequestType][] = [url];
  if (body) argumentList.push(body);
  if (headers)
    argumentList.push({
      headers,
    });
  // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await apiClient[method]<T>(...argumentList);
  // @ts-expect-error: Unnecessary check
  return response.data;
};
