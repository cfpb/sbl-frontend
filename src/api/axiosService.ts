import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface HeaderType {
  Authorization: string;
  'Content-Type'?: string;
}

type Methods = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';

export interface RequestType {
  url: string;
  method: Methods;
  body?: object;
  headers?: HeaderType;
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
  const response = await apiClient[method]<T>(...argumentList);
  // @ts-expect-error: Unnecessary check
  return response.data;
};
